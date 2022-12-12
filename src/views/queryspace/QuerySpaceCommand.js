import React, {useState} from 'react'
// import { ActionMeta, OnChangeValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';

// const axios = require('axios').default;
import axiosConnect from './../../api/axiosConnect';

const selectOptions = [
  { value: 'D IPLINFO', label: 'Display IPL Info' },
  // { value: 'D T', label: 'Display Time' },
  { value: 'D XCF', label: 'LPARs info' }
]

const QuerySpaceCommand = () => {

  const [commandOutput, setCommandOutput] = useState('Awaiting command, your output will appear here');

  // const handleInputChange = (inputValue, actionMeta) => {
  //   console.group('Input Changed');
  //   console.log(inputValue);
  //   console.log(`action: ${actionMeta.action}`);
  //   console.groupEnd();
  // };

  const handleChange = (newValue, actionMeta) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();

    if (newValue !== null) {
      setCommandOutput(`Processing the command: ${newValue.label || newValue.value}`);
      // axios.post('http://localhost:3000/mf/commandZOS', {"command": newValue.value})
      axiosConnect.post('/commandZOS', {"command": newValue.value})
        .then( response => {
          //handle success
          console.log(response);
          setCommandOutput(response.data)
        })
        .catch( err => {
          //handle error
          console.log(err);
          setCommandOutput(JSON.stringify(err))
        });
    } else {
      setCommandOutput('Awaiting command, your output will appear here');
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
    outputWindow = <div style={outputWindowStyle}>Awaiting command, your output will appear here</div>;
  } else {
    outputWindow = <div style={outputWindowStyle}>{commandOutput}</div>;
  }


  return (<>
    <CreatableSelect 
            onChange={handleChange}
            // onInputChange={handleInputChange}
            options={selectOptions}
            isClearable={true}
            isSearchable={true} 
    />
    <hr/>
    <pre>
      {outputWindow}
    </pre>
    </>)
}

export default QuerySpaceCommand