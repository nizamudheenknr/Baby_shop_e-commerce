import Admin from './Admin';

import React, { useEffect, useState } from 'react';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
import axios from 'axios';
import toast from 'react-hot-toast';

const Adminproductview = () => {

      const [title,setTitle]=useState('')
      const [image,setImage]=useState('')
      const [category,setCategory]=useState('')
      const [price,setPrice]=useState(0)
      const [description,setDescription]=useState('')
   
      const[view,setView]=useState([])


      const productAdd = async (e)=>{
        e.preventDefault()

        try {
            const config ={
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }

            const response = await axios.post('http://localhost:3033/api/admin/addproduct',{category,image,title,description,price},config)
            if(response.status === 201){
                toast.success(response.data.messasge)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }

    }


    const adminToken = localStorage.getItem("adminToken")
    console.log("sdvvfdgfh",adminToken);
  
    
  
    const adminConfig={
      headers:{
          'Content-Type':"application/json",
          Authorization:adminToken,
      }
  }
      useEffect(()=>{
        const productView = async ()=>{
            try {
                const response = await  axios.get('http://localhost:3033/api/admin/viewproducts',adminConfig);
            console.log(response);
            if(response.status === 200){
                // alert(response.data.message)
                setView(response.data.data)
                console.log("c bhf", response.data);
            }
            } catch (error) {
                console.log(error.response.data);
            }
            

        }

       productView()
      },[])
    

  return (
    <div>
      <Admin />

      <MDBBtn color='tertiary'><MDBIcon far icon="plus-square" /></MDBBtn>
        {view?.map((value,index)=>(
      <div key={index} className="p-3 p-md-5">
        <MDBCard style={{ width: '100%' }}>
          <MDBRow className="g-0">
            <MDBCol xs="12" md="4">
              <MDBCardImage 
                src={value.productImage} 
                alt="..." 
                fluid 
                className="w-100 h-100" 
              />
            </MDBCol>
            <MDBCol xs="12" md="8">
              <MDBCardBody>
                <MDBCardTitle>{value.title}</MDBCardTitle>
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
    ))}
    </div>
  );
}

export default Adminproductview;
