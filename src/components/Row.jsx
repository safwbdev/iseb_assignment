
import {
    TableCell,
    TableRow, 
  } from "@material-ui/core";
  import Moment from "react-moment";

  
  const Row =({fName, lName, date, salary})=>{
      const fullName = fName + " "+ lName;
        const formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "MYR",
        });
      return (<TableRow>
        <TableCell component="th" scope="row">
          {fullName}
        </TableCell>
        <TableCell align="center">
          <Moment format="YYYY-MM-DD">
            {date}
          </Moment>
        </TableCell>
        <TableCell align="right">
          {formatter.format(salary)}
        </TableCell>
      </TableRow>)
}
export default Row