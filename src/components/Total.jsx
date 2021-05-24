import React from 'react'
import { Paper } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
export const Total = ({data}) => {
    return (
        <Paper className="paper-box total">
            <PersonIcon />
            <p>{data}</p>
        </Paper>
    )
}

export default (Total)
