import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { shopItem } from "../Component/Mainshop";
import './Register.css'
import { MDBInput, MDBCheckbox, MDBBtn, MDBIcon } from "mdb-react-ui-kit";

const Register = () => {
  const inputref = useRef(null);
  const { login, setLogin } = useContext(shopItem);
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = inputref.current.username.value;
    const email = inputref.current.email.value;
    const password = inputref.current.password.value;
    const cpassword = inputref.current.cpassword.value;
    if (password == cpassword) {
      setLogin([
        ...login,
        {
          username: username,
          email: email,
          password: password,
          cpassword: cpassword,
          cart: [],
        },
      ]);
      nav("/login");
    } else {
      alert("Password doesnt match");
    }
  };
  console.log(login);
  return (
    <div className="R-MIM">
      <br/><br/><br/><br/><br/><br/><br/><br/>


        
      <form ref={inputref} onSubmit={handleSubmit}>
        <div className="container">

          <MDBInput
            className="mb-4"
            type="text"
            id="form3Example1"
            label="Full Name"
            name="username"
            required
          />
          <MDBInput
            className="mb-4"
            type="email"
            id="form3Example3"
            label="Email address"
            name="email"
            required
          />
          <MDBInput
            className="mb-4"
            type="password"
            label="Password"
            name="password"
            required
          />
          <MDBInput
            className="mb-4"
            type="password"
            label="ConfirmPassword"
            name="cpassword"
            required
          />

          <MDBCheckbox
            wrapperClass="d-flex justify-content-center mb-4"
            id="form3Example5"
            label="Subscribe to our newsletter"
            defaultChecked
          />

          <MDBBtn type="submit" className="mb-4" block>
            Sign in
          </MDBBtn>

          

          {/* <div className="text-center">
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

export default Register;

{
  /* <div style={{marginTop:'150px',marginLeft:''}}>
        <form ref={inputref} onSubmit={handleSubmit}>
          <input name='username' type='text' placeholder='Enter your name'/> <br/>
          <input name='email' type='email' placeholder='Enter your Email'/>  <br/>
          <input name='password' type='password' placeholder='Enter your password'/> <br/>
          <input name='cpassword' type='password' placeholder='Re-enter Your password'/> <br/>
          <button type='submit' onClick={()=> nav('/login')}> SUBMIT</button>         
        </form>
        </div> */
}
