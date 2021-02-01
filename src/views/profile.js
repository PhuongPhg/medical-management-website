import React from "react";
import Navigation from "../navigation";
import Grid from '@material-ui/core/Grid';
import { colors } from '../helpers/config';
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Button from '@material-ui/core/Button';
import ReactRoundedImage from "react-rounded-image";
import SamplePhoto from "../SampleProfileImage.jpg"
const AppointmentCard = (props) => {
  const styles = useStyles();

  return (
		<Card className={styles.card}>
			<CardContent>
				<Grid container justify="space-between" alignItems="center">
					<Grid item style={{ display: "flex" }} direction="row">
						<Grid item className={styles.date}>
							<Typography align="center">{props.date}</Typography>
						</Grid>
						<Grid item>
							<Typography align="left">{props.title}</Typography>
							<Typography align="left" className={styles.status}>
								{props.time}
							</Typography>
						</Grid>
					</Grid>
					<Grid item direction="row">
						{props.finished ? (
							<Typography component="span" className={styles.status}>
								Finished and reschedule in {props.nextApm}
							</Typography>
						) : null}
						<NavigateNextIcon className={styles.next_btn} />
					</Grid>
				</Grid>
			</CardContent>
		</Card>
  );
}

export default function Profile () {
  const styles = useStyles();

  return (
		<div className={styles.container}>
			<Navigation homepage />
			<Grid component="main" spacing={4} className={styles.root}>
				<Grid xs={3} direction="column" alignItems="center" className={styles.userinfo}>
        <div style={{marginTop: '30px'}}>
            <ReactRoundedImage
            image = {SamplePhoto} 
            imageWidth = "200"
            imageHeight = "200"
            roundedSize = "0"
            />
          </div>
          <div>
            <h1 style={{marginBottom: '0'}}>Nguyen Van A</h1>
            <p style={{marginTop: '0', color: '#6A6A6A', fontSize: '20px'}}>Patient</p>
          </div>
          <Grid container direction="column" style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            <div className={styles.outerBullet}>
              <div className={styles.bullet} />
              <p className={styles.bulletText}>username</p>
            </div>
            <div style={{display: 'flex', direction: 'row'}}>
              <div className={styles.outerBullet}>
                <div className={styles.bullet} />
                <p className={styles.bulletText}>Male</p>
              </div>
              <div className={styles.outerBullet} style={{marginLeft: '60px'}}>
                <div className={styles.bullet} />
                <p className={styles.bulletText}>51 ans</p>
              </div>
            </div>
            <div className={styles.outerBullet}>
              <div className={styles.bullet} />
              <p className={styles.bulletText}>0123456789</p>
            </div>
            <div className={styles.outerBullet}>
              <div className={styles.bullet} />
              <p className={styles.bulletText}>useremail@email.com</p>
            </div>
            <div className={styles.outerBullet}>
              <div className={styles.bullet} />
              <p className={styles.bulletText} style={{textAlign:'start'}}>18B Hoang Quoc Viet, Hanoi, Vietnam</p>
            </div>
            <Button variant="contained" href="#" className={styles.editButton}>EDIT</Button>
          </Grid>
				</Grid>

				<Grid xs={9} direction="row" className={styles.records}>
					<Grid container>
						<Typography variant="p" align="left" className={styles.sectionHeader}>
							Appointments
						</Typography>
						<AppointmentCard date="1 Feb" title="Lung examination" time="8:00 - 10:00 AM" finished={false}/>
				  
            <Typography variant="p" align="left" className={styles.sectionHeader}>
							Medical records
						</Typography>
            <AppointmentCard date="31 Jan" title="Lung examination" time="8:00 - 10:00 AM" finished={true} nextApm="01/02"/>
            <AppointmentCard date="30 Jan" title="Lung examination" time="8:00 - 10:00 AM" finished={true} nextApm="31/01"/>
          </Grid>
          <Grid container justify="flex-end">
            <NavigateBeforeIcon />
            <NavigateNextIcon />
          </Grid>
				</Grid>
			</Grid>
		</div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex'
  },
  row: {
    flexDirection: 'row',
  },
  userinfo: {
    height: '80vh',
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '20px',
    marginRight: '10px',
    backgroundColor: colors.secondary_background,
    display: 'flex',
    paddingLeft: '10px',
    paddingRight: '10px',  
  },
  outerBullet: {
    display: 'flex',
    justifyContent: 'center' ,
    alignItems: 'baseline',
    margin: '5px'
  },
  bullet: {
    height: '15px', 
    width:'15px', 
    marginLeft: '10px', 
    marginRight: '10px', 
    borderRadius:'50%', 
    backgroundColor: '#C4C4C4'
  },
  bulletText: {
    fontSize: '20px', 
    margin: '0px'
  },
  editButton: {
    backgroundColor:'#96C3D9', 
    width: '179px', 
    marginTop:'20px', 
    fontSize:'20px', 
    color:'#555555', 
    fontWeight:'bold', 
    alignSelf:'center', 
    borderRadius:'10px'
  },
  records: {
    height: '80vh',
    backgroundColor: colors.secondary_background,
    marginTop: '20px',
    marginBottom: '20px',
    marginRight: '20px',
    marginLeft: '10px',
    paddingTop: '20px',
    paddingBottom: '20px',
    paddingLeft: '30px',
    paddingRight: '30px',
  },
  card: {
    width: '100%',
    marginBottom: 20,
  },
  sectionHeader: {
    fontWeight: 600,
    marginLeft: 10,
    marginBottom: 10,
  },
  date: {
    color: colors.date_color,
    marginRight: 20,
    width: 40,
  },
  status: {
    color: colors.additional_info,
    marginTop: 0,
  },
  next_btn: {
    color: colors.additional_info,
    verticalAlign: 'middle',
  },
}));