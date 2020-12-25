import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import { colors } from "../helpers/config";
import Navigation from "../navigation";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Icon, Input, InputAdornment, InputLabel, FormControl, Table, TableFooter, TableSortLabel, TablePagination, TextField, Typography, Grid } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from '@material-ui/icons/Edit';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import SearchIcon from '@material-ui/icons/Search';

const UserData = () => {
	const classes = useStyles();
	const [data, setData] = useState([]);
	const [page, setPage] = useState(0);
	const rowsPerPage = 7;
	const [sortDir, setSortDir] = useState("asc");
	const [dialogue_open, setOpen] = useState(false);

	const deleteUser = async(id) => {
		try{
			await axios.delete(`http://localhost:8080/api/admin/user/${id}`, {
				headers: {
					"Authorization": `Bearer ${sessionStorage.getItem("userToken")}`
				}
			});
			setData(data.filter(item => item.id !== id));
		}
		catch(error){
			alert(error);
		}
	}

	const getData = async () => {
		try{
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
			let res = await axios.get(`http://localhost:8080/api/admin/user?phone=${phone}`, {
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
							<TableCell align="left" className={classes.raw_data}>{item.username}</TableCell>
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
								<Button variant="outlined" size="small" disableElevation style={{ marginRight: 10 }}>
									<EditIcon />
									Edit
								</Button>

								{/* Delete button */}
								<Button
									variant="outlined"
									size="small"
									disableElevation
									onClick={() => {
										setOpen(true);
									}}
								>
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
												deleteUser(item.id);
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
							rowsPerPageOptions={7}
							rowsPerPage={rowsPerPage}
							count={data.length}
							page={page}
							onChangePage={(event, newPage) => setPage(newPage)}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	);
};

export default function Dashboard() {
	const classes = useStyles();
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
					inputProps={{

					}}
					className={classes.searchInput}
				/>

				<UserData />
				{/* </Grid> */}
			</Grid>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		width: "max-content",
		minWidth: "100vw"
	},
	table: {
		minWidth: 650,
	},
	row: {
		width: "max-content",
		textTransform: "capitalize",
		'&:hover': {
			backgroundColor: colors.highlight,
		},
	},
	limit_cell: {
		maxWidth: 400,
	},
	button: {
		textTransform: 'capitalize',
	},
	raw_data: {
		textTransform: 'none',
	},
	searchInput: {
		margin: 20,
	}
}));
