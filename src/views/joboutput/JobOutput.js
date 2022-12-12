import React, {useState, useEffect} from 'react' //useEffect
import { useSelector } from 'react-redux';
// import CreatableSelect from 'react-select/creatable';
import { CInputGroup, CFormSelect, CFormLabel,   CButton } from '@coreui/react' //CFormInput
// const axios = require('axios').default;
import axiosConnect from './../../api/axiosConnect';
const FileDownload = require('js-file-download');

function JobOutput() {
    // const [jobname, setJobname] = useState('');
    // const [jobid, setJobid] = useState('');
    const [fileNames, setFileNames] = useState([]);
    const [selectedFile, setSelectedFile] = useState('');
    const [fileContent, setFileContent] = useState('');

    // let getOutputFiles =  () => {
    //   console.log("Inside getOutputFiles  with ", jobname , jobid);
    //   if (jobname === '' || jobid === '') {
    //       alert('Please enter JobName and JobID');
    //       return;
    //   }
    //   axios.post('http://localhost:3000/mf/getoutputfilenames', {jobname, jobid})
    //   axiosConnect.post('/getoutputfilenames', {jobname, jobid})
    //       .then( response => {
    //           //handle success
    //           console.log('setFileNames being set with response');
    //           console.log(response);
    //           setFileNames(response.data);
    //       })
    //       .catch( err => {
    //           //handle error
    //           console.log(err);
    //           setFileNames([]);
    //       });
    // }

    // let location = useLocation();
    // console.log('Incoming params' + JSON.stringify(location.userProps))
    // let userProps = location.userProps;
    // let jobidIN = userProps.jobid;
    // let jobnameIN = userProps.jobname;
    // if (jobidIN && jobnameIN) {
    //     setJobid(jobidIN);
    //     setJobname(jobnameIN);
    //     getOutputFiles();
    // }
  
  
    // let location = useLocation();
    // console.log('Incoming params' + JSON.stringify(location.userProps))
    // let userProps = location.userProps;
    // let jobidIN = userProps.jobid;
    // let jobnameIN = userProps.jobname;

    const {jobid, jobname} = useSelector((state) => state.jobOutputReducer);

    let getOutputFilesFromServer =  () => {
      console.log('Incoming params' + jobid + "*" + jobname);
      if (jobname === '' || jobid === '') {
          alert('Missing details, Please re-select the JobName again...');
          return;
      }
      if (jobid && jobname) {
        // axios.post('http://localhost:3000/mf/getoutputfilenames', {jobname, jobid})
        axiosConnect.post('/getoutputfilenames', {jobname, jobid})
            .then( response => {
                //handle success
                console.log('setFileNames being set with response');
                console.log(response);
                setFileNames(response.data);
            })
            .catch( err => {
                //handle error
                console.log(err);
                setFileNames([]);
              });
      }
    }
    useEffect(() => {
      getOutputFilesFromServer();
    }, [jobid, jobname]);

    // let onPageLoad =  () => {
    //   console.log("Inside onPageLoad with ", jobnameIN, jobidIN);
    //   if (jobidIN && jobnameIN) {
    //     setJobid(jobidIN);
    //     setJobname(jobnameIN);
    //     getOutputFiles();
    //   }
    // }

    // useEffect(() => {
    //   onPageLoad();
    // }, []);

    // const handleJobname = (e) => {
    //     console.log("Jobname:" + e.target.value);
    //     setJobname(e.target.value)
    // }
    // const handleJobid = (e) => {
    //     console.log("Jobid:" + e.target.value);
    //     setJobid(e.target.value)
    // }
    // const handleonSubmit = (e) => {
    //     e.preventDefault();
    //     getOutputFiles();
    // }

    // let  str2bytes = (str) => {
    //     let bytes = new Uint8Array(str.length);
    //     for (let i=0; i<str.length; i++) {
    //         bytes[i] = str.charCodeAt(i);
    //     }
    //     return bytes;
    // }

    const handleFileSelection = (e) => {
          console.log("Selected File:" + e.target.value);
          setSelectedFile(e.target.value)
    }

    const handleonFileViewSubmit = (e) => {
      e.preventDefault();
      console.log("Inside handleonFileViewSubmit with selectedFile", e.target.value);
      if (selectedFile === '') {
          alert('Please Select a file');
          return;
      }
      let jobid = selectedFile.split(':')[0];
      let filename = selectedFile.split(':')[1];
      console.log("Inside handleonFileSubmit with jobid", jobid, "filename", filename);
      if (jobid === '' || filename === '') {
          alert('Please Re-Submit JobID & JobName and Select a file');
          return;
      }
      // axios.post('http://localhost:3000/mf/getsinglefile', {filename, jobid, mode: 'view'})
      axiosConnect.post('/getsinglefile', {filename, jobid, mode: 'view'})
        .then( response => {
          console.log(response);
          if (response.status === 200) {
              setFileContent(response.data);
          } else {
            setFileContent("Could not load selected file, please try again");
          }
        })
        .catch( err => {
          //handle error
          console.log(err);
            setFileContent("Error loading selected file, please try again");
        });
    }
    const handleonFileDownloadSubmit = (e) => {
      e.preventDefault();
      console.log("Inside handleonFile-DL-Submit with selectedFile", e.target.value);
      if (selectedFile === '') {
          alert('Please Select a file');
          return;
      }
      let jobid = selectedFile.split(':')[0];
      let filename = selectedFile.split(':')[1];
      console.log("Inside handleonFileSubmit with jobid", jobid, "filename", filename);
      if (jobid === '' || filename === '') {
          alert('Please Re-Submit JobID & JobName and Select a file');
          return;
      }
      // axios.post('http://localhost:3000/mf/getsinglefile', {filename, jobid, mode: 'download'})
      axiosConnect.post('/getsinglefile', {filename, jobid, mode: 'download'})
        .then( response => {
          console.log(response);
          if (response.status === 200) {
              FileDownload(response.data, filename);
              setFileContent("File downloaded successfully");
          } else {
            setFileContent("Could not load selected file, please try again");
          }
        })
        .catch( err => {
          //handle error
          console.log(err);
            setFileContent("Error loading selected file, please try again");
        });
    }

    // const handleonZipDownloadSubmit = (e) => {
    //     e.preventDefault();
    //     console.log("Inside handleonZipDownloadSubmit");
    //     console.log("Current JOBID:" + jobid);
    //     console.log("Current JOBNAME:" + jobname);

    //     if (jobid === '' || jobname === '') {
    //         alert('Please Re-Submit JobID & JobName and try downloading again');
    //         return;
    //     }
    //     let downloadFilename = jobid + ".zip";
    //     axios.post('http://localhost:3000/mf/getoutputzip', {jobname, jobid})
    //     axiosConnect.post('/getoutputzip', {jobname, jobid})
    //       .then( response => {
    //         console.log(response);
    //         if (response.status === 200) {
    //             // FileDownload(response.data, downloadFilename);

    //             const blob = new Blob([str2bytes(response.data)], {type: "application/zip"}); //octet-stream  application/zip
    //             const href = URL.createObjectURL(blob);
    //             const a = Object.assign(document.createElement("a"), {href, style: "display:none", download: downloadFilename});
    //             document.body.appendChild(a);
    //             a.click();
    //             URL.revokeObjectURL(href);
    //             a.remove();
    //             setFileContent("ZIP file downloaded successfully");
    //         } else {
    //           console.log("Error downloading file");
    //           setFileContent("Could not download ZIP file, please try again");
    //         }
    //       })
    //       .catch( err => {
    //         //handle error
    //         console.log(err);
    //           setFileContent("");
    //       });
    // }
    
    let FileListDisplay;
    if (fileNames.length > 0) {
        FileListDisplay = (
        <>
          <CInputGroup className="mb-3">
              <CFormLabel>Select File</CFormLabel>
              <CFormSelect value={selectedFile} onChange={handleFileSelection}>
                  {fileNames.map((fileName, index) => {
                      return <option key={index} value={fileName}>{fileName.split(':')[1]}</option>
                  })} 
              </CFormSelect>
              <CButton onClick={handleonFileViewSubmit} color="success" variant="outline">View File</CButton>
              <CButton onClick={handleonFileDownloadSubmit} color="info" variant="outline">Download File</CButton>
              {/* <CButton onClick={handleonZipDownloadSubmit} color="secondary" variant="outline">Download all Files</CButton> */}
          </CInputGroup>
        </>
        )
    } else {
        FileListDisplay = (<CInputGroup className="mb-3">
            <CFormLabel>Select File</CFormLabel>
            <CFormSelect value={selectedFile} onChange={handleFileSelection}>
                <option value="">No Files</option>
            </CFormSelect>
            {/* <CButton onClick={handleonFileSubmit}>Load File</CButton> */}
        </CInputGroup>)
    }

    return (
        <>
            {/* <CInputGroup className="mb-3">
                <CFormLabel htmlFor="jobname">Job Name</CFormLabel>
                <CFormInput type="text" id="jobname" aria-describedby="jobName" onChange={handleJobname} />
                <CFormLabel htmlFor="jobid">Job ID</CFormLabel>
                <CFormInput type="text" id="jobid" aria-describedby="jobid" onChange={handleJobid} />
                <CButton type="button" color="primary" variant="outline" onClick={handleonSubmit}>Submit JOB</CButton>
            </CInputGroup> */}
            {(fileNames.length > 0) ? (FileListDisplay  ) : <div>Loading your output files... </div>}
            <hr />
            <pre>{fileContent}</pre>
        </>
    )
}


export default JobOutput;
