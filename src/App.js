import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './Login/Login'; // Importing the Login component
import Home from './Home/Home'; // Importing the Home component
import JobCard from './Jobs/Jobs'; // Importing the JobCard component
import Register from './Register/Register'; // Importing the Register component
import Network from './Network/Network'; // Importing the Network component
import Event from './Event/Event'; // Importing the Event component
import Research from './Research/Research'; // Importing the Research component
import Notification from './Notification/Notification'; // Importing the Notification component

// App component
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State variable to track user login status

  useEffect(() => {
      // Check if the token exists in local storage
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      if (token) {
        setIsLoggedIn(true); // Set isLoggedIn to true if token exists
      } else {
        setIsLoggedIn(false); // Set isLoggedIn to false if token doesn't exist
      }
      console.log("setIsLoggedIn: ", isLoggedIn); // Log the current value of isLoggedIn
    });

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Route for the Home component, only render if user is logged in */}
          <Route path="/" element={isLoggedIn ?  <Home/> : <Login />} />
          <Route path="/login" element={<Login />} /> {/* Route for the Login component */}
          <Route path="/home" element={<Home/>} /> {/* Route for the Home component */}
          <Route path="/jobs" element={<JobCard/>} /> {/* Route for the JobCard component */}
          <Route path="/register" element={<Register />} /> {/* Route for the Register component */}
          <Route path="/network" element={<Network />} /> {/* Route for the Network component */}
          <Route path="/event" element={<Event />} /> {/* Route for the Event component */}
          <Route path="/research" element={<Research />} /> {/* Route for the Research component */}
          <Route path="/notification" element={<Notification />} /> {/* Route for the Notification component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
