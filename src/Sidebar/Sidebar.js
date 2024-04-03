import { Avatar } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from "../features/userSlice";
import './Sidebar.css'

export default function Sidebar() {

    const user = useSelector(selectUser);

    const recentItem = (topic) => (
        <div className="sidebar__recentItem">
            <span className="sidebar__hash">#</span>
            <p>{topic}</p>
        </div>
    ) 

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <img src="https://imageio.forbes.com/blogs-images/josephliu/files/2019/06/10-ferdinand-stohr-149422-unsplash-1200x298.jpg?height=176&width=711&fit=bounds" alt="background" />
                <Avatar src={user.photoUrl} className="sidebar__avatar"> 
                {user.email[0].toUpperCase()}</Avatar>
                <h2>{user.displayName}</h2>
                <h4>{user.email}</h4>
            </div>
            
            <div className="sidebar__stats">
                <div className="sidebar__stat">
                <p>Who viewed your profile</p>
                <p className="sidebar__statNumber">126</p>
                </div>
                <div className="sidebar__stat">
                <p>Views of your post</p>
                <p className="sidebar__statNumber">67</p>
                </div>

            </div>

            {/* <div className="sidebar__bottom">
                <p>Recent</p>
                {recentItem('programming')}
                {recentItem('jobs')}
                {recentItem('fintech')}
                {recentItem('spaceX')}
                {recentItem('MongoDB')}
                <h4>Followed Hastags</h4>
                {recentItem('nodejs')}
                {recentItem('reactjs')}
                {recentItem('developer')}
                {recentItem('business')}
                {recentItem('tech')}
            </div> */}
        </div>
    )
}