import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export const SearchBox = (props) => {
	const classes = useStyles();
   const [query, setQuery] = useState(null);
	const data = props.data;
	const setDisplay = props.setDisplay;

	const search = () => {
		if (query){
			setDisplay(data.filter(item => 
				item.firstname.includes(query) ||
				item.phone.includes(query) ||
				item.username.includes(query) ||
				item.email.includes(query)
			));
		}
		else{
			setDisplay(data);
		}
	};

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
		onKeyUp={() => search()}
		className={classes.searchBox} />
   )
}

const useStyles = makeStyles((theme) => ({
	searchBox: {
		margin: 20,
	},
	searchInput: {
		fontSize: 16,
	},
}));