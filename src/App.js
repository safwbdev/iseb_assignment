import data from "./data/data.json";
import "./App.scss";
import Moment from "react-moment";
import {
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { Component } from "react";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "MYR",
});

function getHighestPaid(tag) {
  let highestPay = tag[0].salary;
  let employee = null;
  tag.map((a) => {
    if (a.salary > highestPay) {
      highestPay = a.salary;
      employee = a.firstname + " " + a.lastname;
    }
    return null;
  });
  return employee;
}
function getLatestJoined(tag) {
  let recent = new Date(tag[0].dateJoined);
  let employee = null;
  tag.map((a) => {
    if (new Date(a.dateJoined) >= recent) {
      recent = new Date(a.dateJoined);
      employee = a.firstname + " " + a.lastname;
    }
    return null;
  });
  return employee;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      collection: null,
      total: 0,
      highestPaid: null,
      recentlyJoined: null,
      dateDesc: true,
      nameDesc: false,
      salaryDesc: false,
    };
  }

  componentDidMount() {
    this.setState({
      collection: data.sort(
        (a, b) => new Date(b.dateJoined) - new Date(a.dateJoined)
      ),
      total: data.length,
      highestPaid: getHighestPaid(data),
      recentlyJoined: getLatestJoined(data),
    });
  }
  render() {
    let {
      collection,
      total,
      highestPaid,
      recentlyJoined,
      dateDesc,
      nameDesc,
      salaryDesc,
    } = this.state;
    const sortName = () => {
      this.setState({
        collection: data.sort((a, b) => b.firstname.localeCompare(a.firstname)),
        dateDesc: false,
        nameDesc: true,
        salaryDesc: false,
      });
    };
    const sortDate = () => {
      this.setState({
        collection: data.sort(
          (a, b) => new Date(b.dateJoined) - new Date(a.dateJoined)
        ),
        dateDesc: true,
        nameDesc: false,
        salaryDesc: false,
      });
    };
    const sortSalary = () => {
      this.setState({
        collection: data.sort((a, b) => b.salary - a.salary),
        dateDesc: false,
        nameDesc: false,
        salaryDesc: true,
      });
    };
    return (
      <div className="App">
        <Container>
          <Grid container spacing={3} className="detail-section">
            <Grid item xs={12} md={4} className="">
              <Paper className="paper-box total">
                <PersonIcon />
                <p>{total}</p>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} className="">
              <Paper className="paper-box extras">
                <div>
                  <p>
                    Highest Earning Employee: <span>{highestPaid}</span>
                  </p>
                  <p>
                    Employee Most Recently Joined: <span>{recentlyJoined}</span>
                  </p>
                </div>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TableContainer component={Paper} className="employee-table">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell onClick={() => sortName()}>
                        <span>
                          Full Name
                          {nameDesc ? <ArrowDropUpIcon /> : null}
                        </span>
                      </TableCell>
                      <TableCell align="center" onClick={() => sortDate()}>
                        <span>
                          Date Joined {dateDesc ? <ArrowDropUpIcon /> : null}
                        </span>
                      </TableCell>
                      <TableCell align="right" onClick={() => sortSalary()}>
                        <span>
                          Salary {salaryDesc ? <ArrowDropUpIcon /> : null}
                        </span>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {collection &&
                      collection.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {row.firstname + " " + row.lastname}
                          </TableCell>
                          <TableCell align="center">
                            <Moment format="YYYY-MM-DD">
                              {row.dateJoined}
                            </Moment>
                          </TableCell>
                          <TableCell align="right">
                            {formatter.format(row.salary)}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
