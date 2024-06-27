
import React, { useContext, useRef, useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import { shopItem } from '../Component/Mainshop';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Admin = () => {

  const{login,sitem,setSitem} = useContext(shopItem)
  const [basicModal, setBasicModal] = useState(false);
  const [ItemUpdate,setItemUpdate] = useState('')

  const toggleOpen = () => setBasicModal(!basicModal);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

<MDBTabs fill className='mb-3' style={{marginTop:'150px',marginLeft:'60px',backgroundColor:'#FDFAFE',display:"flex",flexWrap:"wrap"}}>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleFillClick('tab1')} active={fillActive === 'tab1'}>
           User
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleFillClick('tab2')} active={fillActive === 'tab2'}>
          Products
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
            
{/* user details */}

        <MDBTabsPane open={fillActive === 'tab1'}>
          {login.map((item)=>(
            <p>Username : {item.username} | Email : {item.email} | Password : {item.password}</p>
          ))}
        </MDBTabsPane>
        <MDBTabsPane open={fillActive === 'tab2'}>
        <h1>ADD PRODUCT :- <Button variant="primary" onClick={handleShow}>
        Add
      </Button></h1>
        

        {/* ADD PRODUCTS */}

        
      <Modal show={show} onHide={handleClose}>
        <form ref={addinput} onSubmit={addsubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Image URL : </label>
          <input required name='addimg'/><br /><br/>
          <label>Title : </label>
          <input required name='addtitle'/><br /><br/>
          <label>Description : </label>
          <input required name='addDesc'/><br /><br/>
          <label>Price : </label>
          <input required name='addprice'/><br /><br/>
          <label>Type : </label>
          <input required name='addtype'/><br /><br/>
          <label>Quantity : </label>
          <input required name='addqunty'/><br /><br/>
          <label>Id : </label>
          <input required name='addId'/>
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


