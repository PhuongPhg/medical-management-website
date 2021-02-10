import React, { useState } from "react";
import Navigation from "../navigation";
import Grid from '@material-ui/core/Grid';
import { colors } from '../helpers/config';
import { Button, Card, CardContent, Modal, TextField, Tooltip, Typography, makeStyles, IconButton, Avatar } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import RegistrationForm from './registrationform';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { useLocation } from "react-router-dom";
import axios from 'axios';

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

const UpdateForm = (props) => {
	const styles = useStyles();

	const setFormOpen = props.setFormOpen;
	const [firstname, setFName] = useState(null);
	const [lastname, setLName] = useState(null);
	const [address, setAddress] = useState(null);
	const [dob, setDOB] = useState(null);
	const uID = props.userID;
	const user = props.userInfo;

	const handleUpdateRequest = () => {
		setLName(user.lastname);
		setFName(user.firstname);
		setAddress(user.address);
		setDOB(user.dob);
	}

	const updateData = async (userID) => {
		const formData = {
			firstname: firstname,
			lastname: lastname,
			address: address,
			dob: dob,
		};

		try {
			await axios.put(`http://thaonp.work/api/public/user/${userID}`, formData, {
				headers: {
					"Authorization": `Bearer ${sessionStorage.getItem("userToken")}`
				}
			});
			sessionStorage.setItem("userFullName", lastname + ' ' + firstname);
		}
		catch (error) {
			alert(error);
		}
	}

	React.useEffect(() => handleUpdateRequest(), [])

	return (
		<Grid container justify="center" alignItems="center">
			<form className={styles.updateForm}>
				<Grid container justify="flex-end">
					<IconButton>
						<CloseIcon
							onClick={() => {
								setFormOpen(false);
							}}
						/>
					</IconButton>
				</Grid>
				<Grid style={{ paddingLeft: 30, paddingRight: 30 }}>
					<Grid container spacing={3}>
						<Grid item xs={6} sm={5}>
							<TextField name="firstName" required={true} fullWidth label={"First name"} value={firstname} onChange={(event) => setFName(event.target.value)} />
						</Grid>
						<Grid item xs={6} sm={7}>
							<TextField name="lastName" required fullWidth label="Last Name" value={lastname} onChange={(event) => setLName(event.target.value)} />
						</Grid>
					</Grid>

					<TextField margin="normal" required fullWidth label="Address" name="address" value={address} onChange={(event) => setAddress(event.target.value)} />

					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							disableToolbar
							variant="inline"
							format="yyyy-MM-dd"
							label="DOB"
							value={dob}
							fullWidth
							onChange={(event) => {
								setDOB(event);
							}}
						/>
					</MuiPickersUtilsProvider>

					<Button
						fullWidth
						variant="contained"
						className={styles.submit}
						onClick={(event) => {
							event.preventDefault();
							updateData(uID);
							setFormOpen(false);
							setTimeout(() => window.location.reload(), 1000);
						}}
					>
						Save
				</Button>
				</Grid>
			</form>
		</Grid>
	);
}

const InfoItem = (props) => {
  const styles = useStyles();
  const toCapitalize = (text) => {
	return text.charAt(0).toUpperCase() + text.slice(1)
  }

  return (
    <div className={styles.outerBullet}>
      <div className={styles.bullet} />
      <p className={styles.bulletText}>{props.capitalize ? toCapitalize(String(props.info)) : props.info}</p>
    </div>
  );
}

export default function Profile () {
	const styles = useStyles();
	const location = useLocation();
	const [uid, setUID] = useState(null)
	const [newRecord, setOpenNewRecord] = useState(false);
	const [form_open, setFormOpen] = useState(false);
	const [userInfo, setUserInfo] = useState([]);
	const [userRole, setRole] = useState('ROLE_VOID');
	const [updateItem, setUpdateItem] = useState(null);

	const getProfile = async (userID) => {
		try{
			let res = await axios.get(`http://thaonp.work/api/public/user/${userID}`, {
				headers: {
					"Authorization": `Bearer ${sessionStorage.getItem("userToken")}`
				}
			});
			setUserInfo(res.data);
			setRole(res.data.roles[0].name);
			console.log(res.data);
		} 
		catch(error){
			alert(error);
		}
	}

	React.useEffect(() => {
		getProfile(location.state.detail);
		setUID(location.state.detail);
		console.log(location.state.detail);
	}, []);

	return (
		<div className={styles.container}>
			<Navigation />
			<Grid component="main" spacing={4} className={styles.root}>
				<Grid xs={3} direction="column" alignItems="center" className={styles.userinfo}>
					<div style={{ marginTop: "30px" }}>
						<Avatar alt="User avatar" style={{ height: "200px", width: "200px" }} />
					</div>
					<div>
						<h1 style={{ marginBottom: "0" }}>{userInfo.firstname + " " + userInfo.lastname}</h1>
						<p style={{ marginTop: "0", color: "#6A6A6A", fontSize: "20px" }}>{userRole.charAt(5).toUpperCase() + userRole.substring(6).toLowerCase()}</p>
					</div>
					<Grid container direction="column" style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }}>
						<InfoItem info={userInfo.username} />
						<div style={{ display: "flex", direction: "row" }}>
							<InfoItem info={userInfo.sex} capitalize/>
							<div className={styles.outerBullet} style={{ marginLeft: "60px" }}>
								<div className={styles.bullet} />
								<p className={styles.bulletText}>{(new Date().getFullYear()) - (new Date(userInfo.dob).getFullYear())} ans</p>
							</div>
						</div>
						<InfoItem info={userInfo.phone} />
						<InfoItem info={userInfo.email} />
						<InfoItem info={userInfo.address} />
						{sessionStorage.getItem("userID") === uid ? (
							<Button variant="contained" onClick={() => setFormOpen(true)} className={styles.editButton}>
								EDIT
							</Button>
						) : null}
					</Grid>
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

							{sessionStorage.getItem("role") === "ROLE_DOCTOR" ? (
								<IconButton onClick={() => setOpenNewRecord(true)}>
									<AddIcon />
								</IconButton>
							) : null}
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
						<RegistrationForm setFormOpen={setOpenNewRecord} doctor={sessionStorage.getItem("userFullName")} userID={uid} user={userInfo}/>
					</Grid>
				</Modal>

				<Modal open={form_open} onClose={() => setFormOpen(false)} className={styles.modal}>
					<UpdateForm setFormOpen={setFormOpen} userID={uid} userInfo={userInfo}/>
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
    height: 'max-content',
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
    marginLeft: '20px', 
    marginRight: '10px', 
    borderRadius:'50%', 
    backgroundColor: '#C4C4C4'
  },
  bulletText: {
    fontSize: '20px', 
    margin: '0px',
    textAlign: 'start'
  },
  editButton: {
    backgroundColor:'#96C3D9', 
    width: '179px', 
    marginTop:'20px', 
    marginBottom:'20px', 
    fontSize:'20px', 
    color:'#555555', 
    fontWeight:'bold', 
    alignSelf:'center', 
    borderRadius:'10px'
  },
  records: {
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
  },
  updateForm: {
		width: 400,
		backgroundColor: theme.palette.background.paper,
		borderRadius: 7,
		boxShadow: theme.shadows[5],
		padding: 10,
  },
  submit: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: colors.primary
	},
}));