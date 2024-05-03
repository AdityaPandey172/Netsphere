import Header from '../Header/Header'; // Importing Header component
import Sidebar from '../Sidebar/Sidebar'; // Importing Sidebar component
import Feed from '../Feed/Feed'; // Importing Feed component
import Widgets from '../Widgets/Widgets'; // Importing Widgets component
import "./../styles/App.css" // Importing CSS file for App component
import "./Notification.css"; // Importing CSS file for Notification component
import { Avatar } from '@material-ui/core' // Importing Avatar component from Material-UI
import FlipMove from "react-flip-move"; // Importing FlipMove component for animated transitions

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'; // Importing FiberManualRecordIcon from Material-UI
import { useState, useEffect } from "react"; // Importing useState and useEffect hooks from React library

function Notification() {

  const [read, setRead] = useState(0); // State for tracking whether notification is read or not

  const readStat = ()=>{
    setRead(1); // Function to update read state when notification is clicked
  }

  const [notifications, setNotifications] = useState([]) // State for storing notifications

  useEffect(() => {
    // Effect hook to fetch notifications when component mounts
    const token = localStorage.getItem('token'); // Get token from local storage
    const url = 'http://127.0.0.1:8000/api/notifications/'; // API endpoint for fetching notifications
    fetch(`${url}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}` // Send token in authorization header
    }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Fetched Data:', data);
        setNotifications(data); // Set fetched notifications in state
    })
    .catch(error => {
    console.error('Error:', error);
    });
  }, []) // Empty dependency array to ensure effect runs only once on component mount

  // Function to render individual news article notification
  const newsArticle = (name, heading, subtitle) => (
    <div className="widgets__article" onClick={readStat}> {/* Click handler to mark notification as read */}
        <div className="widgets__articleLeft">
            {read == 0   ? <FiberManualRecordIcon />:<></>} {/* Render dot icon if notification is unread */}
        </div>
        <div className="widgets__articleLeft">
          <Avatar src='A' className="sidebar__avatar"/> {/* Display avatar */}
        </div>

        <div className="widgets__articleRight" style={{marginLeft: '7px'}}>
            <span style={{color: '#deddff'}}><b><u>{name}</u></b> {heading}</span> {/* Render name and heading */}
            <p>{subtitle}</p> {/* Render subtitle */}
        </div>
    </div>
);

  return (
    <>
      <Header /> {/* Render Header component */}
        <div className="app_body">

          <div className="notification" style={{padding: '10px'}}>

            {/* Notifications */}
            <div className='post_cards'>
              <FlipMove> {/* Animated transition wrapper */}
                  {notifications.map((notification, index) => (
                    newsArticle(notification.created_by, notification.description, "") // Render each notification
                  ))}
              </FlipMove>
            </div>
          </div>

        </div>
    </>
  );
}

export default Notification; // Export Notification component
