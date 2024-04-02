import React from 'react';
import './Header.css';
import HeaderOption from './HeaderOption'
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useDispatch} from 'react-redux';
import { logout } from '../features/userSlice';
import { auth } from '../firebase';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PfwLogo from './../images/pfw.png'
import Logo from './../images/logo.png'


function Header() {
    const dispatch = useDispatch()

    const logoutOfApp = ()=>{
        dispatch(logout())
        auth.signOut();

    };
    return (
        <div className="header">
            <div className='header__images'>
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
            <div className="header__left">
                <div className="header__search">
                    <SearchIcon style={{ color: 'black' }}/>
                    <input type="text"  placeholder="Search"/>
                </div>
            </div>
            
            <div className="header__right">
                <HeaderOption Icon={HomeIcon} title ="Home"/>
                <HeaderOption Icon={SupervisorAccountIcon} title ="Network"/>
                <HeaderOption Icon={BusinessCenterIcon} title ="Jobs"/>
                <HeaderOption Icon={PersonSearchIcon} title ="Match"/>
                <HeaderOption Icon={ChatIcon} title ="Messaging"/>
                <HeaderOption Icon={NotificationsIcon} title ="Notifications"/>
                <HeaderOption avatar= {true} title ="Log Out" onClick ={logoutOfApp}/>
            </div>
        </div>
    );
}

export default Header