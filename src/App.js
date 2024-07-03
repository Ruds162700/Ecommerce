import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import {Header} from "./component/Header";
import Cards from './component/Cards'; // Correct import without curly braces
import CartDetails from './component/CartDetails';
import FavDetils from './component/FavDetils';
import CheckOut from './component/CheckOut';
import Error from './component/Error';
import { useState } from 'react';

function App() {
  
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route exact path="/" element={<Cards />} />
        <Route path="/cart" element={<CartDetails />} />
        <Route path="/favourites" element={<FavDetils />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path='*' element={<Error />}/>
      </Routes>
    </div>
  );
}

export default App;
