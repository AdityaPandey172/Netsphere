import React, { useState } from "react";
import { login } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import full_logo from '../assets/Logos/full_logo.png';
import "./Login.css";

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
            profileUrl: userAuth.user.photoURL,
          })
        );
        navigator('/home');
        }).catch((error) => alert(error));
      };


  const register = () => {
    navigator('/register');
  };

  return (
    <div className="login">
      <img
        src={full_logo}
        alt="linkedin logo"
      />
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
  );
}