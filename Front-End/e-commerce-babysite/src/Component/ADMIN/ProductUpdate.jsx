import axios from "axios";
import { MDBInputGroup } from "mdb-react-ui-kit";
import  { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ProductUpdate = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [id, setid] = useState();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    setName(searchParams.get("name"));
    setPrice(searchParams.get("price"));
    setCategory(searchParams.get("category"));
    setDescription(searchParams.get("description"));
    setImage(searchParams.get("image"));
    setid(searchParams.get("id"));
  }, []);

  const adminToken = localStorage.getItem('adminToken');
  console.log(adminToken);

  const adminConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: adminToken,
    },
  };
  const editHandle = () => {
    axios.patch(`http://localhost:3033/api/admin/updateproduct/${id}`, {
      title:name,
      price: price,
      category:category,
      description:description,
      image,
    },adminConfig).then((res)=>{
      setName('')
      setCategory('')
      setPrice('')
      setDescription('')
      setImage('')
      console.log(res.data);
    }).catch((err)=>console.log(err))
  };
  return (
    <div style={{marginTop:"130px", maxWidth: '800px', margin: 'auto', padding: '40px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 0 15px rgba(0,0,0,0.2)', backgroundColor: '#f9f9f9' }}>
    <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Edit Product</h2>
    
    <MDBInputGroup className="mb-4" textBefore="Name" style={{ flexWrap: 'nowrap' }}>
      <input className="form-control" style={{ flex: '1 1 auto', minWidth: '250px' }} type="text" value={name} onChange={(e) => setName(e.target.value)} />
    </MDBInputGroup>
    
    <MDBInputGroup className="mb-4" textBefore="Price" style={{ flexWrap: 'nowrap' }}>
      <input className="form-control" style={{ flex: '1 1 auto', minWidth: '250px' }} type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
    </MDBInputGroup>
    
    <MDBInputGroup className="mb-4" textBefore="Description" style={{ flexWrap: 'nowrap' }}>
      <input className="form-control" style={{ flex: '1 1 auto', minWidth: '250px' }} type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
    </MDBInputGroup>
    
    <MDBInputGroup className="mb-4" textBefore="Category" style={{ flexWrap: 'nowrap' }}>
      <input className="form-control" style={{ flex: '1 1 auto', minWidth: '250px' }} type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
    </MDBInputGroup>
    
    <MDBInputGroup className="mb-4" textAfter="Upload" textTag="label" textProps={{ htmlFor: "inputGroupFile02" }} style={{ flexWrap: 'nowrap' }}>
      <input className="form-control" type="file" id="inputGroupFile02" />
    </MDBInputGroup>
    
    <button onClick={editHandle} className="btn btn-primary w-50" style={{ padding: '10px', fontSize: '16px' }}>Submit</button>
  </div>
  
  );
};

export default ProductUpdate;

//  setTitle(response.data.data.title)
//  setProductimage(response.data.data.productImage)
//  setCategory(response.data.data.category)
//  setDescription(response.data.data.description)
//  setPrice(response.data.data.Price)

// const [title,setTitle]=useState("")
// const [productimage,setProductimage]=useState("")
// const [category,setCategory]=useState("")
// const [description,setDescription]=useState("")
// const [price,setPrice]=useState("")










{/* <div>
<MDBInputGroup className="mb-3  " textBefore="Name">
  <input className="form-control" type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
</MDBInputGroup>
<MDBInputGroup className="mb-3" textBefore="Price">
  <input className="form-control" type="text" value={price} onChange={(e)=>setPrice(e.target.value)}/>
</MDBInputGroup>
<MDBInputGroup className="mb-3" textBefore="Description">
  <input className="form-control" type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/> 
</MDBInputGroup>
<MDBInputGroup className="mb-3 w-1000" textBefore="Category">
  <input className="form-control" type="text" value={category} onChange={(e)=>setCategory(e.target.value)}/>
</MDBInputGroup>
<MDBInputGroup
  className="mb-3"
  textAfter="Upload"
  textTag="label"
  textProps={{ htmlFor: "inputGroupFile02" }}
>
  <input className="form-control" type="file" id="inputGroupFile02" />
</MDBInputGroup>
<button onClick={editHandle}>submit</button>
</div> */}