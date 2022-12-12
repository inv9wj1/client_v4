import React, {useState, useEffect} from 'react'
import {CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CAlert,
    CCard, CCardImage, CCardBody, CCardTitle, CCardText, CCardFooter, CCol, CButton
} from '@coreui/react'

// const axios = require('axios').default;
import axiosConnect from './../api/axiosConnect';

const AppCard = ({ image, title, content, date, inputData, commandToExecuteInMF }) => {

    const [modalVisible, setModalVisible] = useState(false)
    const [jobSubmitAlertVisible, setJobSubmitAlertVisible] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [alertColor, setAlertColor] = useState("")
    const [inputValues, setInputValues] = useState({})
    const [inputFieldCount, setInputFieldCount] = useState(0)

    let getInputValueCount = () => {
        let count = 0;
        if (Array.isArray(inputData) && inputData.length > 0) {
            count = inputData.length;
        }
        setInputFieldCount(count);
    }

    useEffect(() => {
        getInputValueCount();
    }, [inputData])
    
    let updateMainframeCommand = (cmdString, inputVals) => {
        let outCmd = cmdString;
        Object.keys(inputVals).forEach(key => {
            outCmd = outCmd.replace(`${key}`, inputVals[key]);
        });
        return outCmd;
    }

    let handleonClick = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(inputValues));
        let userInputCount = 0;
        Object.values(inputValues).forEach(value => {
            if (value && value.length > 0) {
                userInputCount++;
            }
        });
        if (userInputCount < inputFieldCount) {
            alert("Please fill all the input fields");
            return;
        }

        setModalVisible(false)

        let updatedCommand = updateMainframeCommand(commandToExecuteInMF, inputValues);
        console.log({updatedCommand});
        let jobUserMsg = '';
        // axios.post('http://localhost:3000/mf/commandTSO', {"command": updatedCommand})
        axiosConnect.post('/commandTSO', {"command": updatedCommand})
          .then( response => {
            //handle success
            console.log(response);
            if (response.data.status === "success" || response.data.STATUS === "SUCCESS") {
                console.log(`auto submit success`);
                let jclName = response.data.jclname || response.data.JCLNAME || "UnknownJCL";
                console.log(`jclName: ${jclName}`);
                // let fullCommand = 'Z44168.TEST.CLIST(' + jclName + ')';
                let fullCommand = jclName;
                jobUserMsg = `JCL Creation status: ${response.data.status}, Submitting the JCL : ${jclName}`;
                console.log(`jobUserMsg: ${jobUserMsg}`);
                setAlertMessage(jobUserMsg);
                setAlertColor("success");
                setJobSubmitAlertVisible(true);
                axiosConnect.post('/submitjob', {"jobname": fullCommand})
                  .then( response => {
                    //handle success
                    console.log(`auto-jcl submit success`);
                    console.log(response);
                    let jobid = response.data.jobId;
                    let jobname = response.data.jobName;
                    let jobstatus = response.data.jobStatus;
                    (jobUserMsg) ? jobUserMsg += `, ` : jobUserMsg = '';
                    jobUserMsg = jobUserMsg + `Job submitted successfully. Jobid: ${jobid}, Jobname: ${jobname}, Status: ${jobstatus}`
                    setAlertMessage(jobUserMsg);
                    setAlertColor("success");
                    })
                  .catch( err => {
                    //handle error
                    console.log(err);
                    (jobUserMsg) ? jobUserMsg += `, ` : jobUserMsg = '';
                    jobUserMsg = jobUserMsg + "Error in submitting JCL: " + fullCommand
                    setAlertMessage(jobUserMsg);
                    setAlertColor("danger");
                  });                
            } else {
                console.log("Error in generating  JCL, please contact support team");
                (jobUserMsg) ? jobUserMsg += `, ` : jobUserMsg = '';
                jobUserMsg = jobUserMsg + "Error in generating  JCL, please contact support team";
                setAlertMessage(jobUserMsg);
                setAlertColor("danger");
            }
        })
        .catch( err => {
            //handle error
            console.log(err);
            setAlertMessage("Error in submitting automation job, please contact support team");
            setAlertColor("danger");
        });
        
        setJobSubmitAlertVisible(true);

    }

    let fieldArray = inputData.map(eachInput => {
                            return (
                                <div className='mb-3' key={eachInput.name}>
                                    <label htmlFor={eachInput.name} className="col-form-label">
                                        {eachInput.label}:
                                    </label>
                                    <input className='form-control' 
                                            type={eachInput.responsetype} 
                                            id={eachInput.name} 
                                            name={eachInput.name}
                                            value={inputValues[eachInput.name] || ''}
                                            // placeholder={eachInput.defaultvalue}
                                            required={eachInput.required}
                                            onChange={(e) => {
                                                setInputValues({
                                                    ...inputValues,
                                                    [e.target.name]: e.target.value.trim()
                                                })
                                            }}
                                    />
                                </div>
                            )
    })
    
    const alertWindow = (
        <CAlert color={alertColor} dismissible visible={jobSubmitAlertVisible} 
                onClose={() => {
                    setJobSubmitAlertVisible(false)
                    setAlertMessage("")
                    setAlertColor("")
                }}>
            {alertMessage}
        </CAlert>

        // <CAlert color="success" className="text-center" isOpen={jobSubmitAlertVisible} toggle={() => setJobSubmitAlertVisible(false)}>
        //     Job submitted successfully
        // </CAlert>
    )

    const modalWindow = (
        <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
            <CModalHeader onClose={() => setModalVisible(false)}>
                <CModalTitle>{title}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <form>
                    {fieldArray}
                    <CButton color='secondary' onClick={() => setModalVisible(false)}>Cancel</CButton>
                    <CButton color='info' onClick={handleonClick}>Avail Service</CButton>
                </form>
            </CModalBody>
            <CModalFooter>
                <div className='mb-3 text-muted'>
                    Command sent to Mainframe: <br />{commandToExecuteInMF}
                </div>
            </CModalFooter>
        </CModal>
    );


    const handleSubmitJob = () => {
        // setCommandLast(e.target.value)
        // const buttonPressed = e.relatedTarget;
        // const dataIn = buttonPressed.getAttribute('data-whatever');
        // console.log(dataIn)
        // const modalTitle = 
        // modal.show()
        setModalVisible(!modalVisible)
    }

    return (
        <>
            <div className="position-fixed top-10 end-30" style={{width:"400px", zIndex: "9999"}}>
                {alertWindow}
            </div>
            {modalWindow}
            <CCol xs="12" sm="6" md="4">
                <CCard>
                    <CCardImage orientation={"top"} src={image} /> 
                    <CCardBody>
                        <CCardTitle>{title}</CCardTitle>
                        <CCardText>
                            {content}
                        </CCardText>
                    </CCardBody>
                    <CCardFooter>
                        <small className="text-medium-emphasis mr-2">
                                {date}
                        </small>
                        <CButton className="ml-2 btn btn-info" variant='outline'
                            onClick={handleSubmitJob}                        
                        >
                            Avail Service
                        </CButton>
                    </CCardFooter>
                </CCard>
            </CCol >
        </>
    )
}

export default React.memo(AppCard)
