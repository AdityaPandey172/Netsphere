
import React, {useState } from "react";
import "./Register.css";
import { login } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import full_logo from '../assets/Logos/full_logo.png';

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
    <div className="signup">
      <img
        src={full_logo}
        alt="linkedin logo"
      />
      <form>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name (required if registering)"
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

        <span className="signup__register" onClick={register}>
          Register Now
        </span>
      </form>

      <p>
        Already have an account? {""}
        <span className="login__register" onClick={(e)=>navigate('/')}>
          Log-In
        </span>
      </p>
    </div>
  );
}
