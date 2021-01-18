import React, { useState } from 'react';
import '../App.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../helpers/config';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();
  const styles = useStyles();
  const [username, setUsername] = useState(null);
  const [pwd, setPwd] = useState(null);
  const [msg, setMsg] = useState("");

  const signIn = async () => {
    try {
		// let res = await axios.post("http://thaonp.work/api/auth/signin", {
		let res = await axios.post("http://localhost:8080/api/auth/signin", {
			username: username,
			password: pwd,
      });

		sessionStorage.setItem("userToken", res.data.accessToken);
		sessionStorage.setItem("username", res.data.username);
		sessionStorage.setItem("role", res.data.roles[0]);
		history.push("/homepage");
		} catch (error) {
			alert("Invalid account or password!");
		}
    
  }

  return (
		<Grid container component="main" className={styles.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={styles.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={styles.paper}>
					<Avatar className={styles.avatar} onClick={signIn}>
						<LockOutlinedIcon />
					</Avatar>

					<Typography component="h1" variant="h5">
						Sign In
					</Typography>

					<form className={styles.form} Validate>
						<TextField margin="normal" required fullWidth id="email" label="Username" name="username" autoFocus onChange={(text) => setUsername(text.target.value)} />

						<TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" onChange={(text) => setPwd(text.target.value)} />

						{/* <Grid container justify="left">
              <FormControlLabel
                control={<Checkbox value="remember" color={colors.primary} />}
                label="Remember me"
              />
            </Grid> */}

						<Button
							type="submit"
							fullWidth
							variant="contained"
							className={styles.submit}
							onClick={(event) => {
								event.preventDefault();
								signIn();
							}}
						>
							Sign In
						</Button>

						<Grid container justify="space-between">
							<Grid item>
								<Link href="/forgot" variant="body2" underline="none">
									Forgot password?
								</Link>
							</Grid>

							<Grid item>
								<Link href="/" variant="body2" underline="none">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>

						<Typography variant="p" paragraph>
							{msg}
						</Typography>
					</form>
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