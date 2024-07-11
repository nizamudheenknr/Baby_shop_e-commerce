import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Component/Navbar';

import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn
  } from 'mdb-react-ui-kit';
import { shopItem } from '../Component/Mainshop';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const Shope = () => {
  const [item, setitem] = useState([])

  useEffect(()=>{

    const fetchProduct = async ()=>{
      try {
        const response = await axios.get('http://localhost:3033/api/userproduct/allproducts');
        // console.log("hjcbhj",response.data);
  
        setitem(response.data.products)
      } catch (error) {
        console.log(error.response.data);
        
      }
     
    }
    fetchProduct();
  },[])
  // console.log("mmp",item);
  
  const nav=useNavigate()
    const {sitem,searched}=useContext(shopItem)
    const {type} = useParams()
    const singleP = sitem.filter((x)=>x.type==type)
    // console.log(searched);

    // const filterData=sitem.filter((item)=>item.type==='baby trolley')
  return (<>
  <Navbar/>
    <br/><br/>
    <div style={{backgroundColor:'#FDFAFE',display:"flex",flexWrap:"wrap"}}>
     
        {(searched[0]!==undefined?searched:type!=="shope"?singleP:item).map((item)=>(
             <MDBCard key={item.id} style={{marginLeft:"50px",marginTop:"30px",width:'200px',height:'450px'}}>
      <MDBCardImage src={item.productImage} position='top' alt='...' />
      <MDBCardBody>
        <MDBCardTitle>{item.title}</MDBCardTitle>
        <MDBCardText>
         {item.price}
        </MDBCardText>
        <MDBBtn onClick={()=> nav(`/${item.type}/${item.id}`)} >Show</MDBBtn>
      </MDBCardBody>
    </MDBCard>
        ))}
      
    </div>
    </>
  )
}

export default Shope