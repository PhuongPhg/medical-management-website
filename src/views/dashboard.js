import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import { colors } from "../helpers/config";
import Navigation from "../navigation";
import { Button, Dialog, DialogActions, DialogTitle, InputAdornment, Modal, Table, TableFooter, TableSortLabel, TablePagination, TextField, Typography, Grid, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import EditIcon from "@material-ui/icons/Edit";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from '@material-ui/icons/Close';

export default function Dashboard() {
	const classes = useStyles();
	const [data, setData] = useState([]);
	const [page, setPage] = useState(0);
	const rowsPerPage = 20;
	const [sortDir, setSortDir] = useState("asc");
	
	const [dialogue_open, setOpen] = useState(false);
	const [form_open, setFormOpen] = useState(false);
	const [query, setQuery] = useState(null);
	const [updateItem, setUpdateItem] = useState(null);
	const [deleteItem, setDeleteItem] = useState(null);

	const [firstname, setFName] = useState(null);
	const [lastname, setLName] = useState(null);
	const [address, setAddress] = useState(null);
	const [dob, setDOB] = useState(null);
	
	const handleUpdateRequest = (item) => {
		setUpdateItem(item);
		setFName(item.firstname);
		setLName(item.lastname);
		setAddress(item.address);
		setDOB(item.dob);
		setFormOpen(true);
	}

	const handleDeleteRequest = (item) => {
		setDeleteItem(item);
		setOpen(true);
	}

	const updateData = async () => {
		const formData = {
			firstname: firstname,
			lastname: lastname,
			address: address,
			dob: dob,
		};

		try{
			// await axios.put(`http://thaonp.work/api/admin/user/${updateItem.id}`, formData, {
			await axios.put(`http://localhost:8080/api/admin/user/${updateItem.id}`, formData, {
				headers: {
					"Authorization" : `Bearer ${sessionStorage.getItem("userToken")}`
				}
			});
			// alert("Updated.");
		}
		catch(error){
			alert(error);
		}
	}

	const deleteUser = async() => {
		try{
			// await axios.delete(`http://thaonp.work/api/admin/user/${deleteItem.id}`, {
			await axios.delete(`http://localhost:8080/api/admin/user/${deleteItem.id}`, {
				headers: {
					"Authorization": `Bearer ${sessionStorage.getItem("userToken")}`
				}
			});
			setData(data.filter(item => item.id !== deleteItem.id));
		}
		catch(error){
			alert(error);
		}
	}

	const getData = async () => {
		try{
			// let res = await axios.get('http://thaonp.work/api/admin/user', {
			let res = await axios.get('http://localhost:8080/api/admin/user', {
				headers: {
					"Authorization": `Bearer ${sessionStorage.getItem("userToken")}`
				}
			});
			console.log(res.data)
			setData(res.data);
		} 
		catch(error){
			alert(error);
			// throw new Error("Error: ", error);
		}
	}

	const searchUser = async (phone) => {
		try{
			let res = await axios.get(`http://localhost:8080/api/admin/user/find?phone=${phone}`, {
				headers: {
					"Authorization": `Bearer ${sessionStorage.getItem("userToken")}`
				}
			});
			if (res.data){
				setData(res.data);
			}
			else{
				setData(null);
			}
		}
		catch(error){
			alert(error);
		}
	}

	const applyFilter = async (type) => {
		try{
			let res = await axios.get(`http://thaonp.work/api/admin/role/${type}`, {
				headers: {
					"Authorization": `Bearer ${sessionStorage.getItem("userToken")}`
				}
			});
			setData(res.data);
		}
		catch(error){
			alert(error);
		}
	}

	useEffect(() => getData(), []);

	return (
		<div className={classes.container}>
			<Navigation dashboard />
			<Grid container>
				<Grid container alignItems="center">
					<TextField
						variant="outlined"
						size="small"
						placeholder="Search by phone number"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon fontSize="small"/>
								</InputAdornment>
							),
							classes: {
								input: classes.searchInput
							}
						}}
						onChange={(text) => setQuery(text.target.value)}
						onKeyUp={(event) => {
							if (!query) {
								getData();
							} else if (event.keyCode === 13) {
								searchUser(query);
							}
						}}
						className={classes.searchBox}
					/>

					<Typography className={classes.tableCell}>Filter by role</Typography>
					<Select defaultValue="" className={classes.selectFilter} onChange={(event) => {
						if (!event.target.value){
							getData();
						}
						else{
							applyFilter(event.target.value);
						}
					}}>
						<MenuItem value="">None</MenuItem>
						<MenuItem value="admin">Admin</MenuItem>
						<MenuItem value="doctor">Doctor</MenuItem>
						<MenuItem value="patient">Patient</MenuItem>
					</Select>
				</Grid>

				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="sticky table" size="small">
						<TableHead>
							<TableRow>
								<TableCell align="left" className={classes.tableCell}>ID</TableCell>
								<TableCell align="left" sortDirection={sortDir}
									onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
									className={classes.tableCell}
								>
									<TableSortLabel direction={sortDir}>Last name</TableSortLabel>
								</TableCell>
								<TableCell align="left" className={classes.tableCell}>
									<TableSortLabel>First name</TableSortLabel>
								</TableCell>
								<TableCell align="left" className={classes.tableCell}>Username</TableCell>
								<TableCell align="left" className={classes.tableCell}>Phone</TableCell>
								<TableCell align="left" className={classes.tableCell}>Email</TableCell>
								<TableCell align="left" className={classes.tableCell}>D.O.B</TableCell>
								<TableCell align="left" className={classes.tableCell}>Sex</TableCell>
								<TableCell align="left" className={classes.tableCell}>Address</TableCell>
								<TableCell align="left" className={classes.tableCell}>Role</TableCell>
								<TableCell align="left" className={classes.tableCell}>Action</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{data ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
								<TableRow className={classes.row} key={item.id}>
									<TableCell align="left" className={classes.tableCell} width={30}>{item.id}</TableCell>
									<TableCell align="left" className={classes.tableCell} width={120}>{item.lastname}</TableCell>
									<TableCell align="left" className={classes.tableCell} width={110}>{item.firstname}</TableCell>
									<TableCell align="left" className={[classes.raw_data, classes.tableCell]} width={100}>
										{item.username}
									</TableCell>
									<TableCell align="left" className={classes.tableCell} width={100}>{item.phone}</TableCell>
									<TableCell align="left" className={[classes.raw_data, classes.tableCell]} width={180}>
										{item.email}
									</TableCell>
									<TableCell align="left" className={classes.tableCell} width={100}>{new Date(item.dob).toLocaleDateString()}</TableCell>
									<TableCell align="left" className={classes.tableCell} width={60}>{item.sex}</TableCell>
									<TableCell align="left" className={classes.tableCell} width={150}>
										{item.address}
									</TableCell>
									<TableCell align="left" className={classes.tableCell} width={100}>{item.roles[0].name}</TableCell>
									<TableCell align="left" className={classes.tableCell}>
										{/* Edit button */}
										<Button
											className={classes.button}
											variant="outlined"
											size="small"
											disableElevation
											style={{ marginRight: 10 }}
											onClick={() => {
												handleUpdateRequest(item);
											}}
										>
											<EditIcon fontSize="small" className={classes.button}/>
											Edit
										</Button>

										{/* Update form */}
										{updateItem ? (
											<Modal open={form_open} onClose={() => setFormOpen(false)} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
												<Grid container justify="center" alignItems="center">
													<form className={classes.updateForm}>
														<CloseIcon
															onClick={() => {
																// resetValue();
																setFormOpen(false);
															}}
															className={classes.closeButton}
														/>

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
															className={classes.submit}
															onClick={(event) => {
																event.preventDefault();
																updateData();
																setFormOpen(false);
																setTimeout(() => window.location.reload(), 1000);
															}}
														>
															Save
														</Button>
													</form>
												</Grid>
											</Modal>
										) : null}

										{/* Delete button */}
										<Button className={classes.button} variant="outlined" size="small" disableElevation onClick={() => handleDeleteRequest(item)}>
											<DeleteSweepIcon fontSize="small"/>
											Delete
										</Button>

										{/* Confirm delete */}
										<Dialog open={dialogue_open} onClose={() => setOpen(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
											<DialogTitle id="alert-dialog-title">{"Delete this user?"}</DialogTitle>
											<DialogActions>
												<Button
													onClick={() => {
														deleteUser();
														setOpen(false);
													}}
													color="primary"
													autoFocus
												>
													Yes
												</Button>
												<Button onClick={() => setOpen(false)} color="primary">
													No
												</Button>
											</DialogActions>
										</Dialog>
									</TableCell>
								</TableRow>
							)) : null}
						</TableBody>

						<TableFooter>
							<TableRow>
								<TablePagination rowsPerPageOptions={rowsPerPage} rowsPerPage={rowsPerPage} count={data.length} page={page} onChangePage={(event, newPage) => setPage(newPage)} />
							</TableRow>
						</TableFooter>
					</Table>
				</TableContainer>
			</Grid>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		width: 1460,
	},
	table: {
		width: "max-content",
		minWidth: "100vw",
	},
	row: {
		textTransform: "capitalize",
		"&:hover": {
			backgroundColor: colors.highlight,
		}
	},
	tableCell: {
		fontSize: 16,
		paddingTop: 2,
		paddingBottom: 2,
		paddingRight: 0,
	},
	button: {
		fontSize: 14,
		marginTop: 2,
		marginBottom: 2,

	},
	closeButton: {
		cursor: "pointer",
	},
	raw_data: {
		textTransform: "none",
	},
	searchBox: {
		margin: 20,
	},
	searchInput: {
		fontSize: 16,
	},
	updateForm: {
		position: "absolute",
		top: "25%",
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	submit: {
		marginTop: 10
	},
	selectFilter: {
		fontSize: 14,
		marginLeft: 10,
	}
}));
