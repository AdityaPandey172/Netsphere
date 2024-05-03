import React from 'react'; // Import React library for creating components
import './Header.css'; // Import CSS file for styling
import HeaderOption from './HeaderOption'; // Import custom HeaderOption component
import SearchIcon from '@material-ui/icons/Search'; // Import search icon from Material-UI
import HomeIcon from '@material-ui/icons/Home'; // Import home icon from Material-UI
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'; // Import supervisor account icon from Material-UI
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'; // Import business center icon from Material-UI
import ChatIcon from '@material-ui/icons/Chat'; // Import chat icon from Material-UI
import NotificationsIcon from '@material-ui/icons/Notifications'; // Import notifications icon from Material-UI
import PersonSearchIcon from '@mui/icons-material/PersonSearch'; // Import person search icon from MUI
import EventIcon from '@mui/icons-material/Event'; // Import event icon from MUI
import LogoutIcon from '@mui/icons-material/Logout'; // Import logout icon from MUI
import PfwLogo from './../assets/Logos/pfw.png'; // Import PFW logo
import Logo from './../assets/Logos/logo.png'; // Import app logo
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate hooks from React Router for navigation

function Header() {
    const navigator = useNavigate(); // Initialize useNavigate hook for navigation

    // Function to log out of the app
    const logoutOfApp = () => {
        localStorage.removeItem("token"); // Remove token from local storage
        localStorage.removeItem("user"); // Remove user from local storage
        navigator('/login'); // Navigate to login page
    };

    // JSX rendering
    return (
        <div className="header">
            <div className='header__images'>
                {/* Display PFW logo */}
                <img
                    className='pfw__logo'
                    src={PfwLogo}
                    alt="PFW logo"
                />
                {/* Display app logo */}
                <img
                    className='app__logo'
                    src={Logo}
                    alt="APP logo"
                />
            </div>
            <div className="header__left">
                <div className="header__search">
                    {/* Display search icon */}
                    <SearchIcon style={{ color: 'black' }}/>
                    {/* Input field for search */}
                    <input type="text"  placeholder="Search"/>
                </div>
            </div>
            
            <div className="header__right">
                {/* Link to home page */}
                <Link to='/home' style={{ textDecoration: 'none' }}><HeaderOption Icon={HomeIcon} title ="Home"/></Link>
                {/* Link to network page */}
                <Link to='/network' style={{ textDecoration: 'none' }}><HeaderOption Icon={SupervisorAccountIcon} title ="People"/></Link>
                {/* Link to jobs page */}
                <Link to='/jobs' style={{ textDecoration: 'none' }}><HeaderOption Icon={BusinessCenterIcon} title ="Jobs"/></Link>
                {/* Link to event page */}
                <Link to='/event' style={{ textDecoration: 'none' }}><HeaderOption Icon={EventIcon} title ="Event"/></Link>
                {/* Link to research page */}
                <Link to='/research' style={{ textDecoration: 'none' }}><HeaderOption Icon={ChatIcon} title ="Research"/></Link>
                {/* Link to notification page */}
                <Link to='/notification' style={{ textDecoration: 'none' }}><HeaderOption Icon={NotificationsIcon} title ="Notifications"/></Link>
                {/* Log out button */}
                <HeaderOption Icon={LogoutIcon} title ="Log Out" onClick ={logoutOfApp}/>
            </div>
        </div>
    );
}

export default Header; // Export Header component
