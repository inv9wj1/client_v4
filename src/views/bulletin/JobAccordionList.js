import React from 'react';
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { setJobParams } from '../../redux/actions/jobOutputActions'
import { CAccordion, CAccordionItem, CAccordionHeader, CAccordionBody } from '@coreui/react'
import { CListGroup, CListGroupItem } from '@coreui/react'

// [
//   {
//       "owner": "Z44168",
//       "phase": 20,
//       "subsystem": "JES2",
//       "phase-name": "Job is on the hard copy queue",
//       "job-correlator": "J0007558SVSCJES2DAFCA022.......:",
//       "type": "JOB",
//       "url": "https://192.86.32.67:10443/zosmf/restjobs/jobs/J0007558SVSCJES2DAFCA022.......%3A",
//       "jobid": "JOB07558",
//       "class": "A",
//       "files-url": "https://192.86.32.67:10443/zosmf/restjobs/jobs/J0007558SVSCJES2DAFCA022.......%3A/files",
//       "jobname": "Z44168SD",
//       "status": "OUTPUT",
//       "retcode": "JCL ERROR"
//   }
// ]


function JobAccordionList({jobData}) {

  const dispatch = useDispatch()

  let jobList;
  if(Array.isArray(jobData) && jobData.length > 0) {
    jobList = jobData.map((job) => {
      let {jobid, jobname, status, retcode } = job; // url, files-url
      let jobParams = {jobid, jobname};
      console.log('jobParams', jobParams)
      return (
        <CAccordionItem itemKey={jobid} key={jobid}>
          <CAccordionHeader>
            <div className="d-flex w-100 justify-content-between">
              <h4 className="mb-1">{jobid}</h4>
              <small>{jobname}</small>
              <small>{status}</small>
              <small>{retcode}</small>
            </div>
          </CAccordionHeader>
          <CAccordionBody>
            <CListGroup flush>
              {/* <li> <a href={url} target={"_blank"} rel={"noopener noreferrer"}> Zowe portal JOB URL</a>  </li>
              <li> <a href={job["files-url"]} target={"_blank"} rel={"noopener noreferrer"}> Zowe portal Files URL</a>  </li> */}
              <CListGroupItem> <strong>Phase-Name:</strong> {job["phase-name"]}  </CListGroupItem>
              <CListGroupItem> <strong>Job-Correlator:</strong> {job["job-correlator"]} </CListGroupItem>
              <CListGroupItem> <strong>Job Submitted by:</strong> {job["jobsubmittedby"]} </CListGroupItem>
              <CListGroupItem> 
                {/* <NavLink to={{  pathname:'/joboutput',
                  // userProps: {jobid: jobid, jobname: jobname},
                  }} */}
                <NavLink to={{pathname : '/joboutput'}}
                  onClick = {() => {
                    // console.log('onclick - calling dispatch with: ', jobParams)
                    dispatch(setJobParams(jobParams))
                  }}
                  className={'btn btn-info btn-sm'}
                >
                  Show Output Files
                </NavLink>
              </CListGroupItem>
            </CListGroup>                
          </CAccordionBody>
      </CAccordionItem>
      )
    })
  }

  return (<>
    <CAccordion>
        {(Array.isArray(jobData) && jobData.length > 0) && jobList}
    </CAccordion>
  </>);
}

export default JobAccordionList;
