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


export default function Feed() {
    const user = useSelector(selectUser)
    const [input, setInput] = useState('');
    const [posts, setPosts] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

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
        db.collection("posts")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) =>
                setPosts(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
                )
            );
    }, []);

    const sendPost = e => {
        e.preventDefault();

        // Access specific user properties
        const { displayName, email, photoUrl } = user;
      
       console.log("Feed E: "+displayName+" E: "+email);

        db.collection('posts').add({
            name: user.displayName,
            description: user.email,
            message: input,
            photoUrl: user.photoUrl || "",
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput("");
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
                {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
                    <Post
                        key={id}
                        name={name}
                        description={description}
                        message={message}
                        photoUrl={photoUrl}
                    />
                ))}
            </FlipMove>
            </div>
            
        </div>
    )
}