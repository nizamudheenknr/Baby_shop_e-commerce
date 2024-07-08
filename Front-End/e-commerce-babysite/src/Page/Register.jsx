
import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
// import { shopItem } from "../Component/Mainshop";
import './Register.css'
import { MDBInput, MDBCheckbox, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  
  // const { login, setLogin } = useContext(shopItem);
  const nav = useNavigate();
const [register,setRegister] = useState([])
  const handleSubmit = async(e) => {
    e.preventDefault();
     try {
      const response = await axios.post('http://localhost:3033/api/users/register',{
        username:register.username,
        email:register.email,
        password:register.password,



      })
    // toast.success(response.data.message);
    toast.success(response.data.message)
     setTimeout(()=>{
         nav("/Login")
     },1000) 
     } catch (error) {
      // toast.error(error.response.data.message);
      toast.error(error.response.data.message)
     }
    
  };

  return (
    <div className="R-MIM">
      <br/><br/><br/><br/><br/><br/><br/><br/>


        
      <form onSubmit={handleSubmit}>
        <div className="container w-50 text-center">

          <MDBInput
            className="mb-4"
            type="text"
            id="form3Example1"
            label="Full Name"
            name="username"
            onChange={(e)=>setRegister({...register, username:e.target.value})}
            required
          />
          <MDBInput
            className="mb-4"
            type="email"
            id="form3Example3"
            label="Email address"
            name="email"
            onChange={(e)=>setRegister({...register, email:e.target.value})}

            required
          />
          <MDBInput
            className="mb-4"
            type="password"
            label="Password"
            name="password"
            onChange={(e)=>setRegister({...register, password:e.target.value})}
            required
          />
          <MDBCheckbox
            wrapperClass="d-flex justify-content-center mb-4"
            id="form3Example5"
            label="Subscribe to our newsletter"
            defaultChecked
          />

          <MDBBtn  type="submit" className="mb-4 w-50">
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
      {/* <Toaster/> */}
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
