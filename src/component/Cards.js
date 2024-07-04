import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { viewdetails, ADDTOCART, TOGGLEFAVOURITE } from '../Redux/Action'; // Adjusted import for viewdetails action
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './cards.css';

const Cards = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const items = useSelector(state => state.searched.length > 0 ? state.searched : state.data);
    const dispatch = useDispatch();

    const handleAddToCart = (id) => {
        dispatch({ type: ADDTOCART, payload: id });
        setOpenSnackbar(true);
    };

    const handleToggleFavourite = (id) => {
        dispatch({ type: TOGGLEFAVOURITE, payload: id });
    };

    const handleViewDetails = (id) => {
        dispatch(viewdetails(id)); // Dispatch viewdetails action with the ID
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const action = (
        <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div className='whole'>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={1000}
                onClose={handleCloseSnackbar}
                message="Item Added To Cart"
                action={action}
            />
            <div className='container'>
                {items.map((data) => (
                    <Card key={data.id}>
                        <div className='alldata'>
                            <div className='imgfix'>
                                <div className='image'>
                                    <Card.Img variant="top" className='actimage' src={data.image} />
                                </div>
                            </div>
                            <Card.Body>
                                <div className='txtnddetails'>
                                    <div className='title'>
                                        <Card.Title>{data.title}</Card.Title>
                                    </div>
                                    <div className='datas'>

                                    {!data.isDetails ? (
                                        <div className='showbtn'>
                                            <button className='sbtn' onClick={() => handleViewDetails(data.id)}>View Details</button>
                                        </div>
                                    ) : (
                                        <div>
                                            <Card.Text>{data.description}</Card.Text>
                                            <button className='sbtn' onClick={() => handleViewDetails(data.id)}>Show Less</button>
                                        </div>
                                    )}
                                    </div>
                                </div>
                                <div className='botm'>
                                    <Card.Text>₹{data.price}</Card.Text>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleAddToCart(data.id)}
                                    >
                                        Add To Cart
                                    </Button>
                                    <Button
                                        variant="link"
                                        onClick={() => handleToggleFavourite(data.id)}
                                    >
                                        {data.isFav ?
                                            <FontAwesomeIcon icon={faSolidHeart} /> :
                                            <FontAwesomeIcon icon={faRegularHeart} />
                                        }
                                    </Button>
                                </div>
                            </Card.Body>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Cards;
