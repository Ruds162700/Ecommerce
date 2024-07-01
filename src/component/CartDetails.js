import React from 'react';
import Card from 'react-bootstrap/Card';
import "./cartdetails.css";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { Button } from '@mui/material';
import { decremetncount, incremetcount, cartval, total } from '../Redux/Action';


const CartDetails = () => {
  const data = useSelector(state => state.Cart);
  const count = useSelector(state => state.count); // Get the total count from 
  const billamount = useSelector(state => state.total); // Get the total count from state
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cartval());
    dispatch(total());
  }, [data]);
  // Helper function to render star ratings

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);


    return (
      <>
        {Array(fullStars).fill().map((_, i) => <FaStar className='star' key={`full-${i}`} />)}
        {halfStar && <FaStarHalfAlt className='star' />}
        {Array(emptyStars).fill().map((_, i) => <FaRegStar className='star' key={`empty-${i}`} />)}
      </>
    );
  };

  const handleDecrement = (itemId) => {
    dispatch(decremetncount(itemId));
  };

  const handleIncrement = (itemId) => {
    dispatch(incremetcount(itemId));
  };

  return (
    <div className='cart-container'>
      <h1 className='align-text-center'></h1>
      {
        data.map((item, index) => (
          <div className="card mb-3 cart-item" key={index}>
            <div className="row no-gutters cart-card">
              <div className="col-md-4">
                <img src={item.image} className="card-img cart-img" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body cart-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text"><big className="text-muted">Price: ₹{item.price}</big></p>
                  <p className="card-text"><big className="text-muted">Quantity: {item.count}</big></p>
                  <div className='quantity-controls'>
                    <Button className='quantity-btn' onClick={() => handleDecrement((item.id))}>-</Button>
                    <span className='quantity'>{item.count}</span>
                    <Button className='quantity-btn' onClick={() => handleIncrement((item.id))}>+</Button>
                  </div>
                  <br />
                  <p className="card-text"><big className="text-muted">Total: {(item.count * item.price) && (item.count * item.price).toLocaleString('en-IN', { maximumFractionDigits: 2, style: 'currency', currency: 'INR' })}</big></p>
                  <div className='cart-rating'>
                    {renderStars(item.rating.rate)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      }

      <div className='totalbill'>
        <h4>Subtotal: {billamount && billamount.toLocaleString('en-IN', { maximumFractionDigits: 2, style: 'currency', currency: 'INR' })}</h4>
      </div>
    </div>
  )
}

export default CartDetails;
