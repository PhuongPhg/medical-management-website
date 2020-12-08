import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from './helpers/config.js';

export default function RegistrationForm() {
  const styles = useStyles();
  // const [part, setPart] = useState(null);
  const [name, setName] = useState(null);
  const [id, setId] = useState(null);
  const [symptom, setSymptom] = useState(null);
  const [firstday, setFirstday] = useState(moment().format("DD/MM/YYYY"));
  const [anamnesis, setAnamnesis] = useState(null);

  return (
    <Grid container xs={12} sm={8} md={5} className={styles.root}>
      {/* <Grid item xs={false} sm={4} md={7} className={styles.image}/> */}
      {/* <Grid item > */}
        <div className={styles.paper}>
          <Avatar className={styles.avatar}>
            <ListAltIcon /> 
          </Avatar>
          <Typography variant="h5">
            Medical Registration Form
          </Typography>
          <form className={styles.form} noValidate>
            <Grid container>
            <Grid item xs={12} sm={6}>
              <TextField 
                margin="normal"
                required
                fullWidth
                variant="outlined"
                id="patient-name"
                label="Patient name"
                onTextChange = {text => setName(text)}
                style={{marginRight: '4px'}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                margin="normal"
                required
                fullWidth
                variant="outlined"
                id="identification"
                label="ID"
                onTextChange = {text => setId(text)}
                style={{marginLeft: '4px'}}
              />
            </Grid>
            <TextField 
              multiline
              rows={4}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="symptom"
              label="Describe your health problems"
              onTextChange = {text => setSymptom(text)}
            />
            <TextField 
              multiline
              rows={4}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="anamnesis"
              label="Anamnesis"
              onTextChange={text => setAnamnesis(text)}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker 
                style={{marginTop: '16px'}}
                disableToolbar
                fullWidth
                variant="inline"
                inputVariant="outlined"
                format="MM/dd/yyyy"
                id="date-picker-inline"
                label="Set appointment date"
                value={firstday}
                onChange={val => {setFirstday(val)}}
              />
            </MuiPickersUtilsProvider>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={styles.submit}
            >
              Submit
            </Button>
          </form>
        </div>
      {/* </Grid> */}
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    direction: "row",
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  // image: {
  //   backgroundImage: "url("+"https://c1.wallpaperflare.com/preview/937/818/491/stethoscope-doctor-md-medical-health-hospital.jpg"+")",
  //   backgroundRepeat: 'no-repeat',
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center',
  // },
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
}));