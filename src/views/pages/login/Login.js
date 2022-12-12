import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
//import logoImage from 'https://drive.google.com/file/d/1523UKEkTZDJH4a2Z-YfcDaEPK8lUMFK3/view?usp=sharing'
import logoImage from './logo3.png'

const Login = () => {

  console.log("Tracking... Login.js")
  // let handleLoginClick = () => {
  //   const dispatch = useDispatch()
  //   console.log("Tracking... Login.js - handleLoginClick, dispatched")
  //   dispatch({ type: 'login' })
  // }

  const dispatch = useDispatch()

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
           <CCol md={12}>
            <CCardGroup>
            <CCard className="logo">
                <CCardBody className="content">
                  <div>
                     <img id="logo-img" src={logoImage} alt={'logoImage'}/>
                  </div>
                </CCardBody>
              </CCard>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <Link to="/defaultlayout">
                          <CButton color="info" className="px-4" onClick={() => {
                            dispatch({ type: 'login' })
                          }} >
                            Login
                          </CButton>
                        </Link>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                 </CCardBody>
              </CCard>
             {/*  <CCard className="text-white bg-info py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Dear Techie, <br />
                      Welcome to new experience to the Mainframe World.
                    </p>
                    <Link to="/register">
                      <CButton color="info" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
             </CCard> */}
             </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
