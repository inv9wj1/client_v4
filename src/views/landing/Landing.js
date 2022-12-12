import React from 'react';
import { Link } from 'react-router-dom'
import { CCard, CCardImage, CCardImageOverlay, CCardTitle, CCardText, CButton } from '@coreui/react'

import landingImage from './../../assets/images/children-computer.jpg'
import useRightClickmenu from '../../hooks/useRightClickmenu';
import Menu from '../../components/Menu';
function Landing() {
  console.log("Tracking... Landing.js");
  const {x,y,showMenu} = useRightClickmenu();

  return <div>
      <CCard className="mb-3 bg-dark text-white">
        <CCardImage src={landingImage} />
        <CCardImageOverlay>
          <CCardTitle>Soft Ops - Mainframe Made Simple</CCardTitle>
          <CCardText>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi officiis ipsum officia numquam expedita ullam.
          </CCardText>
          <Menu x={x} y={y} showMenu={showMenu} />
          <CCardText>
              <Link to="/bulletin">
                <CButton color="info" className="mt-3" active tabIndex={-1}>
                  Enter
                </CButton>
              </Link>
          </CCardText>
        </CCardImageOverlay>
      </CCard>

  </div>
}

export default Landing;
