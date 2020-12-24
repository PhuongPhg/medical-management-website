import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import { colors } from "../helpers/config";
import Navigation from "../navigation";
import { Button, Icon, Input, InputAdornment, InputLabel, FormControl, Table, TableSortLabel, TextField, Typography, Grid } from "@material-ui/core";
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
	const [sortDir, setSortDir] = useState("asc");

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
			throw new Error("Error: ", error);
		}
	}

	useEffect(() => getData(), []);

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="sticky table" size="small">
				<TableHead>
					<TableRow>
						<TableCell align="left">ID</TableCell>
						<TableCell align="left" sortDirection={sortDir} onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}>
							<TableSortLabel direction={sortDir}>Last name</TableSortLabel>
						</TableCell>
						<TableCell align="left">
							<TableSortLabel>First name</TableSortLabel>
						</TableCell>
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
					{data.map((item) => (
						<TableRow className={classes.row}>
							<TableCell align="left">{item.id}</TableCell>
							<TableCell align="left">{item.firstname}</TableCell>
							<TableCell align="left">{item.lastname}</TableCell>
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
								<Button variant="outlined" size="small" disableElevation style={{ marginRight: 10 }}>
									<EditIcon />
									Edit
								</Button>
								<Button variant="outlined" size="small" disableElevation>
									<DeleteSweepIcon />
									Delete
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
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
