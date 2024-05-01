import InputOption from '../Helper/InputOption';
import React, {useState, forwardRef} from "react";
import "./Post.css";
import { Avatar } from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';


const Post =  forwardRef (({name, description, message, image_url}, ref) => {
    const [interested, setInterested] = useState(false);
    const [saved, setSaved] = useState(false);
    
    const handleInterestedClick = () => {
        setInterested(!interested);
      };

      const handlePostSave= () => {
        setSaved(!saved);
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
            <div className="post__buttons">
                <a onClick={handleInterestedClick}>
                    <InputOption
                    Icon={ThumbUpIcon}
                    title="Interested"
                    color={interested ? "#19B776" : "gray"}
                /></a>
                
                <InputOption Icon = {ChatOutlinedIcon}  title ="Comment" color ="gray"/>
                {/* <InputOption Icon = {TurnedInNotIcon}  title ="Save" color ="gray"/> */}
                <a onClick={handlePostSave}>
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