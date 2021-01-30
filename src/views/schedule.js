import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Navigation from '../navigation';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { colors } from '../helpers/config.js';
import { ScheduleComponent,  Week, Month, Day, Inject, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Avatar from '@material-ui/core/Avatar';
import ListAltIcon from '@material-ui/icons/ListAlt';
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

export default function Schedule(){
  const classes = useStyles();
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [data, setData] = useState(
    [{
      Id: 2,
      Subject: 'Meeting',
      StartTime: new Date(2021, 0, 29, 10, 0),
      EndTime: new Date(2021, 0, 29, 12, 30),
      IsAllDay: false,
      Status: 'Completed',
      // Priority: 'High'
  }],
  )
  const [name, setName] = useState(null);
  const [id, setId] = useState(null);
  const [symptom, setSymptom] = useState(null);
  const [firstday, setFirstday] = useState(moment().format("DD/MM/YYYY"));
  const [anamnesis, setAnamnesis] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };
  const CreateEvent = () => {
      setData(
        [{
          Id: 2,
          Subject: 'Meeting',
          StartTime: new Date(2021, 0, 19, 10, 0),
          EndTime: new Date(2021, 0, 19, 12, 30),
          IsAllDay: false,
          Status: 'Completed',
          // Priority: 'High'
      },
      {
        Id: 3,
        Subject: 'Lung Examination',
        StartTime: new Date(2021, 0, 20, 10, 0),
        EndTime: new Date(2021, 0, 20, 12, 30),
        IsAllDay: false,
        Status: 'Completed',
        // Priority: 'High'
    }],
      )
  }
  useEffect(()=>{
    console.log(data)
  },[data])
  return(
    <div>
      <Navigation Schedule />
      <Grid container className={classes.container}>
        <Grid item xs={3}>
          <Paper className={classes.profile_contain} style={{width: '90%'}}>
            <Grid container spacing={3} className={classes.bar}>
              <Grid item xs={12} sm={6} className={classes.textInBar}>
                Upcoming
              </Grid>
              <Grid item xs={12} sm={6} style={{textAlign: 'right', }}>
                <Tooltip title="Create an appointment">
                  <IconButton aria-label="create" onClick={handleOpen}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            {
              data.map((item)=>{
                return(
                  <Paper className={classes.listAppoint}>
                    <Grid container spacing={3}>
                      <Grid item  xs={6} sm={3} >
                        <div style={{display:'flex', flexDirection: 'column', fontSize: 14}}>
                          <div style={{flex: 2, textAlign: 'center', padding: 2}}>{item.StartTime.getDate()}</div>
                          <div style={{flex:1, textAlign:'center', padding: 2}}>{day[item.StartTime.getDay()]}</div>
                        </div>
                      </Grid>
                      <Grid item  xs={12} sm={9} style={{textAlign: 'left'}}>
                        <div style={{display:'flex', flexDirection: 'column'}}>
                          <div style={{flex: 2, padding: 2}}>{item.Subject}</div>
                          <div style={{flex:1, padding: 2, fontSize: 12, color: colors.grey }}>{item.StartTime.getHours()}:{item.StartTime.getMinutes()} - {item.EndTime.getHours()}:{item.EndTime.getMinutes()}</div>
                        </div>
                      </Grid>
                    </Grid>
                  </Paper>
                  )})
                }
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.profile_contain} style={{width: '98%', marginLeft: 5}}>
          <ScheduleComponent height='550px' selectedDate={new Date()} eventSettings={{ dataSource: data, allowAdding: false, allowDeleting: false, allowEditing: false}}
            actionComplete={()=> console.log(data)}
            >
          <ViewsDirective>
            <ViewDirective option='Day'/>
            <ViewDirective option='Week'/>
            <ViewDirective option='Month'/>
          </ViewsDirective>
          <Inject services={[Day, Week, Month]}/>
        </ScheduleComponent>
          </Paper>
        </Grid>
      </Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <ListAltIcon /> 
          </Avatar>
          <Typography variant="h5">
            Medical Registration Form
          </Typography>
          <form className={classes.form} noValidate>
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
              className={classes.submit}
              onSubmit={CreateEvent}
            >
              Submit
            </Button>
          </form>
        </div>
        </Fade>
      </Modal>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  container:{
    // margin: 10,
    // padding: 10
    flexGrow: 1,
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  profile_contain: {
    backgroundColor: '#F8F8F8',
    minHeight: '85vh',
    alignContent: 'center',
    margin: 'auto',
  },
  paper: {
    padding: 20,
    backgroundColor: '#f6f5f5',
    alignContent: 'center',
    textAlign: 'center',
    maxWidth: '40%',
    alignItems: 'center',
    margin: 'auto'
  },
  bar:{
    // paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'left',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  textInBar:{
    display: 'inline-grid', 
    justifyItems: 'start', 
    alignItems: 'center'
  },
  listAppoint:{
    marginBottom: 10, 
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    padding: 5,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    margin: 'auto',
    textAlign: 'center',
    marginBottom: theme.spacing(1),
    backgroundColor: colors.primary,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));