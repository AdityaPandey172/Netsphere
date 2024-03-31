import React, { useEffect } from 'react';
import './styles/App.css';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Feed from './Feed/Feed';
import Login from './Login/Login';
import { selectUser } from './features/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from './firebase';
import { login, logout } from './features/userSlice';
import Widgets from './Widgets/Widgets';

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
            photoUrl: userAuth.photoURL
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
  }, [dispatch]); // Empty array as the second argument to run the effect only once

  return (
    <div className="app">
      
      {!user ? (
        <Login />
      ) : (
        <><Header />
          <div className="app_body">
            <Sidebar />
            <Feed />
            <Widgets />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
