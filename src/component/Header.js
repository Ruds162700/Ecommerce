import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from '@mui/material/Badge';
import { Container, Form, Navbar } from 'react-bootstrap';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import "./header.css";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { decremetncount, incremetcount, clearcart, total, countitem, search } from '../Redux/Action';
import { useLocation } from 'react-router-dom';

export const Header = () => {
    const all = useSelector(state => state.data);
    const dispatch = useDispatch();
    const data = useSelector(state => state.Cart);
    const count = useSelector(state => state.citem);
    const billamount = useSelector(state => state.total);
    const [key, setKey] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const location = useLocation();

    const isViewCartOrCheckout = location.pathname === '/cart' || location.pathname === '/checkout';

    useEffect(() => {
        dispatch(countitem());
        dispatch(total());
    }, [data]);

    useEffect(() => {
        dispatch(search(key));
        setShowSuggestions(!!key); // Show suggestions if the key is not empty
    }, [key, dispatch]);

    const handlechange = (e) => {
        setKey(e.target.value);
    };

    const handleSelectItem = (title) => {
        setKey(title);
        setShowSuggestions(false); // Hide suggestions after selecting an item
    };

    const clearSearch = () => {
        setKey("");
        setShowSuggestions(false); // Hide suggestions when search is cleared
    };

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDecrement = (itemId) => {
        dispatch(decremetncount(itemId));
    };

    const handleIncrement = (itemId) => {
        dispatch(incremetcount(itemId));
    };

    return (
        <Navbar expand="lg" id='cont' style={{ backgroundColor: 'orange' }}>
            <Container>
                <NavLink to="/" className="name"><h2>morniino</h2></NavLink>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" className="navbar-collapse">
                    {!isViewCartOrCheckout ? (
                        <Form className="d-flex me-auto">
                            <div className='search-container'>
                                <input
                                    type="text"
                                    value={key}
                                    onChange={handlechange}
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                {key && (
                                    <button className="cancel-btn" onClick={clearSearch}>✕</button>
                                )}
                                {showSuggestions && (
                                    <div className='dropdown'>
                                        {all.filter(item => {
                                            const searchTerm = key.toLowerCase();
                                            const title = item.title.toLowerCase();
                                            return title.startsWith(searchTerm);
                                        }).map(item => (
                                            <div
                                                className='dropdown-row'
                                                key={item.id}
                                                onClick={() => handleSelectItem(item.title)}
                                            >
                                                {item.title}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Form>
                    ):null}
                    <div className="nav-icons">
                        <NavLink to="/favourites">
                            <i className="fa-regular fa-heart icon" id="fav"></i>
                        </NavLink>

                        <Badge className='icons' badgeContent={count} color="primary" overlap="circular"
                            id="fade-button"
                            aria-controls={anchorEl ? 'fade-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={anchorEl ? 'true' : undefined}
                            onClick={handleClick}>
                            <i className="fa-solid fa-cart-shopping icon"></i>
                        </Badge>

                        <NavLink to="/checkout">
                            <i className="fa-solid fa-arrow-right-from-bracket icon" id='checkout'></i>
                        </NavLink>
                    </div>
                </Navbar.Collapse>
            </Container>

            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                {data.length > 0 ? (
                    <>
                        {data.map(item => (
                            <MenuItem key={item.id} className='cart-item'>
                                <div className='image-container'>
                                    <img src={item.image} alt={item.title} className='cart-image' />
                                </div>
                                <div className='item-details'>
                                    <p className='item-title'>{item.title}</p>
                                    <div className='quantity-controls'>
                                        <Button className='quantity-btn' onClick={() => handleDecrement(item.id)}>-</Button>
                                        <span className='quantity'>{item.count}</span>
                                        <Button className='quantity-btn' onClick={() => handleIncrement(item.id)}>+</Button>
                                    </div>
                                    <div className='item-price'>
                                        <p>Total Price: {(item.count * item.price) && (item.count * item.price).toLocaleString('en-IN', { maximumFractionDigits: 2, style: 'currency', currency: 'INR' })}</p>
                                    </div>
                                </div>
                            </MenuItem>
                        ))}

                        <div className='totalbill'>
                            <h4>Subtotal: {billamount && billamount.toLocaleString('en-IN', { maximumFractionDigits: 2, style: 'currency', currency: 'INR' })}</h4>
                        </div>
                        <div className='bttn'>
                            <NavLink to="/cart" className='no-underline'>
                                <Button className='checkout-btn'>View Cart</Button>
                            </NavLink>
                            <Button className='checkout-clc' onClick={() => dispatch(clearcart())}>Clear Cart</Button>
                        </div>
                    </>
                ) : (
                    <div className='empty-cart'>EMPTY CART</div>
                )}
            </Menu>
        </Navbar>
    );
};

export default Header;
