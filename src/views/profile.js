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
								{props.desc}
							</Typography>
						</Grid>
					</Grid>
					{props.more ? (
						<IconButton>
							<NavigateNextIcon className={styles.nextBtn} />
						</IconButton>
					) : null}
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
	const [records, setRecords] = useState(null);
	const [apm, setApm] = useState([]);
	const numPerPage = 3;
	const [noPage, setNoPage] = useState(0)
	const [noPageApm, setNoPageApm] = useState(0)
	const [page, setPage] = useState(0)
	const [pageApm, setPageApm] = useState(0)

	const getProfile = async (userID) => {
		try{
			let res = await axios.get(`http://thaonp.work/api/public/user/${userID}`, {
				headers: {
					"Authorization": `Bearer ${sessionStorage.getItem("userToken")}`
				}
			});
			setUserInfo(res.data);
			setRole(res.data.roles[0].name);
			getApm(res.data.roles[0].name, userID);
			console.log(res.data);
		} 
		catch(error){
			alert(error);
		}
	}

	const getRecords = async (userID) => {
		try{
			let res = await axios.get(`http://thaonp.work/api/doctor/medicalRecord/${userID}`, {
				headers: {
					"Authorization" : `Bearer ${sessionStorage.getItem("userToken")}`
				}
			})
			setRecords(res.data);
			setNoPage(Math.ceil(res.data.length/numPerPage));
		}
		catch(error){
			console.log(error);
		}
	}

	const getApm = async (role, userID) => {
		try{
			let res = await axios.get(`http://thaonp.work/api/appointments/${roles[role]}/${userID}`, {
				headers: {
					"Authorization" : `Bearer ${sessionStorage.getItem("userToken")}`
				}
			})
			let sortedApm = res.data.sort((a,b) => 
				new Date(a.appointmentStartTime).getTime() - new Date(b.appointmentStartTime).getTime())
			setApm(sortedApm);
			setNoPageApm(Math.ceil(res.data.length/numPerPage));
		}
		catch(error){
			console.log(error);
		}
	}

	React.useEffect(() => {
		getProfile(location.state.detail);
		getRecords(location.state.detail);
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
						<h1 style={{ marginBottom: "0" }}>{userInfo.lastname + " " + userInfo.firstname}</h1>
						<p style={{ marginTop: "0", color: "#6A6A6A", fontSize: "20px" }}>{userRole.charAt(5).toUpperCase() + userRole.substring(6).toLowerCase()}</p>
					</div>
					<Grid container direction="column" style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }}>
						<InfoItem info={userInfo.username} />
						<div style={{ display: "flex", direction: "row" }}>
							<InfoItem info={userInfo.sex} capitalize />
							<div className={styles.outerBullet} style={{ marginLeft: "60px" }}>
								<div className={styles.bullet} />
								<p className={styles.bulletText}>{new Date().getFullYear() - new Date(userInfo.dob).getFullYear()} ans</p>
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
						<Grid container>
							<Typography variant="p" align="left" className={styles.sectionHeader}>
								Appointments
							</Typography>
						</Grid>

						{apm.length > 0 ? (
							apm
								.slice(numPerPage * pageApm, numPerPage * pageApm + numPerPage)
								.map((item) => (
									<AppointmentCard
										date={new Date(item.appointmentStartTime).getUTCDate() + " " + months[new Date(item.appointmentStartTime).getMonth()]}
										title={item.subject}
										desc={
											new Date(item.appointmentStartTime).getHours() +
											":" +
											new Date(item.appointmentStartTime).getMinutes() +
											`${new Date(item.appointmentStartTime).getMinutes() > 10 ? "" : "0"}` +
											" - " +
											new Date(item.appointmentEndTime).getHours() +
											":" +
											new Date(item.appointmentEndTime).getMinutes() +
											`${new Date(item.appointmentEndTime).getMinutes() > 10 ? "" : "0"}`
										}
										more
									/>
								))
						) : (
							<Typography className={styles.noRecord}>No appointment exists.</Typography>
						)}

						{apm.length > 0 ? (
							<Grid container justify="flex-end">
								<IconButton onClick={() => setPageApm(pageApm - 1)} disabled={pageApm - 1 < 0}>
									<NavigateBeforeIcon />
								</IconButton>

								<IconButton onClick={() => setPageApm(pageApm + 1)} disabled={!(pageApm + 1 < noPageApm)}>
									<NavigateNextIcon />
								</IconButton>
							</Grid>
						) : null}

						{/* Medical records */}
						<Grid container direction="row" justify="space-between" alignItems="center">
							<Typography variant="p" className={styles.sectionHeader}>
								Medical records
							</Typography>

							{sessionStorage.getItem("role") === "ROLE_DOCTOR" && sessionStorage.getItem("userID") !== uid ? (
								<IconButton onClick={() => setOpenNewRecord(true)}>
									<AddIcon />
								</IconButton>
							) : null}
						</Grid>
						{records ? (
							records.slice(numPerPage * page, numPerPage * page + numPerPage).map((item) => <AppointmentCard date={new Date(item.date).getUTCDate() + " " + months[new Date(item.date).getMonth()]} title={item.details} desc={item.prescriptions} />)
						) : (
							<Typography className={styles.noRecord}>No record exists.</Typography>
						)}
					</Grid>

					{records ? (
						<Grid container justify="flex-end">
							<IconButton onClick={() => setPage(page - 1)} disabled={page - 1 < 0}>
								<NavigateBeforeIcon />
							</IconButton>

							<IconButton onClick={() => setPage(page + 1)} disabled={!(page + 1 < noPage)}>
								<NavigateNextIcon />
							</IconButton>
						</Grid>
					) : null}
				</Grid>

				<Modal open={newRecord} onClose={() => setOpenNewRecord(false)} className={styles.modal}>
					<Grid xs="5" className={styles.newRecordForm} align="right">
						<Tooltip title="Close" onClick={() => setOpenNewRecord(false)}>
							<IconButton aria-label="closeDetail" style={{ width: 40, height: 40, margin: 0 }}>
								<CloseIcon />
							</IconButton>
						</Tooltip>
						<RegistrationForm setFormOpen={setOpenNewRecord} doctor={sessionStorage.getItem("userFullName")} userID={uid} user={userInfo} />
					</Grid>
				</Modal>

				<Modal open={form_open} onClose={() => setFormOpen(false)} className={styles.modal}>
					<UpdateForm setFormOpen={setFormOpen} userID={uid} userInfo={userInfo} />
				</Modal>
			</Grid>
		</div>
	);
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const roles = {
	"ROLE_DOCTOR":"doctor",
	"ROLE_ADMIN":"admin",
	"ROLE_PATIENT":"patient"
};

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
	 marginTop: 10,
    marginBottom: 10,
  },
  sectionHeader: {
    fontWeight: 600,
    marginLeft: 10,
  },
  noRecord: {
	 fontSize: 16,
	 marginLeft: 10,
	 marginTop: 10,
	 marginBottom: 5,
	 color: colors.additional_info
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