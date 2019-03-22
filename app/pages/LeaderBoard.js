import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

import { firestore } from 'firebase';
const db = firestore();
class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: true
    }
  }

  componentWillMount() {
    db.collection('answers').get().then(data => {
      data.docs.forEach(doc => {
        const user = doc.id;
        const { lastAnswerTimeStamp, nextQuestionId} = doc.data();
        this.state.results.push({ user, lastAnswerTimeStamp, nextQuestionId})
      });
      this.setState({loading: false});
    });
  }
  render() {
    const { classes } = this.props;
    const results = this.state.results;
    console.log(results); 
    results.sort((a,b) => {
      const keyA = a.nextQuestionId;
      const keyB = b.nextQuestionId;
      if (keyA > keyB) {
        return -1;
      }
      if (keyA < keyB) {
        return 1;
      }
      if (keyA === keyB) {
        const key2A = a.lastAnswerTimeStamp || 0;
        const key2B  = b.lastAnswerTimeStamp || 0;
        return key2A > key2B ? 1 : -1;
      }
    });
    console.log(results);
    return (
      <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell align="center">Rank</CustomTableCell>
            <CustomTableCell align="center">User</CustomTableCell>
            <CustomTableCell align="center">Score</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((row, index) => (
            <TableRow className={classes.row} key={index}>
              <CustomTableCell align="center">
                {index + 1}
              </CustomTableCell>
              <CustomTableCell align="center">{row.user}</CustomTableCell>
              <CustomTableCell align="center">{(row.nextQuestionId || 0) * 10}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    );
  }
}

export default withStyles(styles)(LeaderBoard);;
