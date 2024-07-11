
import React, { useContext, useEffect, useRef, useState } from 'react';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {
  
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from 'mdb-react-ui-kit';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import { shopItem } from '../Mainshop';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from 'mdb-react-ui-kit';
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

  useEffect(() => {
    if(!localStorage.getItem('adminToken')){
      nav('/login')
    }
  },[]);

  useEffect(()=>{
    const userData = async ()=>{
      const response = await axios.get('http://localhost:3033/api/admin/usersdata',adminConfig)
      setUser(response.data.data)
    }
    userData()
  },[]);

  const logout = ()=>{
    localStorage.clear()
    nav('/')
  }
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
    const [fillActive, setFillActive] = useState('tab1');

  const handleFillClick = (value) => {
    if (value === fillActive) {
      return;
    }

    setFillActive(value);
  };

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
          <MDBTabsLink onClick={() =>{ nav('/adminalluser')  }} active={fillActive === 'tab1' }>
           User
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() =>{ nav('/adminallproduct'), handleFillClick('/adminallproduct') }} active={fillActive === 'tab2'}>
          Products
          
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleFillClick('tab3')} active={fillActive === 'tab3'}>
          payment
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleFillClick('tab4 ')} active={fillActive === 'tab4'}>
          Revanue
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
            
{/* user details */}

        <MDBTabsPane open={fillActive === 'tab'}>
          
          <div className='p-5'>
          <MDBTable align='middle'>
      <MDBTableHead light>      

        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Email</th>
          <th scope='col'>Name</th>
          <th scope='col'>Block</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
          <>
      {user?.map((item,index)=>(
          <tr key={index}>
          <th scope='row'>{index+1}</th>
          <td>{item.email}</td>
          <td>{item.username}</td>
          <td>
            {item.isDeleted? <MDBBtn color='link' size='sm'>
              <i className='fas fa-times'></i>
            </MDBBtn>: <MDBBtn color='link' size='sm'>
              <i className='fas fa-check'></i>
            </MDBBtn>}
           
           
          </td>
        </tr>
          ))}
          </>
        
       <button onClick={logout}>logout</button>
     
       
      </MDBTableBody>
    </MDBTable>
          </div>
        </MDBTabsPane>
        <MDBTabsPane open={fillActive === 'tab2'}>
          <div className="container">
         <Button variant="primary"  onClick={handleShow}>
         <MdFormatListBulletedAdd className='mx-2 '/>
        Add Product
      </Button></div>
        

        {/* ADD PRODUCTS */}

        
      <Modal show={show} onHide={handleClose}>
        <form ref={addinput} onSubmit={addsubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <MDBInput id="form1" type="file"  className='mb-3'/>
           <MDBInput label="Title" id="form1" type="text" className='mb-3'/>
           <MDBInput label="Description" id="form1" type="text" className='mb-3' />
           <MDBInput label="Price" id="form1" type="text" className='mb-3'/>
           <MDBInput label="Category" id="form1" type="text" className='mb-3'/>
           <MDBInput label="Quantity" id="form1" type="text" className='mb-3'/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type='submit' >
            Save Changes
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
        <div style={{display:'flex',flexWrap:'wrap'}} >
          {
            sitem.map((item)=>(
             
              <MDBCard key={item.id} style={{marginLeft:"50px",marginTop:"30px",width:'200px',height:'450px'}}>
              <MDBCardImage src={item.image} position='top' alt='...' />
              <MDBCardBody>
                <MDBCardTitle>{item.productname}</MDBCardTitle> 
                <MDBCardText>
                 {item.price}
                </MDBCardText>
                <MDBBtn onClick={()=>removeHandle(item.id)}>Remove</MDBBtn>
                <MDBBtn onClick={()=>{toggleOpen(); setItemUpdate(item)}}style={{marginTop:'5px'}} >Edit</MDBBtn>
              </MDBCardBody>
            </MDBCard>
           
            ))
          }
           </div>
           <MDBModal open={basicModal} setOpen={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <form onSubmit={edit}>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit Products</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <label>Product Name : </label>
              <input type='text' defaultValue={ItemUpdate.productname} ref={nameref}/><br/><br/>
              <label>Description : </label>
              <input type='text' defaultValue={ItemUpdate.discription} ref={descref}/><br/><br/>
              <label>Price : </label>
              <input type='text' defaultValue={ItemUpdate.price} ref={priceref}/>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleOpen}>
                Close
              </MDBBtn>
              <MDBBtn  type='submit'>Edit</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
          </form>
        </MDBModalDialog>
      </MDBModal>
        </MDBTabsPane>
      </MDBTabsContent>


   </div>
  )
}

export default Admin


