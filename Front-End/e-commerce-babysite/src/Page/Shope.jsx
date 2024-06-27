import React, { useContext } from 'react'
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


const Shope = () => {
  const nav=useNavigate()
    const {sitem,searched}=useContext(shopItem)
    const {type} = useParams()
    const singleP = sitem.filter((x)=>x.type==type)
    console.log(searched);

    // const filterData=sitem.filter((item)=>item.type==='baby trolley')
  return (<>
  <Navbar/>
    <br/><br/>
    <div style={{backgroundColor:'#FDFAFE',display:"flex",flexWrap:"wrap"}}>
     
        {(searched[0]!==undefined?searched:type!=="shope"?singleP:sitem).map((item)=>(
             <MDBCard key={item.id} style={{marginLeft:"50px",marginTop:"30px",width:'200px',height:'450px'}}>
      <MDBCardImage src={item.image} position='top' alt='...' />
      <MDBCardBody>
        <MDBCardTitle>{item.productname}</MDBCardTitle>
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