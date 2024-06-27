import React, { useContext } from 'react'
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
import { shopItem } from '../Component/Mainshop';

const Singleitem = () => {
    const {sitem,use,login}=useContext(shopItem)
    let {id}=useParams()
    const nav = useNavigate()

    let data = sitem.find((x)=>x.id==id)
console.log(data);
   console.log(login.cart)
    const addtobag=(data)=>{
      if(use){
        let carteddata=use.cart.find((items)=>items.id==data.id)
      
      if(!carteddata){
        use.cart.push(data)
      }else{
        data.quantity+=1
      }
    }else{
      nav('/login')
    }
  }

  return (
    <div>
<h1>Singleitem</h1>

<MDBCard style={{width:'300px',height:'450px',marginLeft:'550px',marginBottom:'60px',marginTop:'60px'}}>
    
      <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
        <MDBCardImage src={data.image} fluid alt='...' />
        <a>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
        </a>
      </MDBRipple>
      <MDBCardBody>
        <MDBCardTitle>{data.productname}</MDBCardTitle>
        <MDBCardText>
         {data.description}
        </MDBCardText>
        <MDBBtn style={{marginLeft:'5px'}} onClick={()=>nav(`/billing/${data.id}`)}>Buy now</MDBBtn>
        <MDBBtn style={{marginLeft:'30px'}} onClick={()=>addtobag(data)}>Add Cart</MDBBtn>

      </MDBCardBody>
    </MDBCard>


        
    </div>
  )
}

export default Singleitem