import React from "react";
import Sidebar from '../Sidebar/Sidebar'; // Importing Sidebar component
import Header from '../Header/Header'; // Importing Header component
import Widgets from '../Widgets/Widgets'; // Importing Widgets component
import './Network.css' // Importing CSS file for styling

function Network(){

    // Data for invitations (professors) and connections (students)
    const invitationsData = [
        {
            "name": "Professor 1",
            "header": "Professor at PFW",
            "profile_url": "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg"
        },
        {
            "name": "Professor 2",
            "header": "Professor at PFW",
            "profile_url": "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg"
        },
        {
            "name": "Professor 3",
            "header": "Professor at PFW",
            "profile_url": "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg"
        }

    ];

    const connectionsData = [
        {
            "name": "Student 1",
            "header": "Graduate Student at PFW",
            "profile_url": "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg"
        },
        // More data for students...
    ];

    return(
        <>
            <Header /> {/* Render Header component */}
            <div className="app_body"> {/* Main body */}
                <Sidebar /> {/* Render Sidebar component */}
                <div className="network"> {/* Main network section */}
                    <div className="invitations"> {/* Invitations section */}
                        <div className="invitations_header"> {/* Header for invitations */}
                            <h3>Professors</h3> {/* Title for professors */}
                        </div>
                        <div className="invitations_cards"> {/* Container for professor cards */}
                            {invitationsData.map((invitation, idx) => { // Mapping through invitationsData array
                                return(
                                    <div className="each_invitation_card"> {/* Individual card for each professor invitation */}
                                        <img alt="user Avatar" src={invitation.profile_url}  /> {/* Professor's avatar */}
                                        <h2>{invitation.name}</h2> {/* Professor's name */}
                                        <p>{invitation.header}</p> {/* Professor's role */}
                                        <div className="connect_button"> {/* Button to message */}
                                            <button>Message</button>
                                        </div>
                                    </div>  
                                )
                            })}
                        </div>
                    </div>

                    <div className="connections"> {/* Connections section */}
                        <div className="connections_header"> {/* Header for connections */}
                            <h3>Students</h3> {/* Title for students */}
                        </div>
                        <div className="connections_cards"> {/* Container for student cards */}
                            {connectionsData.map((connection, idx) => { // Mapping through connectionsData array
                                return(
                                    <div className="each_connection_card"> {/* Individual card for each student connection */}
                                        <img alt="user Avatar" src={connection.profile_url}  /> {/* Student's avatar */}
                                        <h2>{connection.name}</h2> {/* Student's name */}
                                        <p>{connection.header}</p> {/* Student's role */}
                                        <div className="connect_button"> {/* Button to message */}
                                            <button>Message</button>
                                        </div>
                                    </div>  
                                )
                            })}
                        </div>
                    </div>
                </div>
                <Widgets /> {/* Render Widgets component */}
            </div>
        </>
    )
}

export default Network; // Exporting Network component
