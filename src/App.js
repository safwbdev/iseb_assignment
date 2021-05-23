import data from "./data/data.json";
import "./App.css";
import moment from "moment";

let sortedData = data.sort(
  (a, b) => new Date(b.dateJoined) - new Date(a.dateJoined)
);

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
      <h1>Employees</h1>
      <p>Total Employees : {data.length}</p>
      <p>Highest Paid Employee: {getHighestPaid()}</p>
      <p>Latest Joined Employee: {getLatestJoined()}</p>
      {sortedData.map((a, index) => {
        return (
          <p key={index}>
            {a.firstname} | {moment(a.dateJoined).format("YYYY-MM-DD")} |{" "}
            {a.salary}
          </p>
        );
      })}
    </div>
  );
}

export default App;
