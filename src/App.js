import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';
import Checkout from './pages/CheckOutPage';
import CustomNavbar from './pages/Navbar';
import Register from './pages/RegisterPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <CustomNavbar/>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/checkout" element={<Checkout/>} />

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

