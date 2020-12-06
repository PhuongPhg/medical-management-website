import React, { useState } from 'react';
import './App.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from './config.js';

const Response = () => {
  const styles = useStyles();

  return(
    <Grid container xs="10" justify="center">
      <Typography component="h1" variant="h5" align="center" paragraph>
        Password reset request sent
      </Typography>
      <Typography variant ="body2" align="justify" paragraph>
        A password message was sent to your email address. Please click the link in that message to reset your password.
      </Typography>
      <Typography variant ="body2" align="justify">
        If you do not receive the password message within a few moments, please check your Spam folder or other filtering tools.
      </Typography>
    </Grid>
  )
}

export default function ForgotPassword() {
  const styles = useStyles();
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState(null);

  return (
    <Grid container component="main" className={styles.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={styles.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={styles.paper}>
          <Avatar className={styles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          {done ? <Response/> : 
          <Grid container justify="center">
            <Typography component="h1" variant="h5" gutterBottom>
              Reset your password
            </Typography>
            <Typography variant="body2" align="left">
              Please enter your email address to recover your password.
            </Typography>
            <form className={styles.form} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email address"
                name="email"
                autoComplete="email"
                autoFocus
                onTextChange={text => setEmail(text)}
              />
      
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={styles.submit}
                onClick={() => setDone(true)}
              >
                Reset password
              </Button>
              {/* <Grid container justify="center">
                <Grid item>
                  <Link href="/login" variant="body2" underline="none">
                    {"Login"}
                  </Link>
                </Grid>
              </Grid> */}
            </form>
          </Grid>
          }
        </div>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://c1.wallpaperflare.com/preview/937/818/491/stethoscope-doctor-md-medical-health-hospital.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: colors.primary,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: colors.primary,
    color: 'black',
  },
  link: {
    color: colors.primary,
    textDecoration: 'none',
  },
  hover: {
    color: colors.grey,
  }
}));