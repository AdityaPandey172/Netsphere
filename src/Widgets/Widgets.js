import React from 'react';
import "./Widgets.css"
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

function Widgets() {

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
            {newsArticle("New Leadership Development Program Launch", "Latest - 5 min ago")}
            {newsArticle("Call for Leadership Research Papers", "Yesterday - 7:15 pm")}
            {newsArticle("Leadership Workshop on Emotional Intelligence", "Yesterday - 8 am")}
            {newsArticle("Leadership Certificate Program Enrollment Open", "Tuesday - 3 pm")}
            {newsArticle("Leadership Workshop on Emotional Intelligence", "Yesterday - 8 am")}
            {newsArticle("Leadership Certificate Program Enrollment Open", "Tuesday - 3 pm")}
        </div>
    )
}

export default Widgets