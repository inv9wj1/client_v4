import React, {useState, useEffect} from 'react'
import useRightClickmenu from '../../hooks/useRightClickmenu';
import { useRef } from 'react';
import {
    ControlledMenu,
    MenuItem,
    useMenuState
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';


import {
  CCol,
  CRow,
  CCarousel, CCarouselItem, CImage, CCarouselCaption,
//   CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CListGroup, CListGroupItem,
} from '@coreui/react'

import axiosConnect from './../../api/axiosConnect';

import imgOutage from './../../assets/images/outage.jpg'
import imgMaintenance from './../../assets/images/maintenance.jpg'
import imgAllGreen from './../../assets/images/allgreen.jpg'
import imgAnnouncement from './../../assets/images/announcement.jpg'
// import JobListTable from './JobListTable'
import JobAccordionList from './JobAccordionList'

// const carouselImage = [carouselImage1, carouselImage2, carouselImage3];
const carouselImages = {
    'outage': imgOutage,
    'maintenance': imgMaintenance,
    'allgreen': imgAllGreen,
    'announcement': imgAnnouncement
};
const bulletinColors = ['success', 'danger', 'info', 'primary', 'warning'];

const Bulletin = () => {
//menu
const ref = useRef(null);
const [menuProps, toggleMenu] = useMenuState({ transition: true });

    const dummyBulletinData = [{
        "id": "1",
        "type": "bulletin",
        "title": "Awaiting data to be loaded from Mainframe",
        "content": "Data loading in progress...",
        "date": "2022-12-31"
    },{
        "id": "2",
        "type": "breakingnews",
        "title": "Awaiting data to be loaded from Mainframe",
        "content": "Data loading in progress...",
        "date": "2022-12-31"
    }];
    const [cardData, setCardData] = useState(dummyBulletinData);
    const [jobData, setJobData] = useState([]);

    const {x,y,showMenu} = useRightClickmenu();


    const loadBulletinData = async () => {
        // const res = await fetch("http://localhost:3000/mf/getbulletinD");
        const res = await axiosConnect.get("/getbulletin");
        console.log('getBulletin data from MF')
        console.log(res)
        if (res && res.status === 201) {
            let resData = res.data;
            if (resData && resData.success && resData.data) {
                setCardData(resData.data);
            } else {
                setCardData([]);
            } 
        } else {
            setCardData([]);
        }
        // const resData = await res.json();
        // if (resData.success) {
        //    setCardData(resData.data);
        // }
    }; 
    const loadJobsData = async () => {
        // const res = await fetch("http://localhost:3000/mf/getjoblist");
        const res = await axiosConnect.get("/getjoblist");
        // console.log(res);
        if (res && res.status === 200){
            let resData = res.data;
            if (Array.isArray(resData) &&  resData.length > 0) {
                setJobData(resData);
            } else {
                setJobData([]);
            }
        } else {
            setJobData([]);
        }
        // const resData = await res.json();
        // console.log(resData);
        // if (resData && resData.length > 0) {
        //     setJobData(resData);
        // } else {
        //     setJobData([]);
        // }
    }; 
    
    useEffect(() => {
        loadBulletinData();
        loadJobsData();
        return () => [];
    }, []);

    let cardsBreakingNews = cardData.filter((card) => {
        return card.type === 'breakingnews'
    });
    let cardsBulletin = cardData.filter((card) => {
        return card.type === 'bulletin'
    });

    let carouselCards = cardsBreakingNews.map((card) => {
        // console.log("C-card", card);
        let imgKey = card.subtype;
        let carouselImage = (imgKey) ? carouselImages[imgKey]  : imgAllGreen;
        // let randC = Math.floor(Math.random() * carouselImage.length);
        return (
            <CCarouselItem key={card.id} >
                <CImage className="d-block w-100" src={carouselImage} alt="slide show" style={{ width:'40vw', height:'60vh'}}/>
                <CCarouselCaption className="d-none d-md-block">
                    <h1>{card.title}</h1>
                    {/* <p style={{width: '600px', "word-wrap": 'break-word'}}>{card.content}</p> */}
                    <h3>{card.content}</h3>
                </CCarouselCaption>
            </CCarouselItem>
        )
    });

    let bulletinCards = cardsBulletin.map((card) => {
        // console.log("B-card", card);
        let randC = Math.floor(Math.random() * bulletinColors.length);
        return (
            <CListGroupItem component="a" href="#" key={card.id} color={bulletinColors[randC]}>
                <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-1" >
                        {/* <div style={{width: '150px', "word-wrap": 'break-word'}} > */}
                            {card.title}
                        {/* </div> */}
                    </h6>
                    <small>{card.date}</small>
                </div>
                <hr />
                <p className="mb-1 text-wrap">
                    {/* <div style={{width: '350px', "word-wrap": 'break-word'}} > */}
                        {card.content}
                    {/* </div> */}
                </p>
            </CListGroupItem>
        )
    });

  return (
      <CRow>
        <CCol sm={9}>
            <CRow>
                <CCarousel controls indicators>
                {carouselCards}
                </CCarousel>
            </CRow>
            <hr />
            <CRow xs={{ gutter: 2 }}>
                    <CCol xs={{ span: 3 }}>
                        <div className="p-3 border bg-dark text-white">JOB ID</div>
                    </CCol>
                    <CCol xs={{ span: 3 }}>
                        <div className="p-3 border bg-dark text-white">Job-Name</div>
                    </CCol>
                    <CCol xs={{ span: 3 }}>
                        <div className="p-3 border bg-dark text-white">Status</div>
                    </CCol>
                    <CCol xs={{ span: 3 }}>
                        <div className="p-3 border bg-dark text-white">Ret Code</div>
                    </CCol>
                    <div ref={ref} onMouseEnter={() => toggleMenu(true)}>
    Hover to Open
</div>

<ControlledMenu {...menuProps} anchorRef={ref}
    onMouseLeave={() => toggleMenu(false)}
    onClose={() => toggleMenu(false)}>
    <MenuItem>New File</MenuItem>
    <MenuItem>Save</MenuItem>
    <MenuItem>Close Window</MenuItem>
</ControlledMenu>
            </CRow>
            <hr />
            <CRow>
                {/* {jobData && jobData.length > 0 && <JobListTable jobData={jobData} />} */}
                <JobAccordionList jobData={jobData} />
            </CRow>
        </CCol>
        <CCol sm={3}>
            <h5>Major events this week</h5>
            <CListGroup>
                {bulletinCards}
            </CListGroup>
        </CCol>

    </CRow>
  )
}

export default Bulletin