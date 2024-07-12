import React, { useEffect, useState } from 'react';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import toast from 'react-hot-toast';
import Admin from './Admin';

const AdminProductView = () => {
  const [gridModal, setGridModal] = useState(false);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [view, setView] = useState([]);
  const [loading, setLoading] = useState(false);

  const [refresh,setRefresh]=useState(true)
  
  const toggleOpen = () => setGridModal(!gridModal);

  const adminToken = localStorage.getItem("adminToken");

  const adminConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: adminToken,
    }
  };

  useEffect(() => {
    const productView = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3033/api/admin/viewproducts', adminConfig);
        if (response.status === 200) {
          setView(response.data.data);
          setRefresh(refresh)
        }
      } catch (error) {
        toast.error("Failed to fetch products");
        console.error(error.response.data);
      } finally {
        setLoading(false);
      }
    };

    productView();
  }, []);

  const addHandle = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('image', image);

    try {
      const configProduct = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: adminToken,
        }
      };

      const response = await axios.post("http://localhost:3033/api/admin/addproduct", formData, configProduct);
      if (response.status === 200) {
        setView([...view, response.data.data]);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }

    setGridModal(false);
  };

  return (
    <div>
      <Admin />
      <MDBBtn color='tertiary' size='lg' className='mx-5 fixed' onClick={toggleOpen}>
        <MDBIcon far icon="plus-square" /> Add Product
      </MDBBtn>

      {loading ? (
        <div>Loading...</div>
      ) : (
        view.slice().reverse().map((value, index) => (
          <div key={index} className="p-3 p-md-5">
            <MDBCard style={{ width: '100%' }}>
              <MDBRow className="g-0">
                <MDBCol xs="12" md="4">
                  <MDBCardImage 
                    src={value?.productImage} 
                    alt="..." 
                    fluid 
                    className="w-100 h-100" 
                  />
                </MDBCol>
                <MDBCol xs="12" md="8">
                  <MDBCardBody>
                    <MDBCardTitle>Name: {value?.title}</MDBCardTitle>
                    <MDBCardText>Price: {value?.price}</MDBCardText>
                    <MDBCardText>Category: {value?.category}</MDBCardText>
                    <MDBCardText>
                    Description: {value?.description}
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </div>
        ))
      )}

      <MDBModal open={gridModal} onClose={() => setGridModal(false)} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add new Product</MDBModalTitle>
              <MDBBtn type='button' className='btn-close' color='none' onClick={() => setGridModal(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form onSubmit={addHandle}>
                <MDBInput 
                  onChange={(e) => setTitle(e.target.value)} 
                  label="Name" 
                  className='mb-3' 
                  id="formControlLg" 
                  type="text" 
                  size="lg" 
                  required 
                />
                <MDBInput 
                  onChange={(e) => setPrice(e.target.value)} 
                  label="Price" 
                  className='mb-3' 
                  id="formControlLg" 
                  type="number" 
                  size="lg" 
                  required 
                />
                <MDBInput 
                  onChange={(e) => setDescription(e.target.value)} 
                  label="Description" 
                  className='mb-3' 
                  id="formControlLg" 
                  type="text" 
                  size="lg" 
                  required 
                />
                <MDBInput 
                  onChange={(e) => setCategory(e.target.value)} 
                  label="Category" 
                  className='mb-3' 
                  id="formControlLg" 
                  type="text" 
                  size="lg" 
                  required 
                />
                <MDBInput 
                  onChange={(e) => setImage(e.target.files[0])} 
                  className='mb-3' 
                  id="formControlLg" 
                  type="file" 
                  size="lg" 
                  required 
                />
                <MDBBtn type='submit'>ADD</MDBBtn>
              </form>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default AdminProductView;
