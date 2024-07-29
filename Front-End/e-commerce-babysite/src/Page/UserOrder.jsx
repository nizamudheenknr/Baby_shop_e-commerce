import { MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBRow } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import Navbar from '../Component/Navbar'
import axios from 'axios'

const id = localStorage.getItem("userId")
const userToken = localStorage.getItem("usertoken")
const userConfig={
    headers:{
      "Content-Type":"application/json",
      Authorization:userToken,
    }
  }


const UserOrder = () => {
    const [data , setData] = useState([])

    useEffect(()=>{
        if(id){
            axios.get(`http://localhost:3033/api/userproduct/userorders/${id}`,userConfig)
            .then(response=>{
                setData(response.data.Order)
                console.log("order:",response.data.Order);
            })
        }
    },[])
  return (
    <div>
  <>
      <Navbar />
    
      <div style={{ marginTop: "70px", padding: "20px" }}>
        <MDBCard>
         {  data&&data.map((val)=>{
            return (
                <>
                <MDBCardBody>
            <MDBCardTitle>Order Details</MDBCardTitle>
            <MDBCardText>
              <strong>Payment ID:{val.paymentId}</strong> 
            </MDBCardText>
            <MDBCardText>
              <strong>Order ID:{val.orderId}</strong>
            </MDBCardText>
            <MDBCardText>
              <strong>Purchase Date:{val.purchaseDate}</strong>
            </MDBCardText>
            <MDBCardText>
              <strong>Total Price:{val.totalPrice}</strong> 
            </MDBCardText>
            <MDBCardTitle>Products</MDBCardTitle>
          
             {val.products.map((value)=>{
                  return(
<>
                    <MDBCard style={{ marginBottom: "20px" }}>
                <MDBRow className="g-0">
                  <MDBCol md="8">
                    <MDBCardBody>
                      <MDBCardTitle>Title:{value.productId.title}</MDBCardTitle>
                      <MDBCardText>
                        <strong>Price:{value.productId.price}</strong>
                      </MDBCardText>
                      <MDBCardText>
                        <strong>Quantity:{value.quantity}</strong> 
                      </MDBCardText>
                      <MDBCardText></MDBCardText>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
              </>
                  )
             })}
              </MDBCardBody>
              </>
            )
         }) 
          
 }       
          
        </MDBCard>
      </div>
    </>

    </div>
  )
}

export default UserOrder