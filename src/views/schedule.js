import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Navigation from '../navigation';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { ScheduleComponent,  Week, Month, Day, Inject, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
import moment from 'moment';

export default function Schedule(){
  const classes = useStyles();
  
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
  // var now = new Date(2021, 1, 15);
  // var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  // var day = days[ now.getDay() ];
  var day = new Date();
  useEffect(()=>{
    day=moment().format("YYYY, MM, DD");
    console.log(data[0].StartTime)
  })
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
                  <IconButton aria-label="create">
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <Paper className={classes.listAppoint}>
              <Grid container spacing={3}>
                <Grid item  xs={6} sm={3}>
                  3
                </Grid>
                <Grid item  xs={12} sm={9}>
                  3
                </Grid>
              </Grid>
            </Paper>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.profile_contain} style={{width: '98%', marginLeft: 5}}>
          <ScheduleComponent height='550px' selectedDate={new Date()} eventSettings={{ dataSource: data,}}
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