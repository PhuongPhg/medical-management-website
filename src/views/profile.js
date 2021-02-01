import React, {useState, useEffect} from "react";
import Navigation from "../navigation";
import Grid from '@material-ui/core/Grid';
import { colors } from '../helpers/config';
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default function Profile () {
  const styles = useStyles();

  return (
		<div className={styles.container}>
			<Navigation homepage />
			<Grid component="main" spacing={4} className={styles.root}>
				<Grid xs={3} className={styles.userinfo}>
					<h1 styles={{ backgroundColor: "#000000" }}>ksjflkjasklfjdklj</h1>
				</Grid>

				<Grid xs={9} direction="row" className={styles.records}>
					<Grid justify="left" container>
						<Typography variant="p" align="left" className={styles.sectionHeader}>
							Appointments
						</Typography>
					</Grid>
					<Grid container>
						<Card className={styles.card}>
							<CardContent>
								<Grid container justify="space-between" alignItems="center">
									<Grid item style={{display: "flex"}} direction="row">
                    <Grid item className={styles.date}>
                      <Typography>6</Typography>
                      <Typography>March</Typography>
                    </Grid>
                    <Grid item>
  										<Typography align="left">Lung Examination</Typography>
	  									<Typography align="left" className={styles.status}>08:00 - 10:00 AM</Typography>
                    </Grid>
                  </Grid>
									<Grid item direction="row">
										<Typography component="span" className={styles.status}>Finished and reschedule in 07/04</Typography>
                    <NavigateNextIcon viewBox='0 0 24 24' style={{color: colors.additional_info, backgroundColor: 'red'}} />
									</Grid>
								</Grid>
							</CardContent>
						</Card>
					</Grid>
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
  row: {
    flexDirection: 'row',
  },
  userinfo: {
    height: '80vh',
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '20px',
    marginRight: '10px',
    backgroundColor: colors.secondary_background,
  },
  records: {
    height: '80vh',
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
    width: '100%'
  },
  sectionHeader: {
    fontWeight: 600,
    marginLeft: 10,
    marginBottom: 10,
  },
  date: {
    color: colors.date_color,
    marginRight: 20,
  },
  status: {
    color: colors.additional_info,
    marginTop: 0,
  }
}));