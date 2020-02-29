import React, { useState, useEffect } from 'react'
import Paper from 'material-ui/Paper'
import List, { ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import Person from 'material-ui-icons/Person'
import Divider from 'material-ui/Divider'
import { createMuiTheme } from 'material-ui/styles'


const Profile = ({ currUser, setCurrUser }) => {
  const theme = createMuiTheme();
  const classes = {
    root: theme.mixins.gutters({
      maxWidth: 600,
      margin: 'auto',
      padding: theme.spacing.unit * 3,
      marginTop: theme.spacing.unit * 5
    }),
    title: {
      margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 2}px`,
      color: theme.palette.protectedTitle
    },
    root1: theme.mixins.gutters({
      maxWidth: 600,
      margin: '12px 24px',
      padding: theme.spacing.unit * 3,
      backgroundColor: '#3f3f3f0d'
    }),
    title1: {
      margin: `${theme.spacing.unit * 2}px 0 12px ${theme.spacing.unit}px` ,
      color: theme.palette.openTitle
    }
  }

  const [state, setState] = useState({
    offers: [],
    needs: []
  });

  useEffect(() => {
    console.log(currUser);
    let currOffers = currUser.offers;
    console.log(currOffers);
    let currNeeds = currUser.needs;
    setState({ ...state, 
      offers: currOffers,
      needs: currNeeds
     })
  }, [])


  return (
    <Paper style={classes.root} elevation={4}>
      <Typography type="title" style={classes.title}>
        Profile
        </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={currUser.name} secondary={currUser.email} />
        </ListItem>
        <Divider />
      </List>
      <Paper style={classes.root1} elevation={4}>
        <Typography type="title" style={classes.title1}>
          Your Offers
        </Typography>
        <List dense>
          {state.offers.map((offer, i) => {
            return <span key={i}>
              <a href={offer.link} target="_blank">
                <ListItem button>
                  <ListItemText primary={<strong>{offer}</strong>} secondary={`quantity: ${offer.quantity} price: $${offer.price}`} />
                </ListItem>
              </a>
              <Divider />
            </span>
          })}
        </List>
      </Paper>
      <Paper style={classes.root1} elevation={4}>
        <Typography type="title" style={classes.title1}>
          Your Needs
        </Typography>
        <List dense>
          {state.needs.map((need, i) => {
            return <span key={i}>
              <a href={need.link} target="_blank">
                <ListItem button>
                  <ListItemText primary={<strong>{need}</strong>} secondary={`quantity: ${need.quantity} price: $${need.price}`} />
                </ListItem>
              </a>
              <Divider />
            </span>
          })}
        </List>
      </Paper>
    </Paper>
    
  )
}

export default Profile
