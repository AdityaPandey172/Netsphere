import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Widgets from '../Widgets/Widgets';
import './Research.css';

// EventDetail component to display individual event details
const EventDetail = ({ title, description, duration, date }) => {
  return (
    <div className="event-detail">
      <h2>{title}</h2> {/* Displaying the title of the event */}
      <p>{description}</p> {/* Displaying the description of the event */}
      <p>Duration: {duration}</p> {/* Displaying the duration of the event */}
      <p>Date: {date}</p> {/* Displaying the date of the event */}
    </div>
  );
};

// EventPage component that will be the main container for your event details
const EventPage = () => {

  const [research, setResearch] = useState([]) // State variable to store research data

  useEffect(() => {
    // Fetching research data from the API when the component mounts
    const token = localStorage.getItem('token'); // Getting the token from local storage
    const url = 'http://127.0.0.1:8000/api/research/'; // API endpoint for research data
    fetch(`${url}`, {
      method: 'GET', // HTTP GET request
      headers: {
        'Content-Type': 'application/json', // Specifying the content type of the request
        'Authorization': `Token ${token}` // Adding authorization token to the request header
      }
    })
      .then(response => response.json()) // Parsing the JSON response
      .then(data => {
        console.log('Fetched Data:', data); // Logging the fetched data to the console
        setResearch(data); // Updating the research state with the fetched data
        // navigate('/dashboard/default'); // Navigating to a different route (not implemented here)
      })
      .catch(error => {
        console.error('Error:', error); // Logging any errors to the console
      });
  }, []) // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div className="event-page">
      <Header /> {/* Rendering the Header component */}
      <div className="main-content">
        <div className="event-details">
          {/* Mapping through the research data to render EventDetail components */}
          {research.map((event, index) => (
            <EventDetail key={index} {...event} /> // Passing event details as props to EventDetail component
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
