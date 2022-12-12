import React, {useState, useEffect} from 'react'
import {
    CInputGroup, CInputGroupText, CFormInput, CRow,
  } from '@coreui/react'

import AppCard from './../../components/AppCard'
import axiosConnect from './../../api/axiosConnect';
 

function AutomationSpace() {

    const [allCardData, setAllCardData] = useState([]);

    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    const loadAutomationData = async () => {
        // const res = await fetch("http://localhost:3000/mf/getautospacecards");
        // const resData = await res.json();
        const res = await axiosConnect.get("/getautospacecards");
        if (res.status === 201) {
            const resData = res.data;
            console.log("Data received from getautospacecards");
            console.log(resData);
            if (Array.isArray(resData) && resData.length > 0) {
               setAllCardData(resData);
            } else {
                setAllCardData([]);
            }
        }
    }; 

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchValue !== '') {
            const filteredCards = allCardData.filter((card) => {
                // return Object.values(card).join('').toLowerCase().includes(searchInput.toLowerCase())
                return (card['title'].toLowerCase().includes(searchInput.toLowerCase()))
            });
            setFilteredResults(filteredCards)
        } else {
            setFilteredResults(allCardData)
        }
    };

    useEffect(() => {
        loadAutomationData();
        return () => [];
    }, []);


    return (
        <div>
            <CInputGroup className="mb-3">
                <CFormInput 
                    placeholder="Search for Automation Service"
                    aria-label="Automation Service Name"
                    aria-describedby="autom-search"
                    onChange={(e) => searchItems(e.target.value)}
                />
                <CInputGroupText id="autom-search">Search</CInputGroupText>
            </CInputGroup>
            <CRow>
                {/* <CCol xs={12} sm={6} lg={3}>   // CCol is declared in AppCard */}
                    {searchInput.length > 1 ? (
                        filteredResults.map((card) => {
                            return <AppCard key={card.id} {...card} />
                        })) : (
                        allCardData.map((card) => {
                            return <AppCard key={card.id} {...card} />
                        })  
                    )}
                {/* </CCol> */}
            </CRow>
        </div>
    )
}

export default AutomationSpace
