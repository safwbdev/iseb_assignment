import {useState, useEffect } from "react";
import data from "./data/data.json";
import "./styles/App.scss";
import Total from "./components/Total";
import { Extra, getHighestPaid, getLatestJoined } from "./components/Extra";
import TableData from './components/TableData'
import {
  Container,
  Grid,
} from "@material-ui/core";


const App=()=>{
  const [totalData, setTotal] = useState(0)
  const [highestpaidData, setHighestpaid] = useState(null)
  const [recentlyjoinedData, setRecentljoined] = useState(null)

useEffect(() => {
  setTotal(data.length)
  setHighestpaid(getHighestPaid(data))
  setRecentljoined(getLatestJoined(data))
}, [])

  return (
  <div className="App">
    <Container>
      <Grid container spacing={3} className="detail-section">
        <Grid item xs={12} md={4}>
          <Total data={totalData} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Extra paidData={highestpaidData} joinedData={recentlyjoinedData} />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableData tableData={data} />
        </Grid>
      </Grid>
    </Container>
  </div>
    )
}
export default App