import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
} from "mdb-react-ui-kit";
// import { shopItem } from '../Component/Mainshop';
import axios from "axios";
import Navbar from "../Component/Navbar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// import { useParams } from 'react-router-dom';
const Addtocart = () => {
  const nav = useNavigate();

  const [item, setItem] = useState([]);
  // const {userId} = useParams()
  const [abc, setabc] = useState(false);
  const [remove, setRemove] = useState(false);
  let userId = localStorage.getItem("userId");
  var ItemQuantity;

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

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlepayment = async () => {
    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const orderList = await axios.post(
      `http://localhost:3033/api/userproduct/${userId}/payment`,
      {
        amount: item.reduce(
          (acc, item) => acc + item.productId.price * item.quantity,
          0
        ),
      },
      userConfig
    );
    console.log("payment", orderList.data.data);

    const { amount, id: order_id, currency } = orderList.data.data;

    var options = {
      key: "rzp_test_8AFz4QlvG0Diby", // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: currency,
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const paymentData = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          razorpay_payment_id: response.razorpay_payment_id,
        };

        console.log(paymentData);

        const verificationResult = await axios.post(
          `http://localhost:3033/api/userproduct/:verifypayment`,
          paymentData,
          userConfig
        );

        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature)

        // Send the details to the server for verification and order completion

        // fetch('/your-verification-endpoint',{
        //     method:'POST',
        //     headers:{
        //         'Content-Type':'application/json'
        //     },
        //     body:JSON.stringify({
        //         razorpay_payment_id:response.razorpay_payment_id,
        //         razorpay_order_id:response.razorpay_order_id,
        //         razorpay_signature:response.razorpay_signature,
        //         userid:'userId'
        //     })
        // }).then(res => res.json())
        // .then(data => console.log(data))
        // .catch(error => console.log(error))
      },

      prefill: {
        name: "nizam",
        email: "nizam@gmail.com",
        contact: "9048160716",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    rzp1.open();
  };
  return (
    <>
      <Navbar />

      <div
        style={{
          marginTop: "70px",
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          height: "100vh",
          justifyContent: "space-evenly",
        }}
      >
    
        {item?.map((x, index) => (
          <>
            <MDBCard key={index} style={{ maxWidth: "500px", height: "300px" }}>
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
                        onClick={() => handleRemove(handleRemove?x.productId._id:()=>nav('/:type'))}
                        style={buttonStyle}
                      >
                        REMOVE
                      </button>
                      <MDBBtn
                        style={{ marginLeft: "5px" }}
                        onClick={handlepayment}
                      >
                        Buy now
                      </MDBBtn>
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
