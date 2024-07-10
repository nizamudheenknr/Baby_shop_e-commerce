import React, { useContext, useRef, useState } from "react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  
} from "mdb-react-ui-kit";
// import { shopItem } from "../Component/Mainshop";
import "./Loginbtn.css";
import axios from "axios";
import toast from "react-hot-toast";


const Login = () => {
  const inputref = useRef();
  const nav = useNavigate();
  const [email,setEmail]=useState([])
  const [password,setPassword]=useState([])
  const [admin,setAdmin]=useState(false)


  const loginHandle = async (e)=>{
    e.preventDefault()
    const loginUrl = admin?"http://localhost:3033/api/admin/login":"http://localhost:3033/api/users/login"
  
    try{
      const response = await axios.post(loginUrl,{email,password})
       if(response.status === 200){
        const token = response.data.token;
        const userData = response.data.data
        console.log("dcdd",userData);
        console.log("sfs",token);
        if(admin){
          localStorage.setItem("adminToken",token)
          localStorage.setItem("user.name","Admin")

        }else{
          localStorage.setItem("userId",userData._id);
         localStorage.setItem("user.name",response.data.data.username)
        }
         toast.success(response.data.message)
         setTimeout(()=>{
          if(admin){
            nav("/admin")
          }else{
            nav("/")
          }
         },1000)

       }else{
        toast.error(response.data.message)
       }

    }catch(error){
      toast.error(error.response.data.message)
    }
  
  }
  return (
    <div className="L-MA">
  
      
      <br /><br /><br /><br /><br /><br />
      
        <form ref={inputref} onSubmit={loginHandle} > 
        <div className="container text-center w-50">
          <MDBInput
            className="mb-4"
            name="email"
            type="email"
            id="form2Example1"
            label="Email address"
            onChange={(e)=>setEmail(e.target.value)}
            
          />
          <MDBInput
            className="mb-4"
            name="password"
            type="password"
            id="form2Example2"
            label="Password"
            onChange={(e)=>setPassword(e.target.value)}
          />

          <MDBRow className="mb-4">
            <MDBCol className="d-flex justify-content-center">
              <MDBCheckbox
                id="form2Example3"
                label="Remember me"
                defaultChecked
              />
            </MDBCol>
            <MDBCol>
              <a>Forgot password?</a>
            </MDBCol>
          </MDBRow>

          <MDBBtn type="submit" className="mb-4 w-50"  >
          {admin?"Admin Sign in":"user Sign in"}
          </MDBBtn>
          <p>
              Not a member?{" "}
              <button className="Reg-btn" onClick={() => nav("/register")}>
                To  Register
              </button>
              </p>
             <MdOutlineAdminPanelSettings onClick={()=>setAdmin(!admin)} style={{cursor:"pointer"}} />
                 <p>{admin?"Admin Login":"User Login"}</p>
       
          </div>
        </form>
       
    </div> 
  );
};

export default Login;


  // const [collect,setCollect]=useState([])
  // const submitHandle = (e) => {
  //   e.preventDefault();
  //   let email = inputref.current.email.value;
  //   let password = inputref.current.password.value;
  //   let userdata = login.find(
  //     (x) => x.email == email && x.password == password
  //   );
  //  
  //   else if (userdata) {
  //     setUse(userdata);
  //     nav("/");
  //     alert("Login Succussfully");
      
  //   } else {
  //     alert(" You dont have any account,Register to Login");
  //   }
    
  // };


    //  {/* <div className="text-center">
           
            // </p>
            // <p>or sign up with:</p>

            // <MDBBtn floating color="secondary" className="mx-1">
            //   <MDBIcon fab icon="facebook-f" />
            // </MDBBtn>

            // <MDBBtn floating color="secondary" className="mx-1">
            //   <MDBIcon fab icon="google" />
            // </MDBBtn>

            // <MDBBtn floating color="secondary" className="mx-1">
            //   <MDBIcon fab icon="twitter" />
            // </MDBBtn>

            // <MDBBtn floating color="secondary" className="mx-1">
            //   <MDBIcon fab icon="github" />
            // </MDBBtn>
          // </div> */}

  // const { login,setLogin, use, setUse} = useContext(shopItem);


  // try {
  //   // const response = await axios.post("http://localhost:3033/api/users/login",{email,password})


  //   if(response.status === 200){
  //     const userCookie =response.data.token;
  //     const userData = response.data.data;
  //     localStorage.setItem("userToken",userCookie);
  //     localStorage.setItem("userId",userData._id);
  //     localStorage.setItem("user.name",response.data.data.username)
  //     toast.success(response.data.message)
  //     setTimeout(()=>{
  //       nav("/")
  //     },1000) 
     
  //   }

  //   if(response.status === 400){
  //     alert(response.data.message)
  //   }
  //   if(response.status===401){
  //     alert(response.data.message)
  //   }
  //   if(response.status === 404){
  //     alert(response.data.message)
  //   }

  //  } catch (error) {
  //   alert(error.response.data.message)
  //  }
  // }
