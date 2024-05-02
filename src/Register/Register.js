import React, {useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import PfwLogo from './../assets/Logos/pfw.png'
import Logo from './../assets/Logos/logo.png'
import LeadershipbgImage from './../assets/Logos/leadership.png'

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();  

  const register = (e) => {
      e.preventDefault();

      console.log("resgietr")
      const url = 'http://127.0.0.1:8000/api/users/register/';
      fetch(`${url}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "password": password
      })
      })
      .then(response => {
          console.log('Fetched Data:', response);
          navigate('/login');
      })
      .catch(error => {
        console.error('Error:', error);
      });
    
      
    };
      

  return (
    <div className="signup_page">
      <div className="signup_image">
            <img
                src={LeadershipbgImage}
                alt="Leadership BG Image"
            />
      </div>

      <div className="signup">
        <div className='signup_header'>
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
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            type="text"
            autoComplete="new-password"
          />

          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
            type="text"
            autoComplete="new-password"
          />

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

          <button className="signup__register" type="submit" onClick={register}>
            Register Now
          </button>
        </form>

        <p>
          Already have an account? {""}
          <span className="login__register" onClick={(e)=>navigate('/login')}>
            Log-In
          </span>
        </p>
      </div>
    </div>
  );
}
