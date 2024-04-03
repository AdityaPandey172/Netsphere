
import React, {useState } from "react";
import "./Register.css";
import { login } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import PfwLogo from './../assets/Logos/pfw.png'
import Logo from './../assets/Logos/logo.png'
import LeadershipbgImage from './../assets/Logos/leadership.png'

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();  

    const register = () => {
        if (!name) {
          return alert("A full name is required to register.");
        }
      
        auth.createUserWithEmailAndPassword(email, password)
          .then((userAuth) => {
            userAuth.user.updateProfile({
              displayName: name,
              photoURL: profilePic || null, // Ensure profilePic is not undefined
            }).then(() => {
              dispatch(
                login({
                  email: userAuth.user.email,
                  uid: userAuth.user.uid,
                  displayName: name,
                  photoUrl: profilePic || null, // Ensure profilePic is not undefined
                })
              );
              navigate('/home');
            }).catch(error => {
              console.log("Error updating profile:", error);
              // Handle error updating profile
            });
          })
          .catch((error) => alert(error));
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            type="text"
            autoComplete="new-password"
          />

          <input
            placeholder="Profile picture URL (optional)"
            type="text"
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
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

          <button className="signup__register" onClick={register}>
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
