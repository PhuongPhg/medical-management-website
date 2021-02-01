import React, {useState, useEffect} from "react";
import Navigation from "../navigation";
import Grid from '@material-ui/core/Grid';
import { colors } from '../helpers/config';
import { Button, Card, CardContent, Modal, TextField, Tooltip, Typography, makeStyles, IconButton } from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import RegistrationForm from './registrationform';

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
						<NavigateNextIcon className={styles.nextBtn} />
					</Grid>
				</Grid>
			</CardContent>
		</Card>
  );
}

export default function Profile () {
  const styles = useStyles();
  const [newRecord, setOpenNewRecord] = useState(false);

  return (
		<div className={styles.container}>
			<Navigation homepage />
			<Grid component="main" spacing={4} className={styles.root}>
				<Grid xs={3} className={styles.userinfo}>
					<h1 styles={{ backgroundColor: "#000000" }}>ksjflkjasklfjdklj</h1>
				</Grid>

				<Grid xs={9} direction="row" className={styles.records}>
					<Grid container>
						{/* Appointments */}
						<Typography variant="p" align="left" className={styles.sectionHeader}>
							Appointments
						</Typography>
						<AppointmentCard date="1 Feb" title="Lung examination" time="8:00 - 10:00 AM" finished={false} />

						{/* Medical records */}
						<Grid container direction="row" justify="space-between" alignItems="center">
							<Typography variant="p" className={styles.sectionHeader}>
								Medical records
							</Typography>

							<IconButton onClick={() => setOpenNewRecord(true)}>
								<AddIcon />
							</IconButton>
						</Grid>
						<AppointmentCard date="31 Jan" title="Lung examination" time="8:00 - 10:00 AM" finished={true} nextApm="01/02" />
						<AppointmentCard date="30 Jan" title="Lung examination" time="8:00 - 10:00 AM" finished={true} nextApm="31/01" />
					</Grid>
					<Grid container justify="flex-end">
						<NavigateBeforeIcon />
						<NavigateNextIcon />
					</Grid>
				</Grid>

				<Modal open={newRecord} onClose={() => setOpenNewRecord(false)} className={styles.modal}>
					<Grid xs="5" className={styles.newRecordForm} align="right">
						<Tooltip title="Close" onClick={() => setOpenNewRecord(false)}>
							<IconButton aria-label="closeDetail" style={{ width: 40, height: 40, margin: 0 }}>
								<CloseIcon />
							</IconButton>
						</Tooltip>
            <RegistrationForm />
					</Grid>
				</Modal>
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
  nextBtn: {
    color: colors.additional_info,
    verticalAlign: 'middle'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  newRecordForm: {
		backgroundColor: theme.palette.background.paper,
    borderRadius: 7,
    padding: 10,
  }
}));