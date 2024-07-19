import axios from 'axios';
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import Admin from './Admin';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const AdminUserview = () => {

    const [user,setUser]=useState([]);
    const [render , setRender] = useState(false)

    const nav = useNavigate()

    const adminToken = localStorage.getItem("adminToken")
    console.log(adminToken);
  
    useEffect(() => {       
        
    
      },[])

      const BlockUser = async (userId, currentStatus) => {
        try {
          const response = await axios.patch(
            `http://localhost:3033/api/admin/user/Block&unblock/${userId}`,
            { isDeleted: !currentStatus },
            adminConfig
          ).then(()=>{
            toast.success(`User ${currentStatus ? 'unblocked' : 'blocked'} successfully`);
            setRender(!render)
          })
         
    
          const updatedUser = response.data.data;
          setUser(Users => Users.map(user => (user.email === updatedUser.email ? updatedUser : user)));

        
          // window.location.reload();
      
        } catch (error) {
          console.error(error.response.data.message);
        }
      }

      const logout = ()=>{
        localStorage.clear()
        toast.success('Logged out successfully');
        nav('/')
      }
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
      
    },[render])


     

    
 
  
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
            {/* {item.isDeleted? <MDBBtn color='link' size='sm'>
              <i className='fas fa-times'></i> */}
              <MDBBtn color='link' size='sm' onClick={() => BlockUser(item._id, item.isDeleted)}>
              <i className={`fas fa-${item.isDeleted ? 'times' : 'check'}`}></i>
           
            </MDBBtn>
           
           
          </td>
        </tr>
          </>
        ))}
        
       <button onClick={logout}>logout</button>
     
       
      </MDBTableBody>
    </MDBTable>
    
    </div>
    </div>
  )
}

export default AdminUserview



 // if(!localStorage.getItem('adminToken')){
        //   nav('/login')
        // }