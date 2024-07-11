import axios from 'axios';
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import Admin from './Admin';

const AdminUserview = () => {

    const [user,setUser]=useState([]);

    const adminToken = localStorage.getItem("adminToken")
    console.log(adminToken);
  
  
    const adminConfig={
      headers:{
          'Content-Type':"application/json",
          Authorization:adminToken,
      }
  }
    useEffect(()=>{
      const userData = async ()=>{
        const response = await axios.get('http://localhost:3033/api/admin/usersdata',adminConfig)
        setUser(response.data.data)
        console.log(response);
      }
      userData()
  
      
    },[])
  return (
    <div >
        <Admin/>
        <div className="p-5">
      <MDBTable align='middle'>
      <MDBTableHead light>      

        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Email</th>
          <th scope='col'>Name</th>
          <th scope='col'>Block</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {user?.map((item,index)=>(
          <>
          <tr>
          <th scope='row'>{index+1}</th>
          <td>{item.email}</td>
          <td>{item.username}</td>
          <td>
            {item.isDeleted? <MDBBtn color='link' size='sm'>
              <i className='fas fa-times'></i>
            </MDBBtn>: <MDBBtn color='link' size='sm'>
              <i className='fas fa-check'></i>
            </MDBBtn>}
           
           
          </td>
        </tr>
          </>
        ))}
        
       {/* <button onClick={logout}>logout</button> */}
     
       
      </MDBTableBody>
    </MDBTable>
    </div>
    </div>
  )
}

export default AdminUserview
