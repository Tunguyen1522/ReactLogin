import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import HomePage from './component/HomePage';
import Register from './component/Register';
import Cart from './component/Cart';
import Order from './component/Order';
import CatDetail from './component/CatDetail';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/cat/:id" element={<CatDetail />} />
        </Routes>
    </Router>
);

export default App;
