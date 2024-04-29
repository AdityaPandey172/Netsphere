import { Avatar } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from "../features/userSlice";
import './Sidebar.css'

export default function Sidebar() {

    const user = useSelector(selectUser);

    console.log("Im in sidebar:"+user);

    const recentItem = (topic) => (
        <div className="sidebar__recentItem">
            <span className="sidebar__hash">#</span>
            {topic}
        </div>
    ) 

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <img src="https://imageio.forbes.com/blogs-images/josephliu/files/2019/06/10-ferdinand-stohr-149422-unsplash-1200x298.jpg?height=176&width=711&fit=bounds" alt="background" />
                <Avatar src={user.photoUrl} className="sidebar__avatar"> 
                {user.email[0].toUpperCase()}</Avatar>
                <h2>{user.displayName}</h2>
                <h4>@{user.email.split('@')[0]}</h4>
            </div>
            

            <div className="sidebar__bottom">
            <div className="sidebar__stats">
                <div className="sidebar__stat">
                    <div className="sidebar__statNumber">450</div>
                    <div>Followers</div>
                </div>

                <div className="sidebar__stat">
                    <div className="sidebar__statNumber">320</div>
                    <div>Following</div>
                </div>

                <div className="sidebar__stat">
                    <div className="sidebar__statNumber">22</div>
                    <div>Applications</div>
                </div>
            </div>
            </div>

             <div className="sidebar__bottom">
                <h2>Recent Events</h2>
                {recentItem('Career Connections: Real World Scoop With FCC (Indiana)')}
                {recentItem('American Red Cross Blood Drive')}
                {recentItem('Commencement 2024')}
                {recentItem('Omnibus Speaker Series: Michael Beschloss')}
                {recentItem('AAPI Panel')}

            </div>
        </div>
    )
}