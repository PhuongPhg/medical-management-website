import React from 'react';
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

export default function Register(){
  const styles = useStyles();
  const [sex,setSex] = React.useState('');

  const handleChange = (event) => {
    setSex(event.target.value);
  };
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField 
                  name="firstName"
                  // variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  name="lastName"
                  // variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  name="firstName"
                  // variant="outlined"
                  fullWidth
                  id="firstName"
                  label="DOB"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth className={styles.formControl}>
                  <InputLabel>Sex</InputLabel>
                  <Select
                    id="sex"
                    value={sex}
                    onChange={handleChange}
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
              <Grid item xs={12}>
                <TextField
                  // variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
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
}))