import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
const Profileimage = {
    // if user.profilepic exists, then image = this.profile image
    // else, Profileimage = "../img/defaultPic"
}
export default function ImageAvatars({currUser}) {
  const classes = {
    root: {
      marginLeft:"auto",
      marginRight: 'auto'
    },
    large: {
      margin: "18px",
      boxShadow: "2px 4px 2px rgb(43,41,44, 0.3)",
      width: '70px',
      height: '70px'
    },
  
  };
  return (
    <div style={classes.root}>
      <Avatar 
      alt="Profile Pic" 
      src={'/uploads/'+currUser.image} 
      style={classes.large} />
    </div>
  );
}