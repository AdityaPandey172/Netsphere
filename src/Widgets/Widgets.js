import React, { useState, useEffect } from 'react';
import "./Widgets.css" // Importing CSS file for styling
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'; // Importing Material UI icons
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

function Widgets() {

    // State variable to hold announcements data
    const [announcements, setAnnouncements] = useState([]);

    // Fetching announcements data from backend when component mounts
    useEffect(() => {
        // Retrieving token from local storage for authentication
        const token = localStorage.getItem('token');
        // URL to fetch announcements data
        const url = 'http://127.0.0.1:8000/api/announcements/';
        fetch(`${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Fetched Data:', data);
            setAnnouncements(data); // Updating state with fetched announcements data
            // navigate('/dashboard/default'); // Example navigation code (commented out)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, []); // Empty dependency array to ensure useEffect runs only once on component mount

    // Function to render a single news article component
    const newsArticle = (heading, subtitle) => (
        <div className="widgets__article">
            <div className="widgets__articleLeft">
                <FiberManualRecordIcon />
            </div>
            <div className="widgets__articleRight">
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
    );

    return (
        <div className="widgets">
            <div className="widgets__header">
                <h2>Announcements</h2>
                <InfoOutlinedIcon />
            </div>

            {/* Mapping through announcements data and rendering news articles */}
            {announcements.map((announcement, index) => (
                newsArticle(announcement.description, announcement.created_at)
            ))}

            {/* Example static news articles (commented out) */}
            {/* {newsArticle("New Leadership Development Program Launch", "Latest - 5 min ago")} */}
            {/* {newsArticle("Call for Leadership Research Papers", "Yesterday - 7:15 pm")} */}
            {/* {newsArticle("Leadership Workshop on Emotional Intelligence", "Yesterday - 8 am")} */}
            {/* {newsArticle("Leadership Certificate Program Enrollment Open", "Tuesday - 3 pm")} */}
            {/* {newsArticle("Leadership Workshop on Emotional Intelligence", "Yesterday - 8 am")} */}
            {/* {newsArticle("Leadership Certificate Program Enrollment Open", "Tuesday - 3 pm")} */}
        </div>
    )
}

export default Widgets;
