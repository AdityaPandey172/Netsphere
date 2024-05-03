import InputOption from '../Helper/InputOption'; // Importing InputOption component from a specific location
import React, {useState, forwardRef} from "react"; // Importing necessary modules from React
import "./Post.css"; // Importing styles for the Post component
import { Avatar } from '@material-ui/core'; // Importing Avatar component from Material-UI
import ThumbUpIcon from '@material-ui/icons/ThumbUp'; // Importing ThumbUpIcon component from Material-UI
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined'; // Importing ChatOutlinedIcon component from Material-UI
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot'; // Importing TurnedInNotIcon component from Material-UI

// Defining the Post component using forwardRef
const Post =  forwardRef (({id, name, description, message, image_url, is_interested_clicked, is_post_saved, interested_count, saved_count}, ref) => {
    
    // State variables to manage interested, saved, interest count, and saved count
    const [interested, setInterested] = useState(is_interested_clicked);
    const [saved, setSaved] = useState(is_post_saved);
    const [interestCount, setInterestCount] = useState(interested_count);
    const [savedCount, setSavedCount] = useState(saved_count);
    
    // Function to handle interested click
    const handleInterestedClick = (id) => {
        // Toggle interested state
        setInterested(!interested);
        // Update interest count based on the current state
        setInterestCount(interested ? interestCount - 1 : interestCount + 1);

        // Fetch API endpoint to update post interest status
        const token = localStorage.getItem('token');
        const url = 'http://127.0.0.1:8000/api/posts/interest/';
        fetch(`${url}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({
                "id": id,
                "interest": !interested,
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Fetched Data:', data);
            // Additional logic can be added here based on API response
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    // Function to handle post save
    const handlePostSave = (id) => {
        // Toggle saved state
        setSaved(!saved);
        // Update saved count based on the current state
        setSavedCount(saved ? savedCount - 1 : savedCount + 1);

        // Fetch API endpoint to update post save status
        const token = localStorage.getItem('token');
        const url = 'http://127.0.0.1:8000/api/posts/save/';
        fetch(`${url}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({
                "id": id,
                "saved": !saved,
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Fetched Data:', data);
            // Additional logic can be added here based on API response
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    // Rendering the Post component
    return (
        <div ref ={ref} className ='post'>
            {/* Post header section */}
            <div className="post__header">
                <Avatar src="">{name[0]}</Avatar>
                <div className="post__info">
                    <h2>{name}</h2>
                    <p>{description}</p>
                </div>
            </div>

            {/* Post body section */}
            <div className="post__body">
                <p>{message}</p>
                {image_url && (<img src={image_url}/>)}
            </div>
            
            {/* Post reactions section */}
            <div className='post_reactions'>
                {/* Interested reaction */}
                <div className='interested_reaction'>
                    <div className='interested_reaction_icon'>
                        <ThumbUpIcon style = {{color:"#19B776", fontSize: 15}}/>
                    </div>
                    <p>{interestCount}</p>
                </div>
                {/* Saved reaction */}
                <div className='saved_reaction'>
                    <div >
                        <TurnedInNotIcon style = {{color:"#19B776", fontSize: 15}}/>
                    </div>
                    <p>{savedCount}</p>
                </div>
            </div>
            {/* Horizontal line */}
            <hr size="1" />
            {/* Post buttons section */}
            <div className="post__buttons">
                {/* Interested button */}
                <a onClick={() => handleInterestedClick(id)}>
                    <InputOption
                        Icon={ThumbUpIcon}
                        title="Interested"
                        color={interested ? "#19B776" : "gray"}
                    />
                </a>
                {/* Save button */}
                <a onClick={() => handlePostSave(id)}>
                    <InputOption
                        Icon={TurnedInNotIcon}
                        title={saved ? "Saved" : "Save"}
                        color={saved ? "#19B776" : "gray"}
                    />
                </a>
            </div>   
        </div>
    )
})

// Exporting the Post component
export default Post;
