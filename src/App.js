import React, { useEffect } from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login/Login';
import { selectUser } from './features/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from './firebase';
import { login, logout } from './features/userSlice';
import Home from './Home/Home';
import Register from './Register/Register';
import Network from './Network/Network';
import Event from './Event/Event';
import Messaging from './Messaging/Messaging';
import Notification from './Notification/Notification';

function ComingSoon(){
  navigator('https://group6se.my.canva.site/soon');
}

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        // User logged in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            // photoUrl: userAuth.photoURL
          })
        );
      } else {
        // User is logged out
        dispatch(logout());
      }
    });


    return () => {
      unsubscribe(); // Cleanup function to unsubscribe from the listener
    };
  }, []); // Empty array as the second argument to run the effect only once

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
          <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
          <Route path="/home" element={user ? (
            <Home/>
          ) : (
            <Login />
          )} />
          <Route path="/register" element={<Register />} />
          <Route path="/network" element={<Network />} />
          <Route path="/event" element={<Event />} />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/notification" element={<Notification />} />

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
