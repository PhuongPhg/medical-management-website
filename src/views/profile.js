import React, {useState, useEffect} from "react";
import Navigation from "../navigation";
import Grid from '@material-ui/core/Grid';
import {colors } from '../helpers/config';
import { makeStyles } from "@material-ui/core";

export default function Profile () {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Navigation homepage />
      <Grid component="main" spacing={4} className={styles.root}>
        <Grid xs={3} className={styles.userinfo}>
          <h1 styles={{backgroundColor: '#000000'}}>ksjflkjasklfjdklj</h1>
        </Grid>
        <Grid xs={9} className={styles.records}>
          samma lamma duma lamma
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex'
  },
  userinfo: {
    height: '80vh',
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '20px',
    marginRight: '10px',
    backgroundColor: colors.highlight,
  },
  records: {
    height: '80vh',
    backgroundColor: colors.highlight,
    marginTop: '20px',
    marginBottom: '20px',
    marginRight: '20px',
    marginLeft: '10px'
  }
}));