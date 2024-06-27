import React, { useContext,useState } from 'react'
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import { shopItem } from '../Component/Mainshop';
const Addtocart = () => {
  const {login}=useContext(shopItem)

  const {use} = useContext(shopItem)
  const [add,setAdd]  = useState(false)
  const remove = (id)=>{
    
    let filteredData = use.cart.filter((x)=>x.id !== id)
    use.cart = filteredData
    setAdd(!add)
  }
  const Increment = (id)=>{
    const cartData = use.cart.find((x)=>x.id==id)
   
     cartData.quantity += 1
     setAdd(!add)
  }
  const Decrement = (id)=>{
    const cartData = use.cart.find((x)=>x.id===id)

    if(cartData.quantity>1){

      cartData.quantity -= 1
    }
    
    setAdd(!add)
  }
  return (
    <div>

        <h1 style={{marginTop:'150px'}}>ADD TO CART</h1>

      {use&&use.cart.map((x)=>(
         <MDBCard style={{ maxWidth: '540px' }}>
         <MDBRow className='g-0'>
           <MDBCol md='4'>
             <MDBCardImage src={x.image}alt='...' fluid />
           </MDBCol>
           <MDBCol md='8'>
             <MDBCardBody>
               <MDBCardTitle></MDBCardTitle>
               <MDBCardText>
                {x.productname}
               </MDBCardText>
               <MDBCardText>
                 <small className='text-muted'>{x.price}</small>

                 <p>Quantity: <button onClick={()=>Increment (x.id)}>+</button>{x.quantity}<button onClick={()=>Decrement(x.id)}>-</button></p>

                 <button onClick={()=>remove(x.id)}>REMOVE</button>

               </MDBCardText>
             </MDBCardBody>
           </MDBCol>
         </MDBRow>
       </MDBCard>
      ))}
        
    </div>
  )
}

export default Addtocart