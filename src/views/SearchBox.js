import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export const SearchBox = (props) => {
	const classes = useStyles();
   const setQuery = props.setQuery;

	return(
      <TextField
		variant="outlined"
		size="small"
		placeholder="Search by name, phone, username or email"
		InputProps={{
			startAdornment: (
				<InputAdornment position="start">
					<SearchIcon fontSize="small" />
				</InputAdornment>
			),
			classes: {
				input: classes.searchInput
			}
		}}
		onChange={(text) => setQuery(text.target.value)}
		className={classes.searchBox} />
   )
}

const useStyles = makeStyles((theme) => ({
	searchBox: {
		width: '30vw',
		margin: 20,
	},
	searchInput: {
		fontSize: 16,
	},
}));