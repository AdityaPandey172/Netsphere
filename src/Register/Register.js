import React, {useState } from "react";
import "./Register.css"; // Importing CSS styles for the Register component
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from react-router-dom
import PfwLogo from './../assets/Logos/pfw.png'; // Importing PFW logo image
import Logo from './../assets/Logos/logo.png'; // Importing APP logo image
import LeadershipbgImage from './../assets/Logos/leadership.png'; // Importing background image

// Register component function
export default function Register() {
  // State variables to store form input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate(); // Initializing the useNavigate hook for navigation  

  // Function to handle form submission
  const register = (e) => {
      e.preventDefault(); // Preventing default form submission behavior

      console.log("register"); // Logging message to console

      // API endpoint for user registration
      const url = 'http://127.0.0.1:8000/api/users/register/';
      
      // Fetching data from the API endpoint
      fetch(`${url}`, {
      method: 'POST', // HTTP POST method
      headers: {
          'Content-Type': 'application/json' // Setting request header to JSON format
      },
      // Converting form data to JSON string
      body: JSON.stringify({
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "password": password
      })
      })
      // Handling response from the server
      .then(response => {
          console.log('Fetched Data:', response); // Logging fetched data to console
          navigate('/login'); // Navigating to login page after successful registration
      })
      // Handling error if fetch request fails
      .catch(error => {
        console.error('Error:', error); // Logging error to console
      });
    };
      
  // JSX structure for the Register component
  return (
    <div className="signup_page"> {/* Main container for the signup page */}
      <div className="signup_image"> {/* Container for the background image */}
            <img
                src={LeadershipbgImage} // Rendering background image
                alt="Leadership BG Image"
            />
      </div>

      <div className="signup"> {/* Container for the signup form */}
        <div className='signup_header'> {/* Header section containing logos */}
          <img
              className='pfw__logo'
              src={PfwLogo} // Rendering PFW logo
              alt="PFW logo"
          />
          <img
              className='app__logo'
              src={Logo} // Rendering APP logo
              alt="APP logo"
          />
        </div>
        <form> {/* Form for user registration */}
          {/* Input field for first name */}
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            type="text"
            autoComplete="new-password"
          />

          {/* Input field for last name */}
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
            type="text"
            autoComplete="new-password"
          />

          {/* Input field for email */}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            autoComplete="new-password"
          />

          {/* Input field for password */}
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />

          {/* Button to submit the registration form */}
          <button className="signup__register" type="submit" onClick={register}>
            Register Now
          </button>
        </form>

        {/* Message for users who already have an account */}
        <p>
          Already have an account? {""}
          {/* Link to navigate to the login page */}
          <span className="login__register" onClick={(e)=>navigate('/login')}>
            Log-In
          </span>
        </p>
      </div>
    </div>
  );
}
