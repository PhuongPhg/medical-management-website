import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import styles from './button_effect.css'
import { Route, Router } from 'react-router-dom'
import { AppBar, ClickAwayListener, Grid, Link, MenuList, MenuItem, Typography, Popper, Grow, Paper } from '@material-ui/core';
import { colors } from './helpers/config';

const UserAccount = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

  prevOpen.current = open;
  }, [open]);

  return (
		<Grid container>
			<Typography
				ref={anchorRef}
				aria-controls={open ? "menu-list-grow" : undefined}
				aria-haspopup="true"
				onMouseOver={handleToggle}
				className={classes.username}
			>
				Hello {sessionStorage.getItem("username")}!
			</Typography>
      
			<Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}
					>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
									<MenuItem onClick={handleClose}>Profile</MenuItem>
									<MenuItem
										onClick={(event) => {
											handleClose(event);
											sessionStorage.setItem("userToken", null);
											sessionStorage.setItem("username", null);
											window.open("/login", "_self");
										}}
									>
										Logout
									</MenuItem>
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</Grid>
  );
}

export default function Navigation(props) {
  const classes = useStyles();
  // var currentLocation = window.location.pathname;
  // console.log(currentLocation);
  return (
    <React.Fragment>
      <AppBar position="sticky" className={classes.appbar}>
        <Grid container justify="space-between">
          <Grid item>
            <Link href="/homepage" className={props.homepage ? [classes.navlink, classes.active] : classes.navlink}>Homepage</Link>
            {sessionStorage.getItem("role") === "ROLE_ADMIN" ? <Link href="/dashboard" className={props.dashboard ? [classes.navlink, classes.active] : classes.navlink}>Dashboard</Link> : null}
            <Link href="#" className={props.schedule ? [classes.navlink, classes.active] : classes.navlink}>Schedule</Link>
            <Link href="#" className={props.contact ? [classes.navlink, classes.active] : classes.navlink}>Contact</Link>
            <Link href="#" className={props.services ? [classes.navlink, classes.active] : classes.navlink}>Services</Link>
          </Grid>
          <Grid item>
          {
            sessionStorage.getItem("userToken") !== null ? 
              <UserAccount/> :
              <Grid item>
                <Link href="/login" className={classes.navlink}>Login</Link>
                <Link href="/" className={classes.navlink}>Sign Up</Link>
              </Grid>
          }
          </Grid>
        </Grid>
      </AppBar>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: colors.primary,
    height: 55,
    justifyContent: "center",
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding:0,
  },
  navlink: {
    color: 'white',
    textDecoration: 'none',
    textTransform: 'uppercase',
    padding: 15,
    opacity: 0.7,
    '&:hover': {
      opacity:1,
    },
  },
  active: {
    backgroundColor: colors.primary_light,
    opacity: 1
  },
  username: {
    // textTransform: 'uppercase',
    marginRight: 20,
    cursor: 'pointer'
  }
}));