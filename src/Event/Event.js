import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Widgets from '../Widgets/Widgets';
import './event.css';

// EventDetail component to display individual event details
const EventDetail = ({ title, description, date, time, location }) => {
  return (
    <div className="event-detail">
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Date: {date}</p>
      <p>Time: {time}</p>
      <p>Location: {location}</p>
    </div>
  );
};

// EventPage component that will be the main container for your event details
const EventPage = () => {
  // State to store the fetched events
  const [events, setEvents] = useState([])

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Retrieving the token from local storage
    const token = localStorage.getItem('token');
    // API endpoint URL
    const url = 'http://127.0.0.1:8000/api/events/';
    // Fetching event data from the API
    fetch(`${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}` // Sending token for authentication
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Fetched Data:', data); // Logging fetched data
      setEvents(data); // Updating state with fetched event data
      // navigate('/dashboard/default'); // Potentially a navigation action after data fetch
    })
    .catch(error => {
      console.error('Error:', error); // Logging any fetch errors
    });
  }, []) // Empty dependency array ensures useEffect runs only once, similar to componentDidMount

  return (
    <div className="event-page">
      <Header /> {/* Header component */}
      <div className="main-content">
        <div className="event-details">
          {/* Mapping through eventData to render EventDetail components */}
          {events.map((event, index) => (
            <EventDetail key={index} {...event} /> // Passing event details as props
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
