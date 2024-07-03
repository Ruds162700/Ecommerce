import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import "./cards.css";
import { ADDTOCART, TOGGLEFAVOURITE, search } from '../Redux/Action';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const Cards = () => {
    const items = useSelector(state => state.searched.length > 0 ? state.searched : state.data);
    const dispatch = useDispatch();
    const [showAlert, setShowAlert] = useState(false);
    const [open, setOpen] = React.useState(false);
     



    const handleAddToCart = (id) => {
        dispatch({ type: ADDTOCART, payload: id });
        setOpen(true);
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const action = (
        <React.Fragment>

          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );
    

    return (
        <div className='whole'>
            <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        message="Item Added To Cart"
        action={action}
      />
            <div className='container'>
                {items.map((data) => (
                    <Card key={data.id}>
                        <div className='image'>
                            <Card.Img variant="top" src={data.image} />
                        </div>
                        <Card.Body>
                            <div className='title'>
                                <Card.Title>{data.title}</Card.Title>
                            </div>
                            <Card.Text>
                                {data.description}
                            </Card.Text>
                            <div>
                                <Card.Text>₹{data.price}</Card.Text>
                                <Button
                                    variant="primary"
                                    onClick={() => handleAddToCart(data.id)}
                                >
                                    Add To Cart
                                </Button>
                                <Button
                                    variant="link"
                                    onClick={() => dispatch({ type: TOGGLEFAVOURITE, payload: data.id })}
                                >
                                    {data.isFav ?
                                        <FontAwesomeIcon icon={faSolidHeart} /> :
                                        <FontAwesomeIcon icon={faRegularHeart} />
                                    }
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Cards;
