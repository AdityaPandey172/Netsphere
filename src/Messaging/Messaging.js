import React, { useState } from "react";
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Widgets from '../Widgets/Widgets';
import './messaging.css';

function Messaging() {
    const [newMessage, setNewMessage] = useState('');
    const [messagingData, setMessagingData] = useState([
        {
            "from": "Viplav Khode",
            "content": "Hey! Good Morning, How are you",
            "time": "Sun"
        },
        {        
            "from": "Ravichandra",
            "content": "Hello, You presented very well today in class",
            "time": "Apr 25th"
        },
        {
            "from": "Dr. Paresh Mishra",
            "content": "Hello, You presented very well today in class",
            "time": "Apr 21th"  
        },
        {
            "from": "Glenna",
            "content": "Hello, Your Password is expiring, please change your password",
            "time": "Apr 16th"
        }
        
    ]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const newMessageData = {
                from: "You",
                content: newMessage,
                time: new Date().toLocaleString(),
                profile_url: "your-profile-url" // Replace with actual profile URL
            };
            setMessagingData([...messagingData, newMessageData]);
            setNewMessage('');
        }
    };

    return (
        <>
            <Header />
            <div className="app_body">
                <Sidebar />
                <div className="messages">
                    {/* ... existing message UI */}
                </div>
                <div className="message_input_container">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
                <Widgets />
            </div>
        </>
    );
}

export default Messaging;
