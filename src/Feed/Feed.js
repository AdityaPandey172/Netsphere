import React, { useState, useEffect } from 'react';
import "./Feed.css";
import InputOption from '../Helper/InputOption'
import Post from '../Post/Post'
import CreateIcon from "@material-ui/icons/Create";
import ImageIcon from '@material-ui/icons/Image';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { db } from '../firebase';
import firebase from '../firebase';
import FlipMove from "react-flip-move";
import { useNavigate } from "react-router-dom";


export default function Feed() {
    const user = useSelector(selectUser)
    const [input, setInput] = useState('');
    const [posts, setPosts] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const navigate = useNavigate();
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handlePhotoSelection = (e) => {
        const file = e.target.files[0]; // Access the first selected file
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedPhoto(reader.result); // Store the selected photo as base64 encoded data URL
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const url = 'http://127.0.0.1:8000/api/posts/';
        fetch(`${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Fetched Data:', data);
            setPosts(data["posts"])
            // navigate('/dashboard/default');
        })
        .catch(error => {
        console.error('Error:', error);
        });
    }, [])

    const sendPost = e => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const url = 'http://127.0.0.1:8000/api/posts/';
        fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({
                "message": input,
                "image_url": selectedPhoto
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Fetched Data:', data);
            setPosts(data["posts"]);
        })
        .catch(error => {
        console.error('Error:', error);
        });
        
        setInput("");
        setSelectedPhoto("");
        setIsModalOpen(false); 
        navigate('/');
    };

    return (
        <div className="feed">
            <div className="feed__inputContainer">
                <div className="feed__input">
                    <CreateIcon />
                    <form>
                        <input value={input} onFocus={openModal} type="text" placeholder="Start a post" />
                        <button onClick={sendPost} type="submit">Send</button>
                    </form>
                </div>
                {isModalOpen && (
                    <div className="create_post_modal">
                        <div className="modal_content">
                            <span className="close" onClick={closeModal}>&times;</span>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Write your post here..."
                            />
                            <div className='photo_select'>   
                                {selectedPhoto && <img src={selectedPhoto} alt="Selected" />}
                            </div>
                            
                            <div className="feed__inputOptions">
                                <label htmlFor="photoInput">
                                    <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
                                </label>
                                <input id="photoInput" type="file" accept="image/*" onChange={handlePhotoSelection} style={{ display: 'none' }}/>
                                <InputOption Icon={SubscriptionsIcon} title="Video" color="#7FC15E" />
                            </div>
                            {/* <button onClick={sendPost}>Post</button> */}
                            <hr />
                            <div className='post_button'>
                                <button onClick={sendPost}>Post</button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="feed__inputOptions">
                    <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
                    <InputOption Icon={SubscriptionsIcon} title="Video" color="#7FC15E" />
                    <InputOption Icon={EventNoteIcon} title="Event" color="#E7A33E" />
                    <InputOption Icon={CalendarViewDayIcon} title="Write article" color="#F5987E" />
                </div>
            </div>
            {/* <hr/> */}

            {/* Posts */}
            <div className='post_cards'>
            <FlipMove>
            {posts.map((post) => (
            <Post
                id={post.id}
                name={post.name}
                description={post.description}
                message={post.message}
                image_url={post.image_url}
                interested_count={post.interested}
                saved_count={post.saved}
                is_interested_clicked={post.is_interested}
                is_post_saved={post.is_saved}
            />
        ))}

            </FlipMove>
            </div>
            
        </div>
    )
}