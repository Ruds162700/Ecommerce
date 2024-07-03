import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import "./cards.css";
import { ADDTOCART, TOGGLEFAVOURITE,VIEWDETAILS } from '../Redux/Action';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

const FavDetils = () => {
    const items = useSelector(state => state.searched.length > 0 ? state.searched : state.data);
    const data = items.filter(elem => elem.isFav === true);
    const dispatch = useDispatch();
    const [showAlert, setShowAlert] = useState(false);
    const [open, setOpen] = React.useState(false);

    const handleViewDetails = (id) => {
        dispatch({ type: VIEWDETAILS, payload: id });
    };

    const handleAddToCart = (id) => {
        dispatch({ type: ADDTOCART, payload: id });
        setOpen(true);
    };
     
    const handleToggleFavourite = (id) =>{
        dispatch({ type: TOGGLEFAVOURITE, payload: id });
    }

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

        <div>
            <Snackbar
                open={open}
                autoHideDuration={1000}
                onClose={handleClose}
                message="Item Added To Cart"
                action={action}
            />
            <h1 className='align-text-center'>List Of Favourites</h1>
            {data.length === 0 ? (<>
                <h2>No favorite items added.</h2>
                <Link to="/"><Button className='btn-primary'>Go to Home</Button></Link>
            </>
            ) : (<>
                <Modal show={showAlert} onHide={() => setShowAlert(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Item Added Successfully to Your Cart
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => setShowAlert(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>


                <div className='container'>
                    {data.map(data => (
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
            </>)}
        </div>

    )
}

export default FavDetils;
