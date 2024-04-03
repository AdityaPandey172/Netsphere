import React from "react";
import './Network.css'
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Widgets from '../Widgets/Widgets';
import Feed from '../Feed/Feed';

const Network = () => {

    const invitationsData = [
        {
            "name": "Ravi",
            "header": "Gradute Student at PFW",
            "profile_url": "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg"
        },
        {
            "name": "Aditya Pandey",
            "header": "Gradute Student at PFW",
            "profile_url": "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg"
        },
        {
            "name": "Viplav",
            "header": "Gradute Student at PFW",
            "profile_url": "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg"
        }

    ]

    const connectionsData = [
        {
            "name": "Ravi",
            "header": "Gradute Student at PFW",
            "profile_url": "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg"
        },
        {
            "name": "Aditya Pandey",
            "header": "Gradute Student at PFW",
            "profile_url": "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg"
        },
        {
            "name": "Viplav",
            "header": "Gradute Student at PFW",
            "profile_url": "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg"
        },
        {
            "name": "Ravi",
            "header": "Gradute Student at PFW",
            "profile_url": "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg"
        },
        {
            "name": "Aditya Pandey",
            "header": "Gradute Student at PFW",
            "profile_url": "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg"
        },
        {
            "name": "Viplav",
            "header": "Gradute Student at PFW",
            "profile_url": "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg"
        }

    ]

    return(
        <>

            <Header />
            <div className="app_body">
                <Sidebar />
                {/* <Feed /> */}
                <div className="network">
                    <div className="invitations">
                        <div className="invitations_header">
                            <h3>Invitations</h3>
                        </div>
                        <div className="invitations_cards">
                            {invitationsData.map((invitation, idx) => {
                                return(
                                    <div className="each_invitation_card">
                                        <img alt="user Avatar" src={invitation.profile_url}  />
                                        <h2>{invitation.name}</h2>
                                        <p>{invitation.header}</p>
                                        <div className="connect_button">
                                            <button>Approve</button>
                                            <button>Remove</button>
                                        </div>
                                    </div>  
                                )
                            })}
                        </div>
                    </div>


                    <div className="connections">
                        <div className="connections_header">
                            <h3>People you may know from Organizational Leadership Department</h3>
                        </div>
                        <div className="connections_cards">
                            {connectionsData.map((connection, idx) => {
                                return(
                                    <div className="each_connection_card">
                                        <img alt="user Avatar" src={connection.profile_url}  />
                                        <h2>{connection.name}</h2>
                                        <p>{connection.header}</p>
                                        <div className="connect_button">
                                            <button>Connect</button>
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


<div className="card">
    <img alt="user Avatar" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=80" />
    <h2>Jeffrey Garcia</h2>
    <p>Sent you a Friend Request!</p>
    <div className="buttongroup">
    <button>Approve</button>
    <button>Remove</button>
    </div>
</div> 