
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Link, withRouter } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: '450px',
        backgroundColor: "rgb(86,86,86)",
        position: 'fixed',
        left: '50%',
        transform: 'translate(-50%)',
        bottom: 0
    },
});





const Footer = withRouter(({ history, currUser, setCurrUser }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState();
    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction label="Back" icon={<ArrowBackIcon />} onClick={() => history.goBack()} />
        </BottomNavigation>
    );
})

export default Footer