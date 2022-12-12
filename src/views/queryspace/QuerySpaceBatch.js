import React, {useState} from 'react'
import CreatableSelect from 'react-select/creatable';
import { CInputGroup, CInputGroupText, CFormSelect, CButton } from '@coreui/react'
// const axios = require('axios').default;
import axiosConnect from './../../api/axiosConnect';

const userAccount = 'Z44168';
const UNDER_LINE = '___________';
const selectOptions = [
  { value: 'VIJAY', label: 'VIJAY' },
]
// 'Z44168.TEST.CLIST(VIJAY)'

function QuerySpaceBatch() {
    // const [commandFirst, setCommandFirst] = useState(userAccount);
    const [commandMiddle, setCommandMiddle] = useState(UNDER_LINE);
    const [commandLast, setCommandLast] = useState(UNDER_LINE);
    const [commandFile, setCommandFile] = useState(UNDER_LINE);
    const [commandOutput, setCommandOutput] = useState('');

    const handleonSubmit = (e) => {
        e.preventDefault();
        if (commandMiddle === UNDER_LINE || commandLast === UNDER_LINE || commandFile === null) {
            alert('Please enter all the fields');
            return;
        }
        let fullCommand = userAccount + '.' + commandMiddle + '.' + commandLast+ '(' + commandFile + ')';
        // axios.post('http://localhost:3000/mf/submitjob', {"jobname": fullCommand})
        axiosConnect.post('/submitjob', {"jobname": fullCommand})
          .then( response => {
            //handle success
            console.log(response);
            let jobid = response.data.jobId;
            let jobname = response.data.jobName;
            let jobstatus = response.data.jobStatus;
            setCommandOutput(`Job submitted successfully. Jobid: ${jobid}, Jobname: ${jobname}, Status: ${jobstatus}`);
          })
          .catch( err => {
            //handle error
            console.log(err);
              setCommandOutput("Error in submitting job: " + fullCommand);
          });
    }

    const handleSelectMiddle = (e) => {
        setCommandMiddle(e.target.value)
    }
    const handleSelectLast = (e) => {
        setCommandLast(e.target.value)
    }
    const handleFilename = (newValue, actionMeta) => {
        // console.log(newValue);
        // console.log(`action: ${actionMeta.action}`);
        if (newValue !== null && newValue !== undefined && newValue !== '') {
            setCommandFile(newValue.label || newValue.value);
        } else {
            setCommandFile('');
        }
    };

    let outputWindowStyle = {
        height: '100%',
        width: '100%',
        border: '1px solid red',
        overflow: 'scroll',
        padding: '0px',
        margin: '0px',
        color: 'green',
        backgroundColor: 'black',
    };
    let outputWindow;
    if (commandOutput === '') {
        outputWindow = <div style={outputWindowStyle}>Awaiting job submission, job response will appear here</div>;
    } else {
        outputWindow = <div style={outputWindowStyle}>{commandOutput}</div>;
    }
    

    return (
        <>
            <CInputGroup className="mb-3">
                <CInputGroupText >{ userAccount }</CInputGroupText>
                <CFormSelect id="inputGroupSelect01" onChange={handleSelectMiddle}>
                    <option>{UNDER_LINE}</option>
                    <option value="TEST">TEST</option>
                    <option value="DEV">DEV</option>
                    <option value="PROD">PROD</option>
                </CFormSelect>
                <CFormSelect id="inputGroupSelect02" onChange={handleSelectLast}>
                    <option>{UNDER_LINE}</option>
                    <option value="CLIST">CLIST</option>
                    <option value="CLIST1">CLIST1</option>
                    <option value="CLIST2">CLIST2</option>
                </CFormSelect>
                {/* <CInputGroupText component="label" htmlFor="inputGroupSelect02">Options</CInputGroupText> */}
                <CreatableSelect 
                    onChange={handleFilename}
                    // onInputChange={handleInputChange}
                    options={selectOptions}
                    isClearable={true}
                    isSearchable={true} 
                />
                <CButton type="button" color="primary" variant="outline" onClick={handleonSubmit}>Submit JOB</CButton>
            </CInputGroup>
            {`${userAccount}.${commandMiddle}.${commandLast}(${commandFile})`}
            <hr />
            <pre>
                {outputWindow}
            </pre>

        </>
  )
}

export default QuerySpaceBatch
