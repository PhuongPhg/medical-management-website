import React, { useState } from 'react';
import { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';
// import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import {colors} from '../helpers/config';
import { Link, useHistory } from 'react-router-dom'
import Login from './login';
import axios from "axios";
import { SnackbarProvider, useSnackbar } from 'notistack';
import PulseLoader from "react-spinners/PulseLoader";

export default function Register(){
  const styles = useStyles();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName]= useState('');
  const [lastName, setLastName]= useState('');
  const [sex,setSex] = useState('');
  const [phone, setPhone] =useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState(moment().format("YYYY-MM-DD"));
  const [street, setStreet] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [hover, setHover]=useState(false);

  let history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const enabled = firstName.length > 0 && 
  lastName.length > 0 &&
  phone.length > 0 &&
  email.length > 0 &&
  district.length > 0 &&
  city.length > 0 &&
  username.length > 0 &&
  password.length > 0;
  
  async function OnSignUp(e) {
    setLoading(true);
		try {
			e.preventDefault();
			const data = {
				firstname: firstName,
				lastname: lastName,
				username: username,
				email: email,
				password: password,
				phone: phone,
				address: district + ", " + city,
				sex: sex,
				dob: dob,
				role: [role],
			};
			let res = await axios.post("http://thaonp.work/api/auth/signup", data);
			// let res = await axios.post('http://localhost:8080/api/auth/signup', data)

			// console.log(res.data)
			console.log(res.data);
			if (res.status == 200) {
				enqueueSnackbar(res.data.message, { variant: "success" });

				// enqueueSnackbar(`Hello ${firstName} ${lastName}!`, { variant: 'success'});

				// sessionStorage.setItem("username", username);

				enqueueSnackbar("Please log in!", { variant: "info" });

				setTimeout(function () {
					history.push("/login");
				}, 500);
			}
		} catch (e) {
			enqueueSnackbar(e.response.data.message, { variant: "error" });
    }
    setLoading(false);
  }

  if (loading){
		return(
			<Grid container justify="center" alignItems="center" style={{height: "100vh"}}>
				<PulseLoader color={colors.primary_light} loading={loading} size={15} margin={7}/>
			</Grid>
		)
	}
  else return(
    <Grid container className={styles.root}>
      <Grid item xs={false} sm={4} md={7} className={styles.image}/>
      <Grid item xs={12} sm={8} md={5}>
        <div className={styles.paper}>
          <Avatar className={styles.avatar} >
            <LockOpenIcon />
          </Avatar>
          <Typography variant="h5">
            Sign up
          </Typography>
          <form className={styles.form} Validate onSubmit={OnSignUp} >
            <Grid container spacing={3}>
              <Grid item xs={6} sm={5}>
                <TextField 
                  name="firstName"
                  // variant="outlined"
                  required={true}
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={e => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={5}>
                <TextField 
                  name="lastName"
                  // variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  onChange ={e => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={2} sm={2}>
                <FormControl fullWidth className={styles.formControl}>
                  <InputLabel>Sex</InputLabel>
                  <Select
                    id="sex"
                    value={sex}
                    onChange={e=>{setSex(e.target.value)}}
                    label="Sex"
                  >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'Male'}>Male</MenuItem>
                  <MenuItem value={'Female'}>Female</MenuItem>
                </Select>
                </FormControl>
              </Grid>
              <Grid item xs={8} sm={8}>
                <TextField
                  // variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoComplete="phone"
                  onChange={e=>setPhone(e.target.value)}
                />
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                 <Grid item xs={4} sm={4}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="yyyy-MM-dd"
                    id="date-picker-inline"
                    label="DOB"
                    value={dob}
                    onChange={e => {setDob(e)}}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <Grid item xs={8} sm={8}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  onChange={e=>setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={4} sm={4}>
                <FormControl fullWidth className={styles.formControl}>
                  <InputLabel>Role</InputLabel>
                    <Select
                      id="role"
                      value={role}
                      onClick={e=>{setRole(e.target.value)}}
                      label="role"
                      // defaultValue={'Patient'}
                    >
                    <MenuItem value={"patient"}>Patient</MenuItem>
                    <MenuItem value={'doctor'}>Doctor</MenuItem>
                    <MenuItem value={'admin'}>Admin</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4} sm={4}>
                <TextField
                  fullWidth
                  id="Street"
                  label="Street"
                  onChange={e=>setStreet(e.target.value)}
                  />
              </Grid>
              <Grid item xs={4} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="district"
                  label="District"
                  onChange={e=>setDistrict(e.target.value)}
                />
              </Grid>
              <Grid item xs={4} sm={4}>
                <TextField
                  fullWidth
                  required
                  id="city"
                  label="City"
                  onChange = {e => setCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  onChange={e=>setUsername(e.target.value)}
                  />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="pass"
                  label="Password"
                  type="password"
                  onChange={e=>setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            // color='#81b3cb'
            disabled={!enabled}
            className={styles.submit}
            onClick={OnSignUp}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2"
                style={hover ? {textDecoration: 'none', color: '#555555'} : {textDecoration: 'none', color: '#81b3cb'}}
                onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}

const useStyles=makeStyles((theme)=>({
  root:{
    minHeight: '100vh'
  },
  row:{
    display: 'flex',
    flexDirection: 'row'
  },
  image: {
    backgroundImage: "url("+"https://c1.wallpaperflare.com/preview/937/818/491/stethoscope-doctor-md-medical-health-hospital.jpg"+")",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper:{
    margin: theme.spacing(6, 4),
    // backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar:{
    margin: theme.spacing(1),
    backgroundColor: '#81b3cb'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#81b3cb'
  }
}))
