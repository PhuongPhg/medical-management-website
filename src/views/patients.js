import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import { colors } from "../helpers/config";
import Navigation from "../navigation";
import { Table, TableFooter, TableSortLabel, TablePagination, Grid } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { SearchBox } from "./SearchBox";
import PulseLoader from "react-spinners/PulseLoader";
import { useHistory } from "react-router-dom";

export default function Patients() {
	const classes = useStyles();
	const history = useHistory();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [page, setPage] = useState(0);
	const rowsPerPage = 20;
	const [sortDir, setSortDir] = useState("asc");

	const [display, setDisplay] = useState(null);

	const getData = async () => {
		try{
			let res = await axios.get('http://thaonp.work/api/doctor/patient', {
				headers: {
					"Authorization": `Bearer ${sessionStorage.getItem("userToken")}`
				}
			});
			console.log(res.data)
			setData(res.data);
			setDisplay(res.data);
			setLoading(false);
		} 
		catch(error){
			alert(error);
			// throw new Error("Error: ", error);
		}
	}

	useEffect(() => getData(), []);

	if (loading){
		return(
			<Grid container justify="center" alignItems="center" style={{height: "100vh"}}>
				<PulseLoader color={colors.primary_light} loading={loading} size={15} margin={7}/>
			</Grid>
		)
	}
	else return (
		<div className={classes.container}>
			<Navigation patients />
			<Grid container alignItems="center">
				<SearchBox data={data} setDisplay={setDisplay} />

				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="sticky table" size="small">
						<TableHead>
							<TableRow>
								<TableCell align="left" className={classes.tableCell}>
									ID
								</TableCell>
								<TableCell align="left" sortDirection={sortDir} onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")} className={classes.tableCell}>
									<TableSortLabel direction={sortDir}>Last name</TableSortLabel>
								</TableCell>
								<TableCell align="left" className={classes.tableCell}>
									<TableSortLabel>First name</TableSortLabel>
								</TableCell>
								<TableCell align="left" className={classes.tableCell}>
									Username
								</TableCell>
								<TableCell align="left" className={classes.tableCell}>
									Phone
								</TableCell>
								<TableCell align="left" className={classes.tableCell}>
									Email
								</TableCell>
								<TableCell align="left" className={classes.tableCell}>
									D.O.B
								</TableCell>
								<TableCell align="left" className={classes.tableCell}>
									Sex
								</TableCell>
								<TableCell align="left" className={classes.tableCell}>
									Address
								</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{display
								? display.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
										<TableRow
											className={classes.row}
											key={item.id}
											onClick={() =>
												history.push({
													pathname: "/profile",
													state: { detail: item.id },
												})
											}
										>
											<TableCell align="left" className={classes.tableCell}>
												{item.id}
											</TableCell>
											<TableCell align="left" className={classes.tableCell}>
												{item.lastname}
											</TableCell>
											<TableCell align="left" className={classes.tableCell}>
												{item.firstname}
											</TableCell>
											<TableCell align="left" className={[classes.raw_data, classes.tableCell]} width={100}>
												{item.username}
											</TableCell>
											<TableCell align="left" className={classes.tableCell}>
												{item.phone}
											</TableCell>
											<TableCell align="left" className={[classes.raw_data, classes.tableCell]} width={180}>
												{item.email}
											</TableCell>
											<TableCell align="left" className={classes.tableCell}>
												{new Date(item.dob).toLocaleDateString()}
											</TableCell>
											<TableCell align="left" className={classes.tableCell}>
												{item.sex}
											</TableCell>
											<TableCell align="left" className={classes.tableCell}>
												{item.address}
											</TableCell>
										</TableRow>
								  ))
								: null}
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
		width: "100vw",
	},
	table: {
		width: "100vw",
	},
	row: {
		textTransform: "capitalize",
		cursor: "pointer",
		"&:hover": {
			backgroundColor: colors.highlight,
		}
	},
	tableCell: {
		fontSize: 16,
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
