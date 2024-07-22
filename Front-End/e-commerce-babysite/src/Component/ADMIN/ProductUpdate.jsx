import axios from 'axios'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ProductUpdate = () => {

  let {id}=useParams()
  

  const [data,setData]=useState([])
  const adminToken = localStorage.getItem('adminToken');
  
  const adminConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: adminToken,
    }}



  useEffect (()=>{
    const fetchProduct= async(id)=>{
     try {
      console.log(id,'hhh');
          const response = await axios.get(`http://localhost:3033/api/admin/viewproducts/${id}`,adminConfig)
          console.log("pdu",response.data.data);
         

          if(response.status === 200){
             setData(response.data.data)
          }
      
       
     } catch (error) {
      console.error(error.response.data.message);
    
     }
    }
     fetchProduct(id)
  },[])
  return (
      <div>

<MDBCard>
      <MDBCardImage src={data?.ProductImage} position='top' alt='...' />
      <MDBCardBody>
        <MDBCardTitle>Card title</MDBCardTitle>
        <MDBCardText>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </MDBCardText>
        <MDBBtn href='#'>Button</MDBBtn>
      </MDBCardBody>
    </MDBCard>
</div>
  )
}

export default ProductUpdate








 //  setTitle(response.data.data.title)
          //  setProductimage(response.data.data.productImage)
          //  setCategory(response.data.data.category)
          //  setDescription(response.data.data.description)
          //  setPrice(response.data.data.Price)



          // const [title,setTitle]=useState("")
  // const [productimage,setProductimage]=useState("")
  // const [category,setCategory]=useState("")
  // const [description,setDescription]=useState("")
  // const [price,setPrice]=useState("")