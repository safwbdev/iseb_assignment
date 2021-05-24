import React from 'react'
import { Paper } from "@material-ui/core";

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
