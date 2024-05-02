import InputOption from '../Helper/InputOption';
import React, {useState, forwardRef} from "react";
import "./Post.css";
import { Avatar } from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';


const Post =  forwardRef (({id, name, description, message, image_url, is_interested_clicked, is_post_saved, interested_count, saved_count}, ref) => {
    
    const [interested, setInterested] = useState(is_interested_clicked);
    const [saved, setSaved] = useState(is_post_saved);
    const [interestCount, setInterestCount] = useState(interested_count);
    const [savedCount, setSavedCount] = useState(saved_count);
    
    const handleInterestedClick = (id) => {
        setInterested(!interested)
        setInterestCount(interested ? interestCount - 1 : interestCount + 1);

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
            // navigate('/dashboard/default');
        })
        .catch(error => {
        console.error('Error:', error);
        });
    };

    const handlePostSave = (id) => {
        setSaved(!saved)
        setSavedCount(saved ? savedCount - 1 : savedCount + 1);
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
            // navigate('/dashboard/default');
        })
        .catch(error => {
        console.error('Error:', error);
        });
    };

    return (
        <div ref ={ref} className ='post'>
            <div className="post__header">
                <Avatar src="">{name[0]}</Avatar>
                <div className="post__info">
                    <h2>{name}</h2>
                    <p>{description}</p>
                </div>
            </div>

            <div className="post__body">
                <p>{message}</p>
                {image_url && (<img src={image_url}/>)}
            </div>
            <div className='post_reactions'>
                <div className='interested_reaction'>
                    <div className='interested_reaction_icon'>
                        <ThumbUpIcon style = {{color:"#19B776", fontSize: 15}}/>
                    </div>
                    <p>{interestCount}</p>
                </div>
                <div className='saved_reaction'>
                    <div >
                        <TurnedInNotIcon style = {{color:"#19B776", fontSize: 15}}/>
                    </div>
                    <p>{savedCount}</p>
                </div>
            </div>
            <hr size="1" />
            <div className="post__buttons">
                <a onClick={() => handleInterestedClick(id)}>
                    <InputOption
                    Icon={ThumbUpIcon}
                    title="Interested"
                    color={interested ? "#19B776" : "gray"}
                /></a>
                
                {/* <InputOption Icon = {ChatOutlinedIcon}  title ="Comment" color ="gray"/> */}
                {/* <InputOption Icon = {TurnedInNotIcon}  title ="Save" color ="gray"/> */}
                <a onClick={() => handlePostSave(id)}>
                    <InputOption
                    Icon={TurnedInNotIcon}
                    title={saved ? "Saved" : "Save"}
                    color={saved ? "#19B776" : "gray"}
                /></a>
                {/* <InputOption Icon = {SendOutlinedIcon}  title ="Send" color ="gray"/> */}
            </div>   
        </div>
    )
})


export default Post;