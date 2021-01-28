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

export default function Schedule(){
  const classes = useStyles();
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [data, setData] = useState(
    [{
      Id: 2,
      Subject: 'Meeting',
      StartTime: new Date(2021, 0, 19, 10, 0),
      EndTime: new Date(2021, 0, 19, 12, 30),
      IsAllDay: false,
      Status: 'Completed',
      // Priority: 'High'
  }],
  )
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
                  <IconButton aria-label="create" onClick={CreateEvent}>
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
    // paddingLeft: 20,
    // backgroundColor: '#FAFAFA',
    backgroundColor: '#555555',
    minHeight: '85vh',
    alignContent: 'center',
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
  }
}));