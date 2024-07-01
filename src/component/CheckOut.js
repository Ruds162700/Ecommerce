import React, { useState,useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './checkout.css'; // Import the CSS file
import { useSelector,useDispatch } from 'react-redux';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { decremetncount, incremetcount, cartval, total,clearcart,removefav } from '../Redux/Action';
import './CongratulationPopup.css';
import Congratulations from './Congratulations';

const CheckoutForm = () => {
  const data = useSelector(state=>state.Cart);
  const billamount = useSelector(state => state.total); // Get the total count from state
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cartval());
    dispatch(total());
  }, [data]);


  const [isSubmitted, setIsSubmitted] = useState(false);

  const [form,setForm] = useState({
    email:"",
    fname:"",
    lname:"",
    Address:"",
    city:"",
    state:"",
    zipcode:""
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(clearcart());
    dispatch(removefav());
    setIsSubmitted(true);
    setForm({
      email: "",
      fname: "",
      lname: "",
      address: "",
      city: "",
      state: "",
      zipcode: ""
    });
  };

    

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
    <div  className='roo'>

      <div className='checkout'>
    <div className='list'>
    <div className='cart-container'>
      <h1 className='align-text-center'></h1>
      {
        data.map((item, index) => (
          <div className="card mb-3 cart-item" key={index}>
            <div className="row no-gutters cart-card">
              <div className="col-md-4">
                <img src={item.image} className="card-img cart-img" alt="..." />
              </div>
              <div className="col-md-6">
                <div className="card-body cart-body">
                  <h5 className="card-title">{item.title}</h5>
                 
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
    </div>
    <div className='frm'>

    <Form className="checkout-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address*</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            name="email" 
            value={form.email}
            onChange={handleChange}
            required 
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>First Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Firstname" 
            name="fname" 
            value={form.fname}
            onChange={handleChange}
            maxLength={10} 
            required 
          />
          <Form.Label>Last Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Lastname" 
            name="lname" 
            value={form.lname}
            onChange={handleChange}
            required 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="1234 Main St" 
            name="address" 
            value={form.address}
            onChange={handleChange}
            required 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCity">
          <Form.Label>City</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="City" 
            name="city" 
            value={form.city}
            onChange={handleChange}
            required 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicState">
          <Form.Label>State</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="State" 
            name="state" 
            value={form.state}
            onChange={handleChange}
            required 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicZip">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Zip Code" 
            name="zipcode" 
            value={form.zipcode}
            onChange={handleChange}
            required 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check 
            type="checkbox" 
            label="I agree to the terms and conditions" 
            required 
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {isSubmitted && <Congratulations />}
    </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
