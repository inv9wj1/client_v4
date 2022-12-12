import React from 'react';
import {CRow, CCol, CCardGroup, CCard, CCardImage, CCardBody, CCardTitle, CCardText, CListGroup, CListGroupItem, CCardFooter, CButton  } from '@coreui/react'
import helpImage from "./../../assets/images/helpsupport.jpg"
import demoImage from "./../../assets/images/demo.jpg"
import fbImage from "./../../assets/images/facebook.png"
import twitterImage from "./../../assets/images/Twitter.png"
import instaImage from "./../../assets/images/Instagram.png"

function HelpSupport() {
  return <div>

      <header>
        <h1>Looking for supprt or sales? Contact us.</h1>
        
          SoftOps helps you to interface with your Mainframe in a easy and friendly way.
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.
        
      </header>

      <section>
        <CCard className="mb-3" style={{ maxWidth: '1440px' }}>
          <CRow className="g-0">
            <CCol md={4}>
              <CCardImage src={helpImage} />
            </CCol>
            <CCol md={8}>
              <CCardBody>
                <CCardTitle>Help Articles</CCardTitle>
                <CCardText>
                  <CListGroup flush>
                    <CListGroupItem component="button"> I cannot remember my login or password </CListGroupItem>
                    <CListGroupItem component="button">I want to report a security issue</CListGroupItem>
                    <CListGroupItem component="button">I have a billing question (unrecognized charge/invoice) </CListGroupItem>
                    <CListGroupItem component="button">Cannot find what you are looking for? Check out our FAQ</CListGroupItem>
                  </CListGroup>
                </CCardText>
                <CCardText>
                  <small className="text-medium-emphasis">
                    See All Help Articles
                  </small>
                </CCardText>
              </CCardBody>
            </CCol>
          </CRow>
        </CCard>
      </section>

      <section>
        <CCard className="mb-3"color='info' textColor='white' style={{ maxWidth: '1440px' }}>
          <CRow className="g-0">
            <CCol md={8}>
              <CCardBody>
                <CCardTitle>Are you an enterprise, large brand or agency?</CCardTitle>
                <CCardText>
                  Soft Ops empowers multiple users, teams, departments and regions within an organization to easily use Mainframe for business needs.
                  Some quick example text to build on the card title and make up the bulk of the card content.
                </CCardText>
                <CCardText>
                  <small className="text-medium-emphasis">
                    We support your privacy.
                  </small>
                </CCardText>
              </CCardBody>
              <CCardFooter>
                <CButton> Request a demo</CButton>
              </CCardFooter>
            </CCol>
            <CCol md={4}>
              <CCardImage src={demoImage} />
            </CCol>
          </CRow>
        </CCard>
      </section>

              <h1>Our Social coordinates</h1>
      <section>
        <CCardGroup>
            <CCard style={{ maxWidth: '150px', maxHeight: '250px' }}>
              <CCardImage orientation="top" src={twitterImage} className='w-100'  />
              <CCardBody>
                <CCardTitle>Twitter</CCardTitle>
              </CCardBody>
              <CCardFooter>
                <small className="text-medium-emphasis">Latest tweet was 3 mins ago</small>
              </CCardFooter>
            </CCard>
            <CCard style={{ maxWidth: '150px', maxHeight: '250px' }}>
              <CCardImage orientation="top" src={fbImage} />
              <CCardBody>
                <CCardTitle>Facebook</CCardTitle>
              </CCardBody>
              <CCardFooter>
                <small className="text-medium-emphasis">Latest post was 53 mins ago</small>
              </CCardFooter>
            </CCard>
            <CCard style={{ maxWidth: '150px', maxHeight: '250px' }}>
              <CCardImage orientation="top" src={instaImage} />
              <CCardBody>
                <CCardTitle>Instagram</CCardTitle>
              </CCardBody>
              <CCardFooter>
                <small className="text-medium-emphasis">Latest update was 33 mins ago</small>
              </CCardFooter>
            </CCard>
          </CCardGroup>

      </section>


  </div>
}

export default HelpSupport;
