// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'

// const ProductUpdate = () => {

//   const [title,setTitle]=useState("")
//   const [productimage,setProductimage]=useState("")
//   const [category,setCategory]=useState("")
//   const [description,setDescription]=useState("")
//   const [price,setPrice]=useState("")
   

//   const {id}=useParams(id)


//   useEffect (()=>{
//      try {
//          const fetchProduct= async()=>{
//           const response = await axios.get(`http://localhost:3033/api/admin/viewproducts/${id}`)
//            setTitle(response.data.data.title)
//            setProductimage(response.data.data.productImage)
//            setCategory(response.data.data.category)
//            setDescription(response.data.data.description)
//            setPrice(response.data.data.Price)
//          }
//          fetchProduct()
//      } catch (error) {
//       console.log(error.response.data.message);
//      }
//   })
//   return (
      
//   )
// }

// export default ProductUpdate