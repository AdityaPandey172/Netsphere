import React, { useState } from "react";
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
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const loginToApp = (e) => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(email, password).then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            // profileUrl: userAuth.user.photoURL,
          })
        );
        navigator('/home');
        }).catch((error) => alert(error));
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