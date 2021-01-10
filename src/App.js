import React from 'react'
import './App.css';
import clsx from 'clsx';
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from 'react-redux'
import { getData } from './actions/bitcoinActions'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      marginTop: theme.spacing(5),
    },
  },
  content: {
    marginTop: theme.spacing(5),
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: "100%",
  },
}));


const App = () => {
  const classes = useStyles();

  const dispatch = useDispatch()
  const state = useSelector(state => state.bitcoin)

  const [num, setNum] = React.useState(15)

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const data = {
    labels: ['11.00', '12.00', '13.00'],
    datasets: [{
      label: "BTC",
      data: [4000,5000,3500],
      backgroundColor: 'rgba(238,175,0,0.4)',
      borderColor: 'rgba(238,175,0,0.5)',
      pointBorderColor: 'rgba(238,175,0,0.7)',
    }]
  }

  const fetchData = (time) => {

    dispatch(getData({
      time: time,
      number: num
    }))
  }


  return (
    <main className={classes.content}>
     <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
           <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <Line
                data={state.data}
                />
              </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={12} className={classes.root}>
            <Button variant="contained" onClick={() => fetchData("1min")}>1 Min</Button>
            <Button variant="contained" onClick={() => fetchData("5min")}>5 Min</Button>
            <Button variant="contained" onClick={() => fetchData("15min")}>15 Min</Button>
          </Grid>
        </Grid>
      </Container>
    </main>
  )
}

export default App
