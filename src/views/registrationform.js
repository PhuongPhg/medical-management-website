import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import Navigation from "../navigation";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../helpers/config.js';
import axios from 'axios';

export default function RegistrationForm(props) {
	const styles = useStyles();
	// const [part, setPart] = useState(null);
	const [name, setName] = useState(null);
	const [id, setId] = useState(null);
	const [symptom, setSymptom] = useState(null);
	const [firstday, setFirstday] = useState(moment().format("DD/MM/YYYY"));
	const [prescription, setPrescription] = useState(null);

	const createMedicalRecord = async () => {
		const data = {
			"date": moment().format("YYYY-MM-DD"),
			"doctor": props.doctor,
			"userId": props.userID,
			"firstname": props.firstname,
			"lastname": props.lastname,
			"phone": props.phone,
			"details": symptom,
			"prescriptions": prescription
		}

		try{
			await axios.post("thaonp.work/api/doctor/medicalRecord", data, {
				headers: {
					"Authorization" : `Bearer ${sessionStorage.getItem("userToken")}`
				}
			})
		}
		catch(error){
			alert(error);
		}
	}

	return (
		<Grid className={styles.paper}>
			<Typography variant="h5">Medical Record Form</Typography>
			<form className={styles.form} Validate>
				<Grid container>
					<TextField size="small" multiline rows={2} variant="outlined" margin="normal" required fullWidth id="symptom" label="Describe health problems" onTextChange={(text) => setSymptom(text)} />
					<TextField size="small" multiline rows={4} variant="outlined" margin="normal" required fullWidth label="Prescription" onTextChange={(text) => setPrescription(text)} />
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							style={{ marginTop: "16px" }}
							disableToolbar
							fullWidth
							variant="inline"
							inputVariant="outlined"
							format="MM/dd/yyyy"
							id="date-picker-inline"
							label="Set appointment date"
							value={firstday}
							onChange={(val) => {
								setFirstday(val);
							}}
						/>
					</MuiPickersUtilsProvider>
				</Grid>
				<Button type="submit" fullWidth variant="contained" className={styles.submit}>
					Submit
				</Button>
			</form>
		</Grid>
	);
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 20,
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