import data from "./data/data.json";
import moment from "moment";
import {
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

let sortedData = data.sort(
  (a, b) => new Date(b.dateJoined) - new Date(a.dateJoined)
);

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "MYR",
});

function getHighestPaid() {
  let highestPay = data[0].salary;
  let employee = null;
  data.map((a) => {
    if (a.salary > highestPay) {
      highestPay = a.salary;
      employee = a.firstname + " " + a.lastname;
    }
    return null;
  });
  return employee;
}
function getLatestJoined() {
  let recent = new Date(data[0].dateJoined);
  let employee = null;
  data.map((a) => {
    if (new Date(a.dateJoined) >= recent) {
      recent = new Date(a.dateJoined);
      employee = a.firstname + " " + a.lastname;
    }
    return null;
  });
  return employee;
}

function App() {
  return (
    <div className="App">
      <Container>
        <h1>Employees</h1>
        <Grid container spacing={3}>
          <Grid item xs={7}>
            <PersonIcon />
            <p>{data.length}</p>
          </Grid>
          <Grid item xs={5}>
            <p>Highest Earning Employee: {getHighestPaid()}</p>
            <p>Employee Most Recently Joined: {getLatestJoined()}</p>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Full Name</TableCell>
                    <TableCell align="right">Date Joined</TableCell>
                    <TableCell align="right">Salary</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {row.firstname + " " + row.lastname}
                      </TableCell>
                      <TableCell align="right">
                        {moment(row.dateJoined).format("YYYY-MM-DD")}
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
        {/* {sortedData.map((a, index) => {
          return (
            <p key={index}>
              {a.firstname} | {moment(a.dateJoined).format("YYYY-MM-DD")} |{" "}
              {a.salary}
            </p>
          );
        })} */}
      </Container>
    </div>
  );
}

export default App;
