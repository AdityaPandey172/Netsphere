import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Feed from '../Feed/Feed';
import Widgets from '../Widgets/Widgets';
import "./../styles/App.css"
import { useNavigate } from "react-router-dom";
import {useEffect} from 'react';


function Home() {
  const navigator = useNavigate();

  useEffect(() => {
      // Check if the token exists in local storage
      const token = localStorage.getItem('token');
      if (!token) {
        navigator('/login');
        console.log("setIsLoggedIn: ");
      } 
    });

  return (
    <>
        <Header />
            <div className="app_body">
               <Sidebar />
                <Feed />
                <Widgets />
            </div>
    </>
  );
}

export default Home;
