import { Component } from "react";
import data from "./data/data.json";
import "./styles/App.scss";
import Total from "./components/Total";
import { Extra, getHighestPaid, getLatestJoined } from "./components/Extra";
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
      active: "date",
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
      nameDesc,
      salaryDesc,
      active,
      headers,
    } = this.state;

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "MYR",
    });

    const sortColumn = (tag) => {
      let collection = null;
      switch (tag) {
        case "name":
          if (nameDesc) {
            collection = data.sort((a, b) =>
              a.firstname.localeCompare(b.firstname)
            );
          }
          if (!nameDesc) {
            collection = data.sort((a, b) =>
              b.firstname.localeCompare(a.firstname)
            );
          }
          this.setState({
            collection: collection,
            dateDesc: false,
            nameDesc: !nameDesc,
            salaryDesc: false,
            active: "name",
          });
          break;
        case "date":
          if (dateDesc) {
            collection = data.sort(
              (a, b) => new Date(b.dateJoined) - new Date(a.dateJoined)
            );
          }
          if (!dateDesc) {
            collection = data.sort(
              (a, b) => new Date(a.dateJoined) - new Date(b.dateJoined)
            );
          }
          this.setState({
            collection: collection,
            dateDesc: !dateDesc,
            nameDesc: false,
            salaryDesc: false,
            active: "date",
          });
          break;
        case "salary":
          if (salaryDesc) {
            collection = data.sort((a, b) => b.salary - a.salary);
          }
          if (!salaryDesc) {
            collection = data.sort((a, b) => a.salary - b.salary);
          }
          this.setState({
            collection: collection,
            dateDesc: false,
            nameDesc: false,
            salaryDesc: !salaryDesc,
            active: "salary",
          });
          break;
        default:
          return null;
      }
    };

    const sortArrow = (tag) => {
      switch (tag) {
        case "name":
          return nameDesc ? <ArrowDropUpIcon /> : <ArrowDropDown />;
        // break;
        case "date":
          return dateDesc ? <ArrowDropUpIcon /> : <ArrowDropDown />;
        // break;
        case "salary":
          return salaryDesc ? <ArrowDropUpIcon /> : <ArrowDropDown />;
        // break;
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
                            <span className={active === name ? "active" : null}>
                              {title} {sortArrow(name)}
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
