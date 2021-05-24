import { Component } from "react";
import data from "./data/data.json";
import "./App.scss";
import Total from "./components/Total";
import Extra from "./components/Extra";
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
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import Moment from "react-moment";

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
      dateAsc: false,
      nameDesc: false,
      nameAsc: false,
      salaryDesc: false,
      salaryAsc: false,
      headers: [
        { name: "name", title: "Full Name", align: "left" },
        { name: "date", title: "Date Joined", align: "center" },
        { name: "salary", title: "Salary", align: "right" },
      ],
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
      dateAsc,
      nameDesc,
      nameAsc,
      salaryDesc,
      salaryAsc,
      headers,
    } = this.state;

    const sortColumn = (tag) => {
      let collection = null;
      switch (tag) {
        case "name":
          collection = data.sort((a, b) =>
            a.firstname.localeCompare(b.firstname)
          );
          console.log("NAME");
          this.setState({
            collection: collection,
            dateDesc: false,
            nameDesc: true,
            salaryDesc: false,
          });
          break;
        case "date":
          collection = data.sort(
            (a, b) => new Date(b.dateJoined) - new Date(a.dateJoined)
          );
          console.log("DATE");
          this.setState({
            collection: collection,
            dateDesc: true,
            nameDesc: false,
            salaryDesc: false,
          });
          break;
        case "salary":
          console.log("SALARY");
          collection = data.sort((a, b) => b.salary - a.salary);
          this.setState({
            collection: collection,
            dateDesc: false,
            nameDesc: false,
            salaryDesc: true,
          });
          break;
        default:
          return null;
      }
    };
    return (
      <div className="App">
        <Container>
          <Grid container spacing={3} className="detail-section">
            <Grid item xs={12} md={4}>
              <Total data={total} />
            </Grid>
            <Grid item xs={12} md={8}>
              <Extra paidData={highestPaid} joinedData={recentlyJoined} />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TableContainer component={Paper} className="employee-table">
                <Table>
                  <TableHead>
                    <TableRow>
                      {headers &&
                        headers.map(({ name, title, align }, index) => (
                          <TableCell
                            key={index}
                            align={align}
                            onClick={() => sortColumn(name)}
                          >
                            <span>
                              {title}{" "}
                              {name === "date" && dateDesc ? (
                                <ArrowDropUpIcon />
                              ) : null}
                              {name === "date" && dateAsc ? (
                                <ArrowDropDown />
                              ) : null}
                              {name === "name" && nameDesc ? (
                                <ArrowDropUpIcon />
                              ) : null}
                              {name === "name" && nameAsc ? (
                                <ArrowDropDown />
                              ) : null}
                              {name === "salary" && salaryDesc ? (
                                <ArrowDropUpIcon />
                              ) : null}
                              {name === "salary" && salaryAsc ? (
                                <ArrowDropDown />
                              ) : null}
                            </span>
                          </TableCell>
                        ))}
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
