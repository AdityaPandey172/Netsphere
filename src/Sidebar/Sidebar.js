import { Avatar } from '@material-ui/core'; // Importing Avatar component from Material-UI
import React from 'react'; // Importing React library
import { useSelector } from 'react-redux'; // Importing useSelector hook from React Redux for accessing Redux store state
import { selectUser } from "../features/userSlice"; // Importing selectUser selector from userSlice file
import './Sidebar.css'; // Importing CSS file for styling

// Sidebar component function
export default function Sidebar() {

    const user = useSelector(selectUser); // Accessing user data from Redux store using useSelector hook

    console.log("Im in sidebar:"+user); // Logging user data to console

    // Function to render a single recent item
    const recentItem = (topic) => (
        <div className="sidebar__recentItem">
            <span className="sidebar__hash">#</span>
            {topic}
        </div>
    ); 

    // Rendering the sidebar component
    return (
        <div className="sidebar">
            <div className="sidebar__top">
                {/* Rendering a background image */}
                <img src="https://imageio.forbes.com/blogs-images/josephliu/files/2019/06/10-ferdinand-stohr-149422-unsplash-1200x298.jpg?height=176&width=711&fit=bounds" alt="background" />
                {/* Rendering an Avatar component with a placeholder image */}
                <Avatar src="" className="sidebar__avatar"> 
                A</Avatar>
                {/* Rendering Admin name */}
                <h2>Admin</h2>
                {/* Rendering Admin handle */}
                <h4>@admin</h4>
            </div>
            
            {/* Rendering the recent events section */}
            <div className="sidebar__bottom">
                <h2>Recent Events</h2>
                {/* Rendering individual recent items */}
                {recentItem('Career Connections: Real World Scoop With FCC (Indiana)')}
                {recentItem('American Red Cross Blood Drive')}
                {recentItem('Commencement 2024')}
                {recentItem('Omnibus Speaker Series: Michael Beschloss')}
                {recentItem('AAPI Panel')}
            </div>
        </div>
    );
}
