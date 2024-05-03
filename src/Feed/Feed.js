import React, { useState, useEffect } from 'react';
import "./Feed.css"; // Importing CSS styles for the Feed component.
import InputOption from '../Helper/InputOption'; // Importing InputOption component.
import Post from '../Post/Post'; // Importing Post component.
import CreateIcon from "@material-ui/icons/Create"; // Icon for creating posts.
import ImageIcon from '@material-ui/icons/Image'; // Icon for adding images to posts.
import SubscriptionsIcon from '@material-ui/icons/Subscriptions'; // Icon for video content.
import EventNoteIcon from '@material-ui/icons/EventNote'; // Icon for events.
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay'; // Icon for job postings.
import { useSelector } from 'react-redux'; // Importing useSelector hook from react-redux for accessing Redux store.
import { selectUser } from '../features/userSlice'; // Importing selectUser selector from userSlice.
import { db } from '../firebase'; // Importing db from Firebase.
import firebase from '../firebase'; // Importing Firebase.
import FlipMove from "react-flip-move"; // Component for animating list updates.
import { useNavigate } from "react-router-dom"; // Hook for navigation in React Router.
import ArticleIcon from '@mui/icons-material/Article'; // Icon for research.
import CampaignIcon from '@mui/icons-material/Campaign'; // Icon for announcements.

// Functional component Feed
export default function Feed() {
    const user = useSelector(selectUser); // Selecting user from Redux store.
    const [input, setInput] = useState(''); // State for input text in post creation.
    const [posts, setPosts] = useState([]); // State for storing posts.

    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal open/close.
    const [selectedPhoto, setSelectedPhoto] = useState(null); // State for selected photo in post.
    const navigate = useNavigate(); // Navigation hook from React Router.

    // Function to open the modal.
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal.
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Function to handle photo selection for a post.
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

    // Fetching posts from the server on component mount.
    useEffect(() => {
        const token = localStorage.getItem('token'); // Retrieving token from local storage.
        const url = 'http://127.0.0.1:8000/api/posts/'; // API endpoint for fetching posts.
        fetch(`${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}` // Adding token to request headers for authentication.
            }
        })
        .then(response => response.json()) // Parsing response JSON.
        .then(data => {
            console.log('Fetched Data:', data); // Logging fetched data.
            setPosts(data["posts"]); // Updating posts state with fetched data.
        })
        .catch(error => {
            console.error('Error:', error); // Logging error if fetch fails.
        });
    }, []); // Empty dependency array ensures this effect runs only once on mount.

    // Function to send a post to the server.
    const sendPost = e => {
        e.preventDefault(); // Preventing default form submission behavior.
        const token = localStorage.getItem('token'); // Retrieving token from local storage.
        const url = 'http://127.0.0.1:8000/api/posts/'; // API endpoint for creating posts.
        fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}` // Adding token to request headers for authentication.
            },
            body: JSON.stringify({
                "message": input,
                "image_url": selectedPhoto // Sending message and selected photo as JSON payload.
            })
        })
        .then(response => response.json()) // Parsing response JSON.
        .then(data => {
            console.log('Fetched Data:', data); // Logging fetched data.
            setPosts(data["posts"]); // Updating posts state with fetched data.
        })
        .catch(error => {
            console.error('Error:', error); // Logging error if fetch fails.
        });
        
        setInput(""); // Clearing input field after sending post.
        setSelectedPhoto(""); // Clearing selected photo after sending post.
        setIsModalOpen(false); // Closing the modal after sending post.
        navigate('/'); // Navigating back to the homepage.
    };

    // Rendering JSX
    return (
        <div className="feed">
            <div className="feed__inputContainer">
                <div className="feed__input">
                    <CreateIcon /> {/* Icon for creating posts. */}
                    <form>
                        <input value={input} onFocus={openModal} type="text" placeholder="Start a post" />
                        <button onClick={sendPost} type="submit">Send</button>
                    </form>
                </div>
                {/* Modal for creating posts */}
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
                                {/* Input options for post creation */}
                                <label htmlFor="photoInput">
                                    <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
                                </label>
                                <input id="photoInput" type="file" accept="image/*" onChange={handlePhotoSelection} style={{ display: 'none' }}/>
                                <InputOption Icon={SubscriptionsIcon} title="Video" color="#7FC15E" />
                            </div>
                            <hr />
                            <div className='post_button'>
                                <button onClick={sendPost}>Post</button>
                            </div>
                        </div>
                    </div>
                )}
                {/* Input options for post creation */}
                <div className="feed__inputOptions">
                    <InputOption Icon={ArticleIcon} title="Research" color="#70B5F9" />
                    <InputOption Icon={EventNoteIcon} title="Events" color="#7FC15E" />
                    <InputOption Icon={CampaignIcon} title="Announcements" color="#E7A33E" />
                    <InputOption Icon={CalendarViewDayIcon} title="Job" color="#F5987E" />
                </div>
            </div>

            {/* Post cards */}
            <div className='post_cards'>
                <FlipMove>
                    {/* Mapping over posts to render Post components */}
                    {posts.map((post) => (
                        <Post
                            key={post.id} // Adding key prop for React list reconciliation.
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
