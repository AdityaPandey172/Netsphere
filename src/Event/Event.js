import React from 'react';
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
  // Sample event data
  const eventData = [
    {
      title: 'Leadership Conference 2024',
      description: 'Join us for a day of insightful talks and networking with fellow industrial professionals.',
      date: 'June 12, 2024',
      time: '10:00 AM - 5:00 PM',
      location: 'Convention Center, Downtown'
    },
    {
        title: 'Postive MindSet',
        description: 'Elevate Your Life: "Positive MindSet" – Your Pathway to a Brighter, More Optimistic Future!Join us for a day of insightful talks and networking with fellow industrial professionals.',
        date: 'June 1, 2024',
        time: '12:00 PM - 2:00 PM',
        location: 'Classic Ballroom, Walb Union'
      },
      {
        title: 'Get Ahead',
        description: 'Unlock Your Potential: Join "Get Ahead" for Transformative Self-Development Strategies!',
        date: 'May 19, 2024',
        time: '11:00 AM - 4:00 PM',
        location: 'Room 209, Neff Hall'
      },
      {
        title: 'Internship Fair',
        description: 'Shape Your Future: Explore Top Internship Opportunities at the "Internship Fair" for Organizational Leadership!',
        date: 'May 22nd - May 24th 2024',
        time: '10:00 AM - 5:00 PM',
        location: 'Lutheran Health Center'
      },
      {
        title: 'Research Symposium',
        description: 'Collaborate and Innovate: "Research Symposium"- A Meeting of Minds for Organizational Leadership Excellence!',
        date: 'May 22nd - May 24th 2024',
        time: '10:00 AM - 5:00 PM',
        location: 'International Ballroom, Walb Union'
      },
    // Add more event objects here
  ];

  return (
    <div className="event-page">
      <Header />
      <div className="main-content">
      
        <div className="event-details">
          {/* Map through eventData to render EventDetail components */}
          {eventData.map((event, index) => (
            <EventDetail key={index} {...event} />
          ))}
        </div>
      </div>
    
    </div>
  );
};

export default EventPage;