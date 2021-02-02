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
import CloseIcon from '@material-ui/icons/Close';

export default function Schedule(){
  const classes = useStyles();
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [data, setData] = useState(
    [{
      Id: 1,
      Subject: 'Lung Examination',
      StartTime: new Date(2021, 0, 31, 10, 0),
      EndTime: new Date(2021, 0, 31, 12, 30),
      Status: 'Completed',
      Description: 'Hurt and hard breath'
      // Priority: 'High'
  },
  
], )
  const [symptom, setSymptom] = useState('');
  const [firstday, setFirstday] = useState(moment().format('yyyy-MM-DDTkk:mm'));
  const [title, setTitle] = useState('');

  const [openCreate, setOpenCreate] = useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const[tempDetail, setTempDetail] = useState({
    title: '',
    StartTime: new Date(),
    EndTime: new Date(),
    description: '',
    status: '',
    Notes: ''
  });
  const [openDetail, setOpenDetail] = useState(false);
  const handleOpenDetail = (item) => { 
    setTempDetail(
      {
        title: item.Subject,
        StartTime: item.StartTime,
        EndTime: item.EndTime,
        description: item.Description ? item.Description : 'None',
        status: item.status ? item.status : 'None',
        Notes: ''
      });
    setOpenDetail(true)
  };
  const handleCloseDetail = () => setOpenDetail(false);
  
  // useEffect(()=>{
  //   console.log(data);
  //   // console.log(moment(firstday).add(120, 'minutes').format('yyyy-MM-DDTkk:mm'))
  // },[data])

  const onSubmit = () => {
    let max = 0;
    data.forEach(e => {
      if(e.Id > max){
        max = e.Id;
      }
    });
    console.log(firstday)
    setData(pre => [...pre, {
      Id: max+1,
      Subject: title,
      StartTime: new Date(moment(firstday)),
      EndTime: new Date(moment(firstday).add(120, 'minutes').format('yyyy-MM-DDTkk:mm')),
      Description: symptom
    }])
  }

  return(
    <div>
      <Navigation schedule />
      <Grid container className={classes.container}>
        <Grid item xs={3}>
          <Paper className={classes.profile_contain} style={{width: '90%'}} >
            <Grid container spacing={3} className={classes.bar} >
              <Grid item xs={12} sm={6} className={classes.textInBar}>
                Upcoming
              </Grid>
              <Grid item xs={12} sm={6} style={{textAlign: 'right', }}>
                <Tooltip title="Create an appointment">
                  <IconButton aria-label="create" onClick={handleOpenCreate}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <div style={{overflowY: 'scroll', whiteSpace: 'wrap', height: '100%'}}>
            {
              data ? data.map((item)=>{
                return(
                  <Paper className={classes.listAppoint} key={item.Id} onClick={() => handleOpenDetail(item)} >
                    <Grid container spacing={3}>
                      <Grid item  xs={6} sm={3} style={{color: colors.primary, fontSize: 15}}>
                        <div style={{display:'flex', flexDirection: 'column', fontSize: 14}}>
                          <div style={{flex: 2, textAlign: 'center', padding: 2}}>{item.StartTime.getDate()}</div>
                          <div style={{flex:1, textAlign:'center', padding: 2}}>{day[item.StartTime.getDay()]}</div>
                        </div>
                      </Grid>
                      <Grid item  xs={12} sm={9} style={{textAlign: 'left'}}>
                        <div style={{display:'flex', flexDirection: 'column'}}>
                          <div style={{flex: 2, padding: 2}}>{item.Subject}</div>
                          <div style={{flex:1, padding: 2, fontSize: 12, color: colors.grey }}>{item.StartTime.getHours() < 10 ? '0' : ''}{item.StartTime.getHours()}:{item.StartTime.getMinutes() < 10 ? '0': ''}{item.StartTime.getMinutes()} - {item.EndTime.getHours() < 10 ? '0':''}{item.EndTime.getHours()}:{item.EndTime.getMinutes() < 10 ? '0': ''}{item.EndTime.getMinutes()}</div>
                        </div>
                      </Grid>
                    </Grid>
                  </Paper>
                  )}) : null
                }
                </div>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.profile_contain} style={{width: '98%', marginLeft: 5}}>
          <ScheduleComponent height='550px' selectedDate={new Date()} eventSettings={{ dataSource: data, allowAdding: false, allowDeleting: false, allowEditing: false,  fields: { 
            Id: 'Id', 
            Subject: { name: 'Subject' }, 
            StartTime: { name: 'StartTime' }, 
            EndTime: { name: 'EndTime' } 
        }}}
            actionComplete={()=> console.log(data)}
            cssClass='custom-class'
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
        open={openCreate}
        onClose={handleCloseCreate}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
      >
        <Fade in={openCreate}>
          <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <ListAltIcon /> 
          </Avatar>
          <Typography variant="h5">
            Medical Registration Form
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container style={{marginBottom: 10}}>
            <Grid item xs={12} sm={6}>
              <TextField 
                margin="normal"
                required
                fullWidth
                variant="outlined"
                id="patient-name"
                label="Patient name"
                InputProps={{
                  readOnly: true,
                }}
                value={sessionStorage.getItem("username")}
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
                InputProps={{
                  readOnly: true,
                }}
                value={sessionStorage.getItem("userID")}
                style={{marginLeft: '4px'}}
              />
            </Grid>
            <TextField 
              multiline
              rows={2}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              value={title}
              onChange={text => setTitle(text.target.value)}
            />
            <TextField 
              multiline
              rows={3}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={symptom}
              id="symptom"
              label="Describe your health problems"
              onChange = {text => setSymptom(text.target.value)}
            />
            <TextField
              id="datetime-local"
              label="Date and Time"
              type="datetime-local"
              // format='yyyy-MM-ddThh:mm'
              fullWidth
              defaultValue={firstday}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={txt => setFirstday(txt.target.value)}
            />
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <Button
                // type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
                style={{backgroundColor: colors.primary}}
                onClick={onSubmit}
                >
                  Submit
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                // type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
                onClick={handleCloseCreate}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
            
          </form>
        </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openDetail}
        onClose={handleCloseDetail}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
      >
        <Fade in={openDetail}>
          <div className={classes.paper}>
            <Grid container justify='space-between' direction='row'>
              <Grid item direction='column' style={{display: 'flex', marginBottom: 15}}>
                <Grid item>
                  <Typography align="left" variant="h5">{tempDetail.title}</Typography>
                </Grid>
                <Grid item>
                  <Typography align="left" varient="h6" style={{color: colors.grey}}>
                    {day[tempDetail.StartTime.getDay()]} at {tempDetail.StartTime.getHours()}:{tempDetail.StartTime.getMinutes()} to {tempDetail.EndTime.getHours()}:{tempDetail.EndTime.getMinutes()}</Typography>
                </Grid>
              </Grid>
              {/* <Typography align="right">Doctor: Unknow</Typography> */}
              <Tooltip title="Close" onClick={handleCloseDetail}>
                <IconButton aria-label="closeDetail" style={{width: 40, height: 40, margin: 0}}>
                  <CloseIcon style={{color: colors.primary}} />
                </IconButton>
              </Tooltip>
              <Grid item xs={12} spacing={2}>
                <Grid item style={{marginBottom: 15, color: colors.grey}}>
                  <Typography align="left">Description: {tempDetail.description}</Typography>
                  <Typography align="left">Status: {tempDetail.status}</Typography>
                </Grid>
                <Typography align='left' style={{marginBottom: 5}}>Notes</Typography>
                <TextField fullWidth id="filled-basic" variant="filled" value={tempDetail.Notes} rows={3}  multiline style={{paddingBottom: 10}}/>
              </Grid>
            </Grid>
            
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
    // maxWidth: '40%',
    alignItems: 'center',
    margin: 'auto',
    borderRadius: 10,
    outline: 'none',
    // minWidth: '30%'
    width: '40%'
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
