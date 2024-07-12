
import React, { useContext, useEffect, useRef, useState } from 'react';

import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
} from 'mdb-react-ui-kit';
import { shopItem } from '../Mainshop';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdFormatListBulletedAdd } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminUserview from './AdminUserview';
const Admin = () => {

  const nav = useNavigate();
  const{login,sitem,setSitem} = useContext(shopItem)
  const [basicModal, setBasicModal] = useState(false);
  const [ItemUpdate,setItemUpdate] = useState('')

  const toggleOpen = () => setBasicModal(!basicModal);

  const [show, setShow] = useState(false);
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [user,setUser]=useState([]);

  const adminToken = localStorage.getItem("adminToken")
  console.log(adminToken);


  const adminConfig={
    headers:{
        'Content-Type':"application/json",
        Authorization:adminToken,
    }
}

  // useEffect(() => {
  //   if(!localStorage.getItem('adminToken')){
  //     nav('/login')
  //   }
  // },[]);

  useEffect(()=>{
    
    const userData = async ()=>{
      const response = await axios.get('http://localhost:3033/api/admin/usersdata',adminConfig)
      setUser(response.data.data)
    }
    userData()
  },[]);

  // const logout = ()=>{
  //   localStorage.clear()
  //   nav('/')
  // }
  console.log(user ,'fghj');


  
   
  const nameref = useRef('')
  const descref = useRef('')
  const priceref = useRef('')

    // EDIT:-

  const edit = (e)=>{
    e.preventDefault();
    const temporary = sitem.map((x)=>
    x.id == ItemUpdate.id?{
      ...x,
      productname:nameref.current.value,
      discription:descref.current.value,
      price:priceref.current.value,
    }:x  
    )
    setSitem(temporary)
  }

  const removeHandle = (id)=>{
    let saveditem = sitem.filter((x)=>x.id !==id)
    alert("Your Product Has Been Deleted")
    setSitem(saveditem)
  }
   



  const addinput = useRef(null)
  const addsubmit = (e)=>{
    e.preventDefault()
    let addtitle = addinput.current.addtitle.value
    let addimg = addinput.current.addimg.value
    let addDesc = addinput.current.addDesc.value
    let addprice = addinput.current.addprice.value
    let addtype = addinput.current.addtype.value
    let addqunty = addinput.current.addqunty.value
    let addId = addinput.current.addId.value
    
    const newadd = {productname:addtitle,image:addimg,discription:addDesc,price:addprice,type:addtype,quantity:addqunty,id:addId}
    setSitem([...sitem,newadd])
    handleClose()
   
  }

  return (
    <div>

<MDBTabs fill className='mb-3' style={{backgroundColor:'#FDFAFE',display:"flex",flexWrap:"wrap"}}>
        <MDBTabsItem>
          <MDBTabsLink onClick={() =>{ nav('/adminalluser')  }} >
           User
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() =>{ nav('/adminallproduct') }}>
          Products
          
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() =>'hh'}>
          Order
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem> 
           <MDBTabsLink onClick={() => 'g'}>
          Revanue
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs> 

    
            
{/* user details */}

       


   </div>
  )
}

export default Admin


