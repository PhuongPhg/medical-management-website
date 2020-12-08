import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './button_effect.css'
import { Route, Link, Router } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
    textTransform: 'uppercase'
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export default function Navigation() {
  const classes = useStyles();
  
  // var currentLocation = window.location.pathname;
  // console.log(currentLocation);
  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        {/* <Button size="big">Subscribe</Button> */}
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          noWrap
          className={classes.toolbarTitle}
        >
           
        </Typography>
        <Button size="medium">
          Sign up
        </Button>
        <Button size="medium" className={styles.buttonEffect} tabIndex="1">
          <Link to="/login" >
          Log in
          </Link>
          
        </Button>
      </Toolbar>
    </React.Fragment>
  );
}