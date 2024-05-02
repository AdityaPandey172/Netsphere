import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Widgets from '../Widgets/Widgets';
import './Research.css';

// EventDetail component to display individual event details
const EventDetail = ({ title, description, duration, date}) => {
  return (
    <div className="event-detail">
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Duration: {duration}</p>
      <p>Date: {date}</p>
    </div>
  );
};

// EventPage component that will be the main container for your event details
const EventPage = () => {
  // Sample event data
  const eventData = [
    {
      title: 'Gender Differences in Leadership Styles and Practices',
      description: 'Join our research team in examining the unique ways in which men and women lead and the impact of these differences on organizational success.',
      duration:  '3 months',
      date:  'May-Aug 2024'
    },
    {
        title: 'The Role of Leadership in Building High-Performance Teams',
        description: 'Be part of our study exploring the pivotal role leadership plays in shaping cohesive, successful teams that excel in achieving organizational goals.',
        duration: '4 months',
        date: 'Sept-Dec 2024'
        
      },
      {
        title: 'Get Ahead The Influence of Transformational Leadership on Employee Growth and Development',
        description: 'Collaborate with us in examining how transformational leadership empowers employees professional evolution, ultimately driving organizational success.',
        duration: '10 months',
        date: 'Aug 2024- May 2025'
      },
      {
        title: 'Leadership during Crisis Management and the Strategies used to Navigate through Challenging Times',
        description: 'Join us in exploring Leadership during Crisis Management and uncovering effective strategies for navigating challenging times.Shape Your Future: Explore Top Internship Opportunities at the "Internship Fair" for Organizational Leadership!',
        duration: '12 months',
        date: 'Jan 2025 - Dec 2025'
      },
      {
        title: 'Research Symposium',
        description: 'Collaborate and Innovate: "Research Symposium"- A Meeting of Minds for Organizational Leadership Excellence!',
        duration: '3 months',
        date: 'June 1, 2024'
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