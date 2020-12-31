import React, {useState, useEffect} from "react";
import Navigation from "../navigation";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../helpers/config';
import { FaStethoscope, FaWpforms } from 'react-icons/fa';

export default function Homepage () {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Navigation Homepage />
			<Grid component="main" spacing={0} className={styles.root} direction="column">
        <Grid xs={12} className={styles.image}>
          <Grid className={styles.header} direction="columm" alignItems='center' justify="space-around">
            <Grid xs={4} className={styles.texttitle} >
              <h1 style={{marginBottom: '0px'}}>MEDICAL<br />MANAGEMENT<br />SYSTEM</h1>
              {/* <p className={styles.textdescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis magna nibh, tristique suscipit magna porta non. Nulla mauris eros, facilisis ac mollis eget, lacinia sit amet justo. Proin semper commodo metus blandit vestibulum.</p> */}
            </Grid>
            <Grid xs={6} className={styles.textdescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis magna nibh, tristique suscipit magna porta non. Nulla mauris eros, facilisis ac mollis eget, lacinia sit amet justo. Proin semper commodo metus blandit vestibulum.
            </Grid>
            <Grid style={{display:'flex', marginBottom: '3vh'}}>
              <Button
              variant="contained" 
              className={styles.register}
              href="/registrationform">
              Make an appointment
            </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={styles.moreinfo}>
          <Grid className={styles.about}>
            <h1 style={{marginBottom: '0px'}}>Our Services</h1>
            <div className={styles.underlined} />
          </Grid>
          <Grid className={styles.services}>
            <Grid xs={6} className={styles.subservices} style={{marginLeft:'2vw'}} >
              <Grid xs={3}>
                <FaStethoscope size="80px" style={{color: colors.primary}}/>
              </Grid>
              <Grid xs={5} style={{textAlign: 'left'}}>
              <h3>Make an appointment online</h3>
              <p>You can easily make an appointment just by logging in and filling the medical form.</p>              
              </Grid>
            </Grid>
            <Grid xs={6} className={styles.subservices}>
              <Grid xs={3}>
                <FaWpforms size="80px" style={{color: colors.primary}}/>
              </Grid>
              <Grid xs={5} style={{textAlign:'left'}}>
                <h3 style={{marginBottom:'0px'}}>View records online</h3>
                <p>View online medical records easily, anywhere, anytime</p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>    
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://c1.wallpaperflare.com/preview/937/818/491/stethoscope-doctor-md-medical-health-hospital.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundColor: 
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundPosition: 'center',

  },
  header: {
    height: '100%',
    width: '100%',
    paddingTop: '1vh',
    paddingLeft: '3vw',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    color: 'white',
    width: '100vw',
    paddingBottom: '3vh',
  },
  texttitle: {
    textAlign: 'left',
    fontSize: '30px',

  },
  textdescription: {
    textAlign: 'left',
    fontSize: '22px',
    color: '#D8D8D8',
    fontStyle: 'italic',
    marginBottom: '20px',
    display:'flex'
  },
  register: {
    backgroundColor: '#333333',
    color: 'white',
    marginTop: '20px',
    alignSelf: 'flex-start',
  },
  underlined: {
    height: '13px',
    width: '60px',
    backgroundColor: colors.primary,
    alignSelf: 'center',
  },
  about: {
    textAlign: 'left',
    marginLeft: '3vw'
  },
  services: {
    marginTop: '30px',
    display: 'flex'
  },
  subservices: {
    display: 'flex',
    alignItems: 'center'
  }
}));