import React, { useContext, useEffect, useState,  } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn,
    MDBRipple
  } from 'mdb-react-ui-kit';
// import { shopItem } from '../Component/Mainshop';
import axios from 'axios';

const Singleitem = () => {
    let {id}=useParams()
    // const nav = useNavigate()

    const [data,setData] =useState([])
    const [isHovered, setIsHovered] = useState(false);
    

//     let data = sitem.find((x)=>x.id==id)
// console.log(data);
//    console.log(login.cart)

     useEffect(()=>{
      const productSingleview = async (id)=>{

        try {
          const response = await axios.get(`http://localhost:3033/api/userproduct/viewProducts/${id}`)
          console.log(response.data,'ertyu');
          console.log("product single",response);
          if(response.status === 200){
            
            setData(response.data.data)
          }
        } catch (error) {
          console.error(error.response.data.message);
        } 
        
      }
      productSingleview(id)
     },[id])



  return (
    
    <div style={{display:"flex",justifyContent:'center',marginTop:'130px',backgroundColor:"#FDFAFE"}}>


<MDBCard style={{
    width: '25%',
    height: '550px',
    boxShadow: '10px 10px 10px gray',
    transform: isHovered ? 'scale(1.02)' : 'scale(1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  }}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>

   
    
      <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
      
        <MDBCardImage src={data?.productImage} fluid alt='...' />
        <a>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
        </a>
      </MDBRipple>
      <MDBCardBody>
        <MDBCardTitle>Name: {data?.title}</MDBCardTitle>
        <MDBCardText>Price:-
         {data?.PRice}
        </MDBCardText>
        <MDBCardText>
         {data?.description}
        </MDBCardText>
   
        <MDBBtn style={{marginLeft:'5px'}} >Buy now</MDBBtn>
        <MDBBtn style={{marginLeft:'30px'}} >Add Cart</MDBBtn>

      </MDBCardBody>
    
    </MDBCard>
 
     
    </div>
 
  )
}

export default Singleitem



    // const {sitem,use,login}=useContext(shopItem)


  //   const addtobag=(data)=>{
  //     if(use){
  //       let carteddata=use.cart.find((items)=>items.id==data.id)
      
  //     if(!carteddata){
       
  //       use.cart.push(data)
  //     }else{
  //       data.quantity+=1
  //     }
  //   }else{
  //     nav('/login')
  //   }
  // }
   
  // if(!data){
  //   return <div></div>
  // }