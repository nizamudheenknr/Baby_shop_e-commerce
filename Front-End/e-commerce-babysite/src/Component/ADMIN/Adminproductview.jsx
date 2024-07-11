import Admin from './Admin';

import React from 'react';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';

const Adminproductview = () => {
  return (
    <div>
      <Admin />
      <div className="p-3 p-md-5">
        <MDBCard style={{ width: '100%' }}>
          <MDBRow className="g-0">
            <MDBCol xs="12" md="4">
              <MDBCardImage 
                src="" 
                alt="..." 
                fluid 
                className="w-100 h-100" 
              />
            </MDBCol>
            <MDBCol xs="12" md="8">
              <MDBCardBody>
                <MDBCardTitle>Card title</MDBCardTitle>
                <MDBCardText>
                  This is a wider card with supporting text below as a natural lead-in to additional content. This
                  content is a little bit longer.
                </MDBCardText>
                <MDBCardText>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </MDBCardText>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </div>
    </div>
  );
}

export default Adminproductview;
