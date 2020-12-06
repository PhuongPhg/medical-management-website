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
import color from './config';
import { Route, Link, BrowserRouter } from 'react-router-dom'


export default function Register(){
  const styles = useStyles();
  const [firstName, setFirstName]= useState('');
  const [lastName, setLastName]= useState('');
  const [sex,setSex] = useState('');
  const [phone, setPhone] =useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState(moment().format("DD/MM/YYYY"))

  return(
    <Grid container className={styles.root}>
      <Grid item xs={false} sm={4} md={7} className={styles.image}/>
      <Grid item xs={12} sm={8} md={5}>
        <div className={styles.paper}>
          <Avatar className={styles.avatar}>
            <LockOpenIcon />
          </Avatar>
          <Typography variant="h5">
            Sign up
          </Typography>
          <form className={styles.form} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={5}>
                <TextField 
                  name="firstName"
                  // variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
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
                />
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                 <Grid item xs={4} sm={4}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    id="date-picker-inline"
                    label="DOB"
                    value={dob}
                    onChange={e => {setDob(e)}}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <Grid item xs={8} sm={8}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                />
              </Grid>
              <Grid item xs={4} sm={4}>
                <FormControl fullWidth className={styles.formControl}>
                  <InputLabel>Role</InputLabel>
                    <Select
                      id="role"
                      value={role}
                      onChange={e=>{setRole(e.target.value)}}
                      label="role"
                    >
                    <MenuItem value={"Patient"}>Patient</MenuItem>
                    <MenuItem value={'Docter'}>Docter</MenuItem>
                    <MenuItem value={'Admin'}>Admin</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4} sm={4}>
                <TextField
                  fullWidth
                  id="Street"
                  label="Street"
                  />
              </Grid>
              <Grid item xs={4} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="district"
                  label="District"
                />
              </Grid>
              <Grid item xs={4} sm={4}>
                <TextField
                  fullWidth
                  required
                  id="city"
                  label="City"
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  />
              </Grid>
              <Grid item xs={5} sm={5}>
                <TextField
                  required
                  fullWidth
                  id="pass"
                  label="Password"
                  type="password"
                />
              </Grid>
            </Grid>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            // color='#81b3cb'
            className={styles.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
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