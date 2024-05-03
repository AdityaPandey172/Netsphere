import React, { useState, useEffect } from "react";
import { login } from "../features/userSlice"; // Importing login action from userSlice
import { useDispatch } from "react-redux"; // Importing useDispatch hook from react-redux for dispatching actions
import { auth } from "../firebase"; // Importing auth from firebase for authentication
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from react-router-dom for navigation
import "./Login.css"; // Importing styles for the Login component
import PfwLogo from './../assets/Logos/pfw.png'; // Importing PFW logo image
import Logo from './../assets/Logos/logo.png'; // Importing APP logo image
import LeadershipbgImage from './../assets/Logos/leadership.png'; // Importing background image

export default function Login() {
  const [email, setEmail] = useState(""); // State for email input field
  const [password, setPassword] = useState(""); // State for password input field
  const navigator = useNavigate(); // Navigation function from react-router-dom

  useEffect(() => {
    // Check if the token exists in local storage
    const token = localStorage.getItem('token');
    if (token) {
      // If token exists, navigate to home page
      navigator('/home');
      console.log("setIsLoggedIn: home");
    } 
  });

  // Function to handle login form submission
  const loginToApp = (e) => {
    e.preventDefault();

    const url = 'http://127.0.0.1:8000/api/users/login/'; // API endpoint for user login
    fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    })
    .then(response => response.json())
    .then(data => {
      // Upon successful login, store user data and token in local storage and navigate to home page
      console.log('Fetched Data:', data);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      navigator('/home');
    })
    .catch(error => {
      console.error('Error:', error); // Log error if login fails
    });
  };

  // Function to navigate to registration page
  const register = () => {
    navigator('/register');
  };

  return (
    <div className="login_page">
      <div className="login_image">
        <img
          src={LeadershipbgImage} // Render background image for login page
          alt="Leadership BG Image"
        />
      </div>
      <div className="login">
        <div className='login_header'>
          <img
            className='pfw__logo'
            src={PfwLogo} // Render PFW logo
            alt="PFW logo"
          />
          <img
            className='app__logo'
            src={Logo} // Render APP logo
            alt="APP logo"
          />
        </div>
        <form>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state on change
            placeholder="Email"
            type="email"
            autoComplete="new-password"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on change
            placeholder="Password"
            type="password"
          />

          <button type="submit" onClick={loginToApp}> // Button to submit login form
            Sign In
          </button>
        </form>

        <p>
          Not a member? {""}
          <span className="login__register" onClick={register}>
            {" "}
            Register Now
          </span>
        </p>
      </div>
    </div>
  );
}
