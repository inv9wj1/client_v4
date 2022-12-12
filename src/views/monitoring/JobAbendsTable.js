import React from 'react';
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import "@szhsin/react-menu/dist/index.css";
// "jobabends": [
//   {
//       "jobid": "JOB0508",
//       "jobname": "QUEBEC9",
//       "jobstatus": "ERROR",
//       "jobstarttime": "2022-04-01T12:10:00.000Z",
//       "jobendtime": "2022-04-01T12:15:00.000Z"
//   },
//   {
//       "jobid": "JOB1947",
//       "jobname": "JARVIS3",
//       "jobstatus": "ERROR",
//       "jobstarttime": "2022-04-01T05:35:00.000Z",
//       "jobendtime": "2022-04-01T05:43:00.000Z"
//   }
// ]
function JobAbendsTable({jobabends}) {

  const dateFormat = (value) =>
    new Intl.DateTimeFormat('en-IN', {
      // year: "2-digit",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"      
  }).format(value);

  let tableRows;
  if (jobabends && jobabends.length > 0) {
    tableRows = jobabends.map((jobabend, index) => {
      return (
        <CTableRow key={index}>
          <CTableDataCell>{jobabend.jobid}</CTableDataCell>
          <CTableDataCell>{jobabend.jobname}</CTableDataCell>
          <CTableDataCell>{jobabend.jobstatus}</CTableDataCell>
          <CTableDataCell>{dateFormat(new Date(jobabend.jobstarttime))}</CTableDataCell>
          <CTableDataCell>{dateFormat(new Date(jobabend.jobendtime))}</CTableDataCell>
          <CTableDataCell>
            <Menu menuButton={<MenuButton>...</MenuButton>}>
            <MenuItem>Restart</MenuItem>
            <MenuItem>Force Complete</MenuItem>
              <SubMenu label="Restart from step">
                <MenuItem>Step 1</MenuItem>
                <MenuItem>Step 2</MenuItem>
                <MenuItem>Step 3</MenuItem>
              </SubMenu>
            <MenuItem onClick={() => console.log("Print clicked")}>Statistics</MenuItem>
            </Menu>
          </CTableDataCell>
        </CTableRow>
      )
    })
  }

  return (<>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color='light'>
            <CTableRow>
                <CTableHeaderCell>JOB ID</CTableHeaderCell>
                <CTableHeaderCell>JOB Name</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Start Time</CTableHeaderCell>
                <CTableHeaderCell>End Time</CTableHeaderCell>
                <CTableHeaderCell>Options</CTableHeaderCell>
            </CTableRow>
        </CTableHead>
        <CTableBody>
            {(jobabends && jobabends.length > 0) ? tableRows :
             (<CTableRow><CTableDataCell colSpan={6}>No Job Abends</CTableDataCell></CTableRow>)}
        </CTableBody>
      </CTable>
  </>);
}

export default JobAbendsTable;
