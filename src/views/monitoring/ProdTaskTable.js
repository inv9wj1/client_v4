import React from 'react';
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import "@szhsin/react-menu/dist/index.css";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

// "prodjobs": [
//   {
//       "jobid": "JOB0104",
//       "jobname": "FUD0001",
//       "jobstatus": "AWAITING",
//       "jobtype": "PROD",
//       "jobpriority": "HIGH",
//       "jobstarttime": "2022-04-01T00:00:00.000Z",
//       "jobendtime": "2022-04-01T00:00:00.000Z",
//       "jobduration": "00:00:00",
//       "jobpercentage": "100.00",
//       "jobdescription": "FUDAPPLICATION"
//   },
//   {
//       "jobid": "JOB0204",
//       "jobname": "PEOPLE8",
//       "jobstatus": "LONGRUNNING",
//       "jobtype": "PROD",
//       "jobpriority": "HIGH",
//       "jobstarttime": "2022-04-01T00:00:00.000Z",
//       "jobendtime": "2022-04-01T00:00:00.000Z",
//       "jobduration": "00:00:00",
//       "jobpercentage": "100.00",
//       "jobdescription": "Peoplesoftapplication"
//   }
// ],

function ProdTaskTable({prodjobs}) {

  const dateFormat = (value) =>
    new Intl.DateTimeFormat('en-IN', {
      // year: "2-digit",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"      
  }).format(value);

  let tableRows;
  if (prodjobs && prodjobs.length > 0) {
    tableRows = prodjobs.map((prodjob, index) => {
      return (
        <CTableRow key={index}>
          <CTableDataCell>{prodjob.jobid}</CTableDataCell>
          <CTableDataCell>{prodjob.jobname}</CTableDataCell>
          <CTableDataCell>{prodjob.jobdescription}</CTableDataCell>
          <CTableDataCell>{prodjob.jobstatus}</CTableDataCell>
          <CTableDataCell>{prodjob.jobtype}</CTableDataCell>
          <CTableDataCell>{prodjob.jobpriority}</CTableDataCell>
          <CTableDataCell>{dateFormat(new Date(prodjob.jobstarttime))}</CTableDataCell>
          <CTableDataCell>{dateFormat(new Date(prodjob.jobendtime))}</CTableDataCell>
          <CTableDataCell>{prodjob.jobduration}</CTableDataCell>
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
          </CTableDataCell>        </CTableRow>
      )
    })
  }

  return (
    <>
        <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color='light'>
                <CTableRow>
                    <CTableHeaderCell>JOB ID</CTableHeaderCell>
                    <CTableHeaderCell>JOB Name</CTableHeaderCell>
                    <CTableHeaderCell>JOB Description</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Type</CTableHeaderCell>
                    <CTableHeaderCell>Priority</CTableHeaderCell>
                    <CTableHeaderCell>Start Time</CTableHeaderCell>
                    <CTableHeaderCell>End Time</CTableHeaderCell>
                    <CTableHeaderCell>Duration</CTableHeaderCell>
                    <CTableHeaderCell>Options</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                { (prodjobs && prodjobs.length > 0) ? tableRows :
                    (<CTableRow>  <CTableDataCell colSpan="10">No data available</CTableDataCell>  </CTableRow>)
                }
            </CTableBody>
        </CTable>
    </>
  );
}

export default ProdTaskTable;
