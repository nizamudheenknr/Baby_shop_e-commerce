import  { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';

const AdminProductView = () => {
  const [gridModal, setGridModal] = useState(false);
  const [update, setupdate] = useState(false);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [view, setView] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); 

  const [perPage] = useState(5); 
  const [totalPages, setTotalPages] = useState(0); 

  const toggleOpen = () => setGridModal(!gridModal);



  const adminToken = localStorage.getItem('adminToken');

  const nav=useNavigate()
  const adminConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: adminToken,
    },
    params: {
      page: currentPage,
      limit: perPage,
    },
  };

  useEffect(() => {
    const productView = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3033/api/admin/viewproducts', adminConfig);
        if (response.status === 200) {
          setView(response.data.data);
          setTotalPages(Math.ceil(response.data.total / perPage));
        }
      } catch (error) {
        toast.error('Failed to fetch products');
        console.error(error.response.data);
      } finally {
        setLoading(false);
      }
    };

    productView();
  }, [currentPage]); 

  

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
        },
      };

      const response = await axios.post('http://localhost:3033/api/admin/addproduct', formData, configProduct);
      if (response.status === 200) {
        setView([...view, response.data.data]);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }

    setGridModal(false);
  };


   
  // const editHandle = (e,id)=>{
  //   e.preventDefault()
  //   console.log(id,'ertyu');
  //     // axios.patch(`http://localhost:3033/api/admin/updateproduct/${id}`,{title,category,image,description,price},adminConfig)
  //   // .then(res=> toast.success("Edit Successfully"))
  // }



  const handlePage = (action) => {
    if (action === 'prev') {
      setCurrentPage((prevPage) => prevPage - 1);
    } else if (action === 'next') {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
        
  
  const Handledelete = (id)=>{
    axios.delete(`http://localhost:3033/api/admin//deleteproduct/${id}`,adminConfig).then(()=>{
      toast.success("product deleted succussfully")
      const data=  view.filter((val)=>val._id !== id)
      setView(data)
    })
  }
           
  

                    
         
    
   

  return (
    <>
      <Admin />
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <MDBBtn color='tertiary' size='lg' className='mx-5 fixed' onClick={toggleOpen}>
    <MDBIcon far icon='plus-square' style={{ marginRight: '10px' }} /> Add Product
  </MDBBtn>

      {loading ? (
        <div>Loading...</div>
      ) : (
        view.map((value, index) => (
          <div key={index} className='p-3 p-md-5'>
            <MDBCard style={{ width: '100%' }}>
              <MDBRow className='g-0'>
                <MDBCol xs='12' md='4'>
                  <MDBCardImage src={value?.productImage} alt='...' fluid className='w-100 h-100' />
                </MDBCol>
                <MDBCol xs='12' md='8'>
                  <MDBCardBody>

                    <MDBCardTitle>Name: {value?.title}</MDBCardTitle>
                    <MDBCardText>Price: {value?.price}</MDBCardText>
                    <MDBCardText>Category: {value?.category}</MDBCardText>
                    <MDBCardText>Description: {value?.description}</MDBCardText>
                    
    
                    <MDBBtn
          color='primary'
          size='sm'
          className='mx-1'
           onClick={()=>nav(`/adminproUpdate?name=${value?.title}&price=${value?.price}&category=${value?.category}&description=${value?.description}&image=${value?.productImage}&id=${value?._id}`)}
        >
        Update Product
        </MDBBtn>
        <MDBBtn
          color='primary'
          size='sm'
          className='mx-1'
         onClick={()=>Handledelete(value._id)}
        >
        delete
        </MDBBtn>
                    {/* <MDBBtn color='primary' onClick={()=>nav('/') }>Show</MDBBtn> */}
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </div>
        )).slice((currentPage - 1) * perPage, currentPage * perPage) 
      )}

      {/* Pagination Controls */}
      <div className='mt-4 d-flex justify-content-center'>
        <MDBBtn
          color='primary'
          size='sm'
          className='mx-1'
          onClick={() => handlePage('prev')}
          disabled={currentPage === 1}
          
        >
          Previous
        </MDBBtn>
        <MDBBtn
          color='primary'
          size='sm'
          className='mx-1'
          onClick={() => handlePage('next')}
          disabled={currentPage === totalPages}
        >
          Next
        </MDBBtn>
      </div>

      {/* Modal for adding product */}
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
                  label='Name'
                  className='mb-3'
                  id='formControlLg'
                  type='text'
                  size='lg'
                  required
                />
                <MDBInput
                  onChange={(e) => setPrice(e.target.value)}
                  label='Price'
                  className='mb-3'
                  id='formControlLg'
                  type='number'
                  size='lg'
                  required
                />
                <MDBInput
                  onChange={(e) => setDescription(e.target.value)}
                  label='Description'
                  className='mb-3'
                  id='formControlLg'
                  type='text'
                  size='lg'
                  required
                />
                <MDBInput
                  onChange={(e) => setCategory(e.target.value)}
                  label='Category'
                  className='mb-3'
                  id='formControlLg'
                  type='text'
                  size='lg'
                  required
                />
                <MDBInput onChange={(e) => setImage(e.target.files[0])} className='mb-3' id='formControlLg' type='file' size='lg' required />
                <MDBBtn type='submit'>ADD</MDBBtn>
              </form>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>




    


    </div>
    </>
  );
};

export default AdminProductView;
