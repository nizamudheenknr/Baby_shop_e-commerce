import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
// import { shopItem } from '../Component/Mainshop';
import axios from "axios";
import Navbar from "../Component/Navbar";
import toast from "react-hot-toast";

// import { useParams } from 'react-router-dom';
const Addtocart = () => {
  // const navigate = useNavigate();

  const [item, setItem] = useState([]);
  // const {userId} = useParams()
  const [abc, setabc] = useState(false);
  const [remove, setRemove] = useState(false);
  let userId = localStorage.getItem("userId");
  var ItemQuantity 

  const token = localStorage.getItem("usertoken");
  const userConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(userConfig);
        const response = await axios.get(
          `http://localhost:3033/api/userproduct/cart/${userId}`,
          userConfig
        );
        console.log("gvgv", response);
        setItem(response.data);
      } catch (error) {
        console.error(error.response.data.message);
      }
    };
    fetchProduct(userId);
  }, [userId, abc, remove]);

  setTimeout(() => {
    console.log("products", item);
  }, 5000);

  const handleIncrement = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:3033/api/userproduct/${userId}/cart/${id}/increment`,
        { ItemQuantity },
        userConfig
      );
      // console.log("dcsdfvfvw", response.data);
      setabc(!abc);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const handleDecrement = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:3033/api/userproduct/${userId}/cart/${id}/decrement`,
        { ItemQuantity },
        userConfig
      );
      // console.log(response, "decremented");
      setabc(!abc);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3033/api/userproduct/${userId}/cart/${productId}/remove`,
        userConfig
      );
      console.log("deleteresp0nse", response);
      setRemove(!remove);
      toast.success(response.data.message);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const buttonStyle = {
    margin: "0 5px",
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  };
  return (
    <>
      <Navbar />

      <div style={{ marginTop: "70px", display: "flex", flexWrap: "wrap" }}>
        {" "}
        {item?.map((x, index) => (
          <>
            <MDBCard key={index} style={{ maxWidth: "540px" }}>
              <MDBRow className="g-0">
                <MDBCol md="4">
                  <MDBCardImage
                    src={x?.productId?.productImage}
                    alt="..."
                    fluid
                  />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody>
                    <MDBCardTitle></MDBCardTitle>
                    <MDBCardText>{x?.productId?.title}</MDBCardText>
                    <MDBCardText>
                      {x?.productId?.price * x?.quantity}
                    </MDBCardText>
                    <MDBCardText>{x?.productId?.description}</MDBCardText>
                    <MDBCardText>
                      <p>
                        Quantity:{" "}
                        <button
                          onClick={() => handleIncrement(x?.productId._id)}
                          style={buttonStyle}
                        >
                          +
                        </button>
                        {x?.quantity}
                        <button
                          onClick={() => handleDecrement(x?.productId._id)}
                          style={buttonStyle}
                        >
                          -
                        </button>
                      </p>

                      <button
                        onClick={() => handleRemove(x?.productId._id)}
                        style={buttonStyle}
                      >
                        REMOVE
                      </button>
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </>
        ))}
      </div>
    </>
  );
};

export default Addtocart;

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
