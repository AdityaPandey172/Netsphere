import React from "react";
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Widgets from '../Widgets/Widgets';
import './Network.css'

function Network(){

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
            "header": "Gradute Student at PFW",
            "profile_url": "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg"
        },
        {
            "name": "Student 2",
            "header": "Gradute Student at PFW",
            "profile_url": "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg"
        },
        {
            "name": "Student 3",
            "header": "Gradute Student at PFW",
            "profile_url": "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg"
        },
        {
            "name": "Student 4",
            "header": "Gradute Student at PFW",
            "profile_url": "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg"
        },
        {
            "name": "Student 5",
            "header": "Gradute Student at PFW",
            "profile_url": "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg"
        },
        {
            "name": "Student 6",
            "header": "Gradute Student at PFW",
            "profile_url": "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg"
        }

    ];

    return(
        <>
            <Header />
            <div className="app_body">
                <Sidebar />
                <div className="network">
                    <div className="invitations">
                        <div className="invitations_header">
                            <h3>Professors</h3>
                        </div>
                        <div className="invitations_cards">
                            {invitationsData.map((invitation, idx) => {
                                return(
                                    <div className="each_invitation_card">
                                        <img alt="user Avatar" src={invitation.profile_url}  />
                                        <h2>{invitation.name}</h2>
                                        <p>{invitation.header}</p>
                                        <div className="connect_button">
                                            <button>Message</button>
                                        </div>
                                    </div>  
                                )
                            })}
                        </div>
                    </div>


                    <div className="connections">
                        <div className="connections_header">
                            <h3>Students</h3>
                        </div>
                        <div className="connections_cards">
                            {connectionsData.map((connection, idx) => {
                                return(
                                    <div className="each_connection_card">
                                        <img alt="user Avatar" src={connection.profile_url}  />
                                        <h2>{connection.name}</h2>
                                        <p>{connection.header}</p>
                                        <div className="connect_button">
                                            <button>Message</button>
                                        </div>
                                    </div>  
                                )
                            })}
                        </div>
                    </div>
                </div>
                
                <Widgets />
            </div>
        </>
    )
}

export default Network;