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
import PulseLoader from "react-spinners/PulseLoader";
import axios from 'axios';
import { isToday, setDate } from 'date-fns';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box';
import { SnackbarProvider, useSnackbar } from 'notistack';

export default function Schedule(){
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [data, setData] = useState([])
  
  const [symptom, setSymptom] = useState('');
  const [firstday, setFirstday] = useState(moment().format('yyyy-MM-DDTkk:mm'));
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('')

  const [doctor, setDoctor] = useState([])
  const [chooseDoctor, setChooseDoctor]= useState({
    doctorId: null,
    nameOfDoctor: ''
  })

  const [page, setPage] = useState(1)

  const [openCreate, setOpenCreate] = useState(false);
  
  const handleOpenCreate = () => { getAllDoctor(); setOpenCreate(true)};
  const handleCloseCreate = () => setOpenCreate(false);

  const[tempDetail, setTempDetail] = useState({
    id: null,
    title: '',
    StartTime: new Date(),
    EndTime: new Date(),
    description: '',
    status: '',
    Notes: '',
    patient: '',
    doctor: '',
  });
  const [openDetail, setOpenDetail] = useState(false);
  const handleOpenDetail = (item) => { 
    setTempDetail(
      {
        id: item.Id,
        title: item.Subject,
        StartTime: item.StartTime,
        EndTime: item.EndTime,
        description: item.Description ? item.Description : 'None',
        status: item.status ? item.status : 'None',
        Notes: item.Note ? item.Note : '',
        patient: item.nameOfPatient,
        doctor: item.nameOfDoctor,
      });
    setOpenDetail(true)
  };
  const handleCloseDetail = () => {
    setOpenDetail(false);
    setSymptom('');
    setFirstday(moment().format('yyyy-MM-DDTkk:mm'));
    setTitle('');
    setNote('')
  }
  const onSubmit = async () => {
    const newApp = {
      subject: title,
      appointmentStartTime: moment(firstday).format('yyyy-MM-DDTkk:mm:ss'),
      appointmentEndTime:  moment(firstday).add(60, 'minutes').format('yyyy-MM-DDTkk:mm:ss'),
      notes: note,
      description: symptom,
      doctorId: chooseDoctor.doctorId,
      nameOfDoctor: chooseDoctor.nameOfDoctor,
      patientId: sessionStorage.getItem("userID"),
      nameOfPatient: sessionStorage.getItem("userFullName")
    }
    console.dir(JSON.stringify(newApp))
    try{
      let res = await axios.post(`http://thaonp.work/api/appointments/`, newApp, {
        headers: {"Authorization": `Bearer ${sessionStorage.getItem("userToken")}`}
      });
      getData()
    }
    catch(error){
      console.log(error)
    }
    handleCloseCreate()
  }

  const onCancel = async () => {
    let HOUR = 60 * 60 * 1000*24;
    let temp = tempDetail.StartTime - new Date();
    let checkedHour = (temp < HOUR && temp > 0) ? false : true;
    console.log(checkedHour)
    const statusCan= {status: "CANCELED"}

    if(tempDetail.status == "SCHEDULED"){
      if(checkedHour == true){
        try{
          let res = await axios.patch(`http://thaonp.work/api/appointments/${tempDetail.id}`, statusCan , {
          headers: {"Authorization": `Bearer ${sessionStorage.getItem("userToken")}`}})
          if (res.status == 200) enqueueSnackbar("Success cancel appointment!", { variant: "success" });
          setTimeout(function () {
            window.location.reload();
          }, 200);
        }
        catch(error){
          console.log(error)
        }
      }
      else enqueueSnackbar("Cannot be canceled 24 hours prior to the appointment!", { variant: "error" });
    } else enqueueSnackbar(`This appointment had been ${tempDetail.status.toLowerCase()}`, { variant: "error" })
    
    handleCloseDetail()
  }

  const getData = async () => {
      try{
        let res = null;
        if (sessionStorage.getItem("username") != null && sessionStorage.getItem("role") != "ROLE_ADMIN"){
          let role = sessionStorage.getItem("role") == "ROLE_PATIENT" ? "patient" : "doctor"
          res = await axios.get(`http://thaonp.work/api/appointments/${role}/${sessionStorage.getItem("userID")}`, {
            headers: {"Authorization": `Bearer ${sessionStorage.getItem("userToken")}`}
          });
        } else {
          res = await axios.get(`http://thaonp.work/api/appointments/all`);
        }
        let newData = res.data
        newData = newData.map(item => {
          return {
            Id: item.id,
            StartTime: new Date(moment(item.appointmentStartTime)),
            EndTime: new Date(moment(item.appointmentEndTime)),
            Subject: item.subject,
            Note: item.notes,
            Description: item.description,
            nameOfDoctor: item.nameOfDoctor,
            doctorId: item.doctorId,
            status: item.status,
            nameOfPatient: item.nameOfPatient
          }
        })
        newData = newData.sort((a,b) => a.StartTime - b.StartTime)
        if(newData != null){
          let point = newData.indexOf(newData.find(day => day.StartTime > new Date()))
          let first = newData.splice(0, point)
          let canApp = newData.filter(x => x.status === "CANCELED")
          first.concat(canApp)
          canApp.forEach( x => newData.splice(newData.indexOf(x), 1))
          newData = newData.concat(first)
        }
        setData(newData)
        console.log(data)
      }
      catch(error){
        console.log(error);
      }
    }
  const getAllDoctor = async () => {
    try{
      let res = await axios.get(`http://thaonp.work/api/admin/role/doctor`, {
        headers: {"Authorization": `Bearer ${sessionStorage.getItem("userToken")}`}
      })
      let listDoc = res.data
      listDoc = listDoc.map(item => {
        return{
          nameOfDoctor: item.firstname + ' '+ item.lastname,
          doctorId: item.id,
        }
      })
      setDoctor(listDoc)
    }
    catch(error){
      console.log(error);
    }
  }
  useEffect(() => {
    getData()
  }, [])

  if (loading){
		return(
			<Grid container justify="center" alignItems="center" style={{height: "100vh"}}>
				<PulseLoader color={colors.primary_light} loading={loading} size={15} margin={7}/>
			</Grid>
		)
	}
  else return(
    <div >
      <Navigation schedule />
      <Grid container className={classes.container}>
        <Grid item xs={3}>
          <Paper className={classes.profile_contain} style={{width: '90%' }} >
            <Grid container spacing={3} className={classes.bar} >
              <Grid item xs={12} sm={6} className={classes.textInBar}>
                Upcoming
              </Grid>
              {sessionStorage.getItem("role") == "ROLE_PATIENT" ?
              <Grid item xs={12} sm={6} style={{textAlign: 'right', }}>
                <Tooltip title="Create an appointment">
                  <IconButton aria-label="create" onClick={handleOpenCreate}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </Grid>: null }
            </Grid>
            <div style={{ whiteSpace: 'wrap', height: '100%'}}>
            {
              data ? data.slice((page-1)*6, page*6).map((item)=>{
                let checked = false
                if (item.EndTime < new Date() || item.status == "CANCELED")  checked = true
                return(
                  <Paper className={classes.listAppoint} style={checked ? {backgroundColor: '#f6f5f5', color: colors.additional_info} : {backgroundColor: 'white'}} key={item.Id} onClick={() => handleOpenDetail(item)} >
                    <Grid container spacing={3}>
                      <Grid item  xs={6} sm={3} className={classes.dateBox} style={ isToday(item.StartTime) ? {color: colors.primary} : {color: colors.grey}} >
                        <div className={classes.dateBoxDiv} style={checked ? {color: colors.additional_info} : {}}>
                          <div style={{flex: 2, textAlign: 'center', padding: 2}}>{item.StartTime.getDate()}</div>
                          <div style={{flex:1, textAlign:'center', padding: 2}}>{month[item.StartTime.getMonth()]}</div>
                        </div>
                      </Grid>
                      <Grid item  xs={12} sm={9} style={{textAlign: 'left'}}>
                        <div style={{display:'flex', flexDirection: 'column'}}>
                          <div style={{flex: 2, padding: 2}}>{item.Subject}</div>
                          <div style={((item.StartTime.getDate() < new Date().getDate()) || checked == true) ? {flex:1, padding: 2, fontSize: 12, color: colors.additional_info} : { flex:1, padding: 2, fontSize: 12, color: colors.grey}}>{item.StartTime.getHours() < 10 ? '0' : ''}{item.StartTime.getHours()}:{item.StartTime.getMinutes() < 10 ? '0': ''}{item.StartTime.getMinutes()} - {item.EndTime.getHours() < 10 ? '0':''}{item.EndTime.getHours()}:{item.EndTime.getMinutes() < 10 ? '0': ''}{item.EndTime.getMinutes()}</div>
                        </div>
                      </Grid>
                    </Grid>
                  </Paper>
                  )}) : null
                }
                <Box justifyContent="center" display="flex" >
                {data.length !== 0 ? (
                  <Pagination count={Math.ceil(data.length/6)} page={page} classes={{ ul: classes.ul }} onChange={(e, v) => setPage(v)} />
                ) : "No appointment!"}
              </Box>
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
            <Grid container>
            <Grid xs={12} sm={6}>
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
            <Grid xs={12} sm={6}>
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
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField 
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                value={title}
                onChange={text => setTitle(text.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                multiline
                rows={2}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={symptom}
                id="symptom"
                label="Describe your health problems"
                onChange = {text => setSymptom(text.target.value)}
                />
              </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                variant = "outlined"
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
                style={{marginRight: '4px'}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth required >
                  <InputLabel>Doctor</InputLabel>
                  <Select
                    id="Doctor"
                    value={chooseDoctor}
                    onChange={e => setChooseDoctor(e.target.value)}
                    label="Doctor"
                    >
                    {doctor ? doctor.map((item) => {
                      return (
                        <MenuItem value={item}>{item.nameOfDoctor}</MenuItem>
                      )
                    }): <MenuItem value={null}><em>None</em></MenuItem>}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                multiline
                rows={2}
                variant="outlined"
                margin="normal"
                fullWidth
                value={note}
                id="Note"
                label="Note"
                onChange = {text => setNote(text.target.value)}
                />
              </Grid>
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
              <Grid item direction='column' style={{display: 'flex', marginBottom: 15, }} xs={10}>
                <Grid item xs={12}>
                  <Typography align="left" variant="h5">{tempDetail.title}</Typography>
                </Grid>
                <Grid item fullWidth>
                  <Typography align="left" varient="h6" style={{color: colors.grey}}>
                    {day[tempDetail.StartTime.getDay()]} at {tempDetail.StartTime.getHours()}:{tempDetail.StartTime.getMinutes()} to {tempDetail.EndTime.getHours()}:{tempDetail.EndTime.getMinutes()}</Typography>
                </Grid>
              </Grid>
              <Tooltip title="Close" onClick={handleCloseDetail}>
                <IconButton aria-label="closeDetail" style={{width: 40, height: 40, margin: 0}}>
                  <CloseIcon style={{color: colors.primary}} />
                </IconButton>
              </Tooltip>
              <Grid item xs={12} spacing={2}>
              <Grid container >
                  <Grid item xs={6}>
                    <Box fontFamily="fontFamily" align="left">Patient: {tempDetail.patient}</Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="left">Doctor: {tempDetail.doctor}</Typography>
                  </Grid>
                </Grid>
                <Grid item style={{marginBottom: 15, color: colors.grey}}>
                  <Typography align="left">Description: {tempDetail.description}</Typography>
                  <Typography align="left">Status: {tempDetail.status}</Typography>
                </Grid>
                <Typography align='left' style={{marginBottom: 5}}>Notes</Typography>
                <TextField fullWidth id="filled-basic" variant="filled" value={tempDetail.Notes} rows={3}  multiline style={{paddingBottom: 10}}/>
              </Grid>
              {sessionStorage.getItem("role") == "ROLE_PATIENT" || sessionStorage.getItem("role") == "ROLE_DOCTOR" ? 
                <Grid item xs={12}>
                  <Button
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                  style={{backgroundColor: colors.primary}}
                  onClick={onCancel}
                  >
                    Cancel Appointment
                  </Button>
                </Grid> 
              : null}
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
  ul: {
    "& .Mui-selected": {
      backgroundColor: colors.primary,
    }
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
    padding: 11,
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
  dateBox: {
    fontSize: 15, 
    justifySelf: 'center', 
    alignSelf: 'center'
  },
  dateBoxDiv: {
    display:'flex', 
    flexDirection: 'column', 
    fontSize: 14
  }
}));
