import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import { colors } from "../helpers/config";
import Navigation from "../navigation";
import { Button, Dialog, DialogActions, DialogTitle, Icon, Input, InputAdornment, InputLabel, FormControl, Modal, Table, TableFooter, TableSortLabel, TablePagination, TextField, Typography, Grid } from "@material-ui/core";
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

// const UpdateForm = (props) => {

	
// 	const resetValue = () => {
// 		setFName(props.item.firstname);
// 		setLName(props.item.lastname);
// 		setAddress(props.item.address);
// 		setDOB(props.item.dob);
// 	}



// 	return (

// 	);
// };

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
			await axios.post(`http://thaonp.work/api/admin/user/${updateItem.id}`, formData, {
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
			await axios.delete(`http://thaonp.work/api/admin/user/${deleteItem.id}`, {
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
			let res = await axios.get('http://thaonp.work/api/admin/user', {
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
			let res = await axios.get(`http://thaonp.work/api/admin/user/find?phone=${phone}`, {
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
				{/* <DataGrid columns={columns}/> */}
				{/* <Grid item xs="11"> */}
				<TextField
					id="search-input"
					variant="outlined"
					size="small"
					placeholder="Search"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
					onChange={(text) => setQuery(text.target.value)}
					onKeyUp={(event) => {
						if (!query) {
							getData();
						} else if (event.keyCode === 13) {
							searchUser(query);
						}
					}}
					className={classes.searchInput}
				/>

				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="sticky table" size="small">
						<TableHead>
							<TableRow>
								<TableCell align="left">ID</TableCell>
								<TableCell
									align="left"
									sortDirection={sortDir}
									onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
								>
									<TableSortLabel direction={sortDir}>Last name</TableSortLabel>
								</TableCell>
								<TableCell align="left">
									<TableSortLabel>First name</TableSortLabel>
								</TableCell>
								<TableCell align="left">Username</TableCell>
								<TableCell align="left">Phone</TableCell>
								<TableCell align="left">Email</TableCell>
								<TableCell align="left">D.O.B</TableCell>
								<TableCell align="left">Sex</TableCell>
								<TableCell align="left">Address</TableCell>
								<TableCell align="left">Role</TableCell>
								<TableCell align="left">Action</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
								<TableRow className={classes.row} key={item.id}>
									<TableCell align="left">{item.id}</TableCell>
									<TableCell align="left">{item.lastname}</TableCell>
									<TableCell align="left">{item.firstname}</TableCell>
									<TableCell align="left" className={classes.raw_data}>
										{item.username}
									</TableCell>
									<TableCell align="left">{item.phone}</TableCell>
									<TableCell align="left" className={classes.raw_data}>
										{item.email}
									</TableCell>
									<TableCell align="left">{new Date(item.dob).toLocaleDateString()}</TableCell>
									<TableCell align="left">{item.sex}</TableCell>
									<TableCell align="left" className={classes.row}>
										{item.address}
									</TableCell>
									<TableCell align="left">{item.roles[0].name}</TableCell>
									<TableCell align="left">
										{/* Edit button */}
										<Button
											variant="outlined"
											size="small"
											disableElevation
											style={{ marginRight: 10 }}
											onClick={() => {
												handleUpdateRequest(item);
											}}
										>
											<EditIcon />
											Edit
										</Button>

										{/* Update form */}
										{ updateItem ?
										<Modal
											open={form_open}
											onClose={() => setFormOpen(false)}
											aria-labelledby="simple-modal-title"
											aria-describedby="simple-modal-description"	
										>
											<Grid container justify="center" alignItems="center">
											<form className={classes.update_form}>
												<CloseIcon onClick={() => { 
													// resetValue();
													setFormOpen(false);
												}}
												className={classes.closeButton}/>

												<Grid container spacing={3}>
													<Grid item xs={6} sm={5}>
														<TextField 
															name="firstName"
															required={true}
															fullWidth
															label={"First name"}
															value={firstname}
															onChange={event => setFName(event.target.value)}
														/>
													</Grid>
													<Grid item xs={6} sm={7}>
														<TextField 
															name="lastName"
															required
															fullWidth
															label="Last Name"
															value={lastname}
															onChange ={event => setLName(event.target.value)}
														/>
													</Grid>
												</Grid>
												
												<TextField
													margin="normal"
													required
													fullWidth
													label="Address"
													name="address"
													value={address}
													onChange={event => setAddress(event.target.value)}
												/>

												<MuiPickersUtilsProvider utils={DateFnsUtils}>
													<KeyboardDatePicker
														disableToolbar
														variant="inline"
														format="yyyy-MM-dd"
														label="DOB"
														value={dob}
														fullWidth
														onChange={event => {setDOB(event)}}
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
										: null}

										{/* Delete button */}
										<Button variant="outlined" size="small" disableElevation onClick={() => handleDeleteRequest(item)}>
											<DeleteSweepIcon />
											Delete
										</Button>

										{/* Confirm delete */}
										<Dialog
											open={dialogue_open}
											onClose={() => setOpen(false)}
											aria-labelledby="alert-dialog-title"
											aria-describedby="alert-dialog-description"
										>
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
							))}
						</TableBody>

						<TableFooter>
							<TableRow>
								<TablePagination
									rowsPerPage={rowsPerPage}
									count={data.length}
									page={page}
									onChangePage={(event, newPage) => setPage(newPage)}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				</TableContainer>

				{/* </Grid> */}
			</Grid>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		width: "max-content",
		minWidth: "100vw",
	},
	table: {
		minWidth: 650,
	},
	row: {
		width: "max-content",
		textTransform: "capitalize",
		"&:hover": {
			backgroundColor: colors.highlight,
		},
	},
	limit_cell: {
		maxWidth: 400,
	},
	button: {
		textTransform: "capitalize",
	},
	closeButton: {
		cursor: "pointer",
	},
	raw_data: {
		textTransform: "none",
	},
	searchInput: {
		margin: 20,
	},
	update_form: {
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
	}
}));
