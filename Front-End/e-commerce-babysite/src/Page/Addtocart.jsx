import React, { useContext,useEffect,useState } from 'react'
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
// import { shopItem } from '../Component/Mainshop';
import axios from 'axios';
import Navbar from '../Component/Navbar';
// import { useParams } from 'react-router-dom';
const Addtocart = () => {
 
  // const navigate = useNavigate();

    const [item, setItem] = useState([]);
    // const {userId} = useParams()
  
    let userId = localStorage.getItem("userId");

    
  
  const userToken = localStorage.getItem("usertoken");
  const userConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: userToken,
    },
  };
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3033/api/userproduct/cart/${userId}`,{},userConfig);
                console.log("gvgv",response);
                setItem(response.data);
                
            } catch (error) {
                console.error(error.response.data.message);
            }
        };
        fetchProduct(userId);
      
    }, [userId]);

    setTimeout(()=>{
      console.log("products",item);
     },5000)

    //  const handleIncrement = async (productid,userid)=>{
    //   await axios.post(`http://localhost:3033/api/userproduct/${userid}/cart/${productid}/increment`)
    //  }
  
  return (<>
      <Navbar/>
       
    <div style={{marginTop:'70px',display:"flex",flexWrap:"wrap"}}> {item?.map((x,index)=>(
            <>
         <MDBCard key={index} style={{ maxWidth: '540px' }} >
         <MDBRow className='g-0'>
           <MDBCol md='4'>
             <MDBCardImage src={x?.productId?.productImage}alt='...' fluid />
           </MDBCol>
           <MDBCol md='8'>
             <MDBCardBody>
               <MDBCardTitle></MDBCardTitle>
               <MDBCardText>
                {x?.productId?.title}
               </MDBCardText>
               <MDBCardText>
               {x?.productId?.price}
               </MDBCardText>
               <MDBCardText>
               {x?.productId?.description}
               </MDBCardText>
               <MDBCardText>
                 
{/* 
                 <p>Quantity: <button onClick={()=>handleIncrement(x.productId._id) }>+</button>{x.quantity}<button onClick={()=>Decrement(x.id)}>-</button></p>

                 <button onClick={()=>remove(x.id)}>REMOVE</button> */}

               </MDBCardText>
             </MDBCardBody>
           </MDBCol>
         </MDBRow>
       </MDBCard>
       </>
       ))}

     
        
    </div>
    </>
  )
}

export default Addtocart






 // const {login}=useContext(shopItem)

  // const {use} = useContext(shopItem)
  // const [add,setAdd]  = useState(false)
  // const remove = (id)=>{
    
  //   let filteredData = use.cart.filter((x)=>x.id !== id)
  //   use.cart = filteredData
  //   setAdd(!add)
  // }
  // const Increment = (id)=>{
  //   const cartData = use.cart.find((x)=>x.id==id)
   
  //    cartData.quantity += 1
  //    setAdd(!add)
  // }
  // const Decrement = (id)=>{
  //   const cartData = use.cart.find((x)=>x.id===id)

  //   if(cartData.quantity>1){

  //     cartData.quantity -= 1
  //   }
    
  //   setAdd(!add)
  // }