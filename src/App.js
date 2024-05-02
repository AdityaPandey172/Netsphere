import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import Register from './Register/Register';
import Network from './Network/Network';
import Notification from './Notification/Notification';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
      // Check if the token exists in local storage
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      console.log("setIsLoggedIn: ", isLoggedIn);
    });

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={isLoggedIn ?  <Home/> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/network" element={<Network />} />
          <Route path="/notification" element={<Notification />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
