import React, { useState, useEffect } from "react";
import { login } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import PfwLogo from './../assets/Logos/pfw.png'
import Logo from './../assets/Logos/logo.png'
import LeadershipbgImage from './../assets/Logos/leadership.png'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();

  useEffect(() => {
      // Check if the token exists in local storage
      const token = localStorage.getItem('token');
      if (token) {
        navigator('/home');
        console.log("setIsLoggedIn: home");
      } 
    });

  const loginToApp = (e) => {
    e.preventDefault();

    const url = 'http://127.0.0.1:8000/api/users/login/';
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
            console.log('Fetched Data:', data);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            navigator('/home');
        })
        .catch(error => {
          console.error('Error:', error);
        });
  };


  const register = () => {
    navigator('/register');
  };

  return (
    <div className="login_page">
      <div className="login_image">
            <img
                src={LeadershipbgImage}
                alt="Leadership BG Image"
            />
      </div>
      <div className="login">
          <div className='login_header'>
            <img
                className='pfw__logo'
                src={PfwLogo}
                alt="PFW logo"
            />
            <img
                className='app__logo'
                src={Logo}
                alt="APP logo"
            />
          </div>
          <form>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              autoComplete="new-password"
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
            />

            <button type="submit" onClick={loginToApp}>
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