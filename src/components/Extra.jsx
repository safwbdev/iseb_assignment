import React from 'react'
import { Paper } from "@material-ui/core";


export const getHighestPaid=(tag) =>{
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
  export const getLatestJoined=(tag) =>{
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



export const Extra = ({paidData, joinedData}) => {
    return (
        <Paper className="paper-box extras">
            <div>
                <p>Highest Earning Employee: <span>{paidData}</span></p>
                <p>Employee Most Recently Joined: <span>{joinedData}</span></p>
            </div>
        </Paper>
    )
}

export default (Extra)
