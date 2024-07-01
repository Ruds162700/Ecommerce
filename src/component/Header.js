import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from '@mui/material/Badge';
import { Container, Form, Navbar } from 'react-bootstrap';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import "./header.css";
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { decremetncount, incremetcount, cartval, clearcart,total,countitem} from '../Redux/Action';

export const Header = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.Cart);
    const count = useSelector(state => state.citem); // Get the total count from 
    const billamount = useSelector(state => state.total); // Get the total count from state
   
      // const totalbill = () => {
    //     let total = 0;
    //     data.forEach(element => {
    //         total = total + element.price * element.count;
    //     });
    //     setBillamount(total);
    // }


     
    useEffect(() => {
        dispatch(countitem());
        dispatch(total());
    }, [data]);

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
                <NavLink to="/" className='title'><h2>morniino</h2></NavLink>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Form className="d-flex me-auto">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                    </Form>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <NavLink to="/favourites">
                            <i className="fa-regular fa-heart" id="fav" style={{ fontSize: 25, cursor: "pointer", margin: "0 15px" }}></i>
                        </NavLink>

                        <Badge className='icons' badgeContent={count} color="primary" overlap="circular"
                            id="fade-button"
                            aria-controls={anchorEl ? 'fade-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={anchorEl ? 'true' : undefined}
                            onClick={handleClick}>
                            <i className="fa-solid fa-cart-shopping" style={{ fontSize: 25, cursor: "pointer", margin: "0 15px" }}></i>
                        </Badge>
                         
                         <NavLink to="/checkout">
                         <i className="fa-solid fa-arrow-right-from-bracket" id='checkout' style={{ fontSize: 25, cursor: "pointer", margin: "0 15px 0 30px" }}></i>
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
                                        <p>Total Price: {(item.count * item.price)&&(item.count * item.price).toLocaleString('en-IN', { maximumFractionDigits: 2, style: 'currency', currency: 'INR' })}</p>
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
}

export default Header;
