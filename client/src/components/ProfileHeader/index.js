import React from 'react'
import Box from '@material-ui/core/Box';
import ProfilePic from '../ProfilePic/index';
import ProfileText from "../ProfileText/index";
import Grid from '@material-ui/core/Grid';

const ProfileHeader = ({ currUser, setCurrUser }) => {

    const classes = {
        container: {
            flexGrow:1,
            backgroundColor: "rgb(43,41,44, 0.3)",
            boder: "groove 1px rgb(43,41,44, 0.3)",
            flexWrap:"nowrap",
            borderRadius:"0px",
        },
    }


    return (
        <Grid container style={classes.container} spacing={0}>
            <Grid
                item xs={3}>

                <ProfilePic
                    currUser={currUser}
                />

            </Grid>
            <Grid
                style={classes.grid2}
                item xs={9}>
                <Box
                    style={classes.profileInfo}
                    flexGrow={4}
                    bgcolor="grey.300">
                    <ProfileText
                        currUser={currUser}
                        setCurrUser={setCurrUser}
                    />
                </Box>
            </Grid>
        </Grid>
    );

}

export default ProfileHeader;

