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
                <h2>Linkedin News</h2>
                <InfoOutlinedIcon />
            </div>
            {newsArticle("Professor Putin posted a research recently", "Latest - 5 min ago")}
            {newsArticle("Donald Trump wants to connect with you", "Yesterday - 7:15 pm")}
            {newsArticle("You application for RA has been processed and handed over to Osama Bin Laden", "Yesterday - 8 am")}
            {newsArticle("New Internships are posted recently", "Tuesday - 3 pm")}

        </div>
    )
}

export default Widgets