import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { shopItem } from "../Component/Mainshop";
import "./Loginbtn.css";


const Login = () => {
  const { login, use, setUse, setLogin } = useContext(shopItem);
  const inputref = useRef();
  const nav = useNavigate();
  const submitHandle = (e) => {
    e.preventDefault();
    let email = inputref.current.email.value;
    let password = inputref.current.password.value;
    let userdata = login.find(
      (x) => x.email == email && x.password == password
    );
    if(email=== 'admin@gmail.com' &&password==='123'){
        nav('/admin');
      }
    else if (userdata) {
      setUse(userdata);
      nav("/");
      alert("Login Succussfully");
      
    } else {
      alert(" You dont have any account,Register to Login");
    }
    
  };

  return (
    <div className="L-MA">
  
      
      <br /><br /><br /><br /><br /><br />
      
        <form ref={inputref} onSubmit={submitHandle} > 
        <div className="container">
          <MDBInput
            className="mb-4"
            name="email"
            type="email"
            id="form2Example1"
            label="Email address"
          />
          <MDBInput
            className="mb-4"
            name="password"
            type="password"
            id="form2Example2"
            label="Password"
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

          <MDBBtn type="submit" className="mb-4" block>
            Sign in
          </MDBBtn>
          <p>
              Not a member?{" "}
              <button className="Reg-btn" onClick={() => nav("/register")}>
                Register
              </button>
              </p>

          {/* <div className="text-center">
           
            </p>
            <p>or sign up with:</p>

            <MDBBtn floating color="secondary" className="mx-1">
              <MDBIcon fab icon="facebook-f" />
            </MDBBtn>

            <MDBBtn floating color="secondary" className="mx-1">
              <MDBIcon fab icon="google" />
            </MDBBtn>

            <MDBBtn floating color="secondary" className="mx-1">
              <MDBIcon fab icon="twitter" />
            </MDBBtn>

            <MDBBtn floating color="secondary" className="mx-1">
              <MDBIcon fab icon="github" />
            </MDBBtn>
          </div> */}
          </div>
        </form>
       
    </div> 
  );
};

export default Login;
