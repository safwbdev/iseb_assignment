import {useState, useEffect } from "react";
import Row from './Row'
import {
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

const TableData =({tableData})=>{
  const [collectionData, setCollection] = useState(null);
  const [dateDesc, setDatedesc] = useState(true)
  const [nameDesc, setNamedesc] = useState(false)
  const [salaryDesc, setSalarydesc] = useState(false)
  const [active, setActive] = useState("date")
    const headerData= [
        { name: "name", title: "Full Name", align: "left" },
        { name: "date", title: "Date Joined", align: "center" },
        { name: "salary", title: "Salary", align: "right" },
      ];

    

    useEffect(() => {
      setCollection(tableData.sort((a, b) => new Date(b.dateJoined) - new Date(a.dateJoined)))
      }, [tableData])

      const sortArrow = (tag) => {
        switch (tag) {
          case "name":
            return nameDesc ? <ArrowDropUpIcon /> : <ArrowDropDown />;
          case "date":
            return dateDesc ? <ArrowDropUpIcon /> : <ArrowDropDown />;
          case "salary":
            return salaryDesc ? <ArrowDropUpIcon /> : <ArrowDropDown />;
          default:
            return null;
        }
      };
      const sortColumn = (tag) => {
        let collection = null;
        switch (tag) {
          case "name":
            if (nameDesc) {
              collection = tableData.sort((a, b) =>
                a.firstname.localeCompare(b.firstname)
              );
            }
            if (!nameDesc) {
              collection = tableData.sort((a, b) =>
                b.firstname.localeCompare(a.firstname)
              );
            }
            setCollection(collection)
            setDatedesc(false);
            setNamedesc(!nameDesc)
            setSalarydesc(false)
            setActive("name");
            break;
          case "date":
            if (dateDesc) {
              collection = tableData.sort(
                (a, b) => new Date(b.dateJoined) - new Date(a.dateJoined)
              );
            }
            if (!dateDesc) {
              collection = tableData.sort(
                (a, b) => new Date(a.dateJoined) - new Date(b.dateJoined)
              );
            }
            setCollection(collection)
            setDatedesc(!dateDesc);
            setNamedesc(false)
            setSalarydesc(false)
            setActive("date");
            break;
          case "salary":
            if (salaryDesc) {
              collection = tableData.sort((a, b) => b.salary - a.salary);
            }
            if (!salaryDesc) {
              collection = tableData.sort((a, b) => a.salary - b.salary);
            }

            setCollection(collection)
            setDatedesc(false);
            setNamedesc(false)
            setSalarydesc(!salaryDesc)
            setActive("salary");
            break;
          default:
            return null;
        }
      };

    return (<Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer component={Paper} className="employee-table">
            <Table>
              <TableHead>
                <TableRow>
                  {headerData &&
                    headerData.map(({ name, title, align }, index) => (
                      <TableCell
                        key={index}
                        align={align}
                        onClick={() => sortColumn(name)}
                      >
                        <span 
                        className={active === name ? "active" : null}
                        >
                          {title} 
                          {sortArrow(name)}
                        </span>
                      </TableCell>
                    ))} 
                </TableRow>
              </TableHead>
              <TableBody>
                {collectionData &&
                  collectionData.map((row, index) => (
                    <Row key={index} fName={row.firstname} lName={row.lastname} date={row.dateJoined} salary={row.salary}/>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>)
}
export default TableData




