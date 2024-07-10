import React from 'react';
import { MDBInput } from 'mdb-react-ui-kit';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <div>
      <Modal.Body>
        <div
          className="container-fluid d-flex justify-content-center align-items-center"
          style={{ height: '100vh' }}
        >
          <div className="row w-100">
            <div className="col-12 col-md-6 mx-auto bg-white p-4 rounded">
              <MDBInput id="form1" type="file" className='mb-3' />
              <MDBInput label="Title" id="form1" type="text" className='mb-3' />
              <MDBInput label="Description" id="form1" type="text" className='mb-3' />
              <MDBInput label="Price" id="form1" type="text" className='mb-3' />
              <MDBInput label="Category" id="form1" type="text" className='mb-3' />
              <MDBInput label="Quantity" id="form1" type="text" className='mb-3' />
            </div>
          </div>
        </div>
      </Modal.Body>
    </div>
  );
}
