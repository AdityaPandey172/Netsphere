import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Feed from '../Feed/Feed';
import Widgets from '../Widgets/Widgets';
import "./../styles/App.css"
import "./Notification.css";
import { Avatar } from '@material-ui/core'
import FlipMove from "react-flip-move";

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { useState } from "react";

function Notification() {

  const [read, setRead] = useState(0);

  const readStat = ()=>{
    setRead(1);
  }

  const newsArticle = (name,heading, subtitle) => (
    <div className="widgets__article" onClick={readStat}>
        <div className="widgets__articleLeft">
            {read == 0   ? <FiberManualRecordIcon />:<></>}
        </div>
        <div className="widgets__articleLeft">
          <Avatar src='A' className="sidebar__avatar"/> 
        </div>

        <div className="widgets__articleRight">
            <span style={{color: '#deddff'}}><b><u>{name}</u></b> {heading}</span>
            <p>{subtitle}</p>
        </div>
    </div>
);

  return (
    <>
      <Header />
        <div className="app_body">

          <div className="notification">

            {/* Notifications */}
            <div className='post_cards'>
              <FlipMove>
                  {newsArticle("Purdue University"," posted: Boiler Up! Today, Director of the #Purdue 'All-American' Marching Band Jay Gephart surprised President Mung Chiang with a formation photo in appreciation of his...", "")}
                  {newsArticle("Simon Monaghan"," posted: Developers who secured post-covid jobs are on the hunt again. But this time, the market is COMPLETELY different. Here’s what you should be asking (which you might not have considered back then)...", "")}
                  {newsArticle("Purdue University"," posted: Now you can sign up for monthly newsletters from The Persistent Pursuit — your destination for the best #Boilermaker stories. 📰 Never miss #Purdue’s most popular articles...", "")}
                  {newsArticle("Department of Organisation and Leadership"," posted: Storytelling, technology, design and ... dinosaurs? 🦖 Carys George, a Purdue themed entertainment design student in Indianapolis, will tell you all about it.", "")}
                  {newsArticle("Dr. Umesh Rathod","posted: 🚨New article alert Achieving customer centricity is just like having a high-maintenance girlfriend – always demanding attention, costly dinners, and endless gifts.", "")}
                  {newsArticle("Leadership"," Certificate Program Enrollment Open", "")}
                  {newsArticle("Simon Monaghan"," posted: Developers who secured post-covid jobs are on the hunt again. But this time, the market is COMPLETELY different. Here’s what you should be asking (which you might not have considered back then)...", "")}
                
              </FlipMove>
            </div>
          </div>

        </div>
    </>
  );
}

export default Notification;
