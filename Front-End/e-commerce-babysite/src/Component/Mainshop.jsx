import React, { createContext,  useState } from 'react'
import Home from '../Page/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shope from '../Page/Shope'
// import { babyproducts} from './Products'
import Addtocart from '../Page/Addtocart';
import Singleitem from '../Page/Singleitem';
import Admin from './ADMIN/Admin';
import Billing from '../Page/Billing';
import AdminProduct from '../Component/ADMIN/AdminProduct'


import Login from '../Page/Login';
import Register from '../Page/Register';
// import axios from 'axios';


export const shopItem = createContext()


const Mainshop = () => {
   const [sitem,setSitem]=useState([])
   const [login,setLogin]=useState([])
   const [use,setUse] = useState()
   const [searched,setSearched]=useState([])
  
  //  useEffect(()=>{
  //   const fetchProduct = async ()=>{
  //     const response = await axios.get('http://localhost:3033/api/userproduct/allproducts');
  //     setSitem(response.data.products)
  //     console.log('dfgh',response.data.products);
  //   }
  //   fetchProduct();
  // },[])
  return (
    <div >      
        <shopItem.Provider value={{sitem,setSitem,login,setLogin,use,setUse,searched,setSearched}}>
       
         
       <BrowserRouter>
 
       <Routes>
         
      
       <Route path="/" element={<Home/>} />
       <Route path='/billing/:id' element={<Billing/>}/>
       <Route path="/:type" element={<Shope/>} />        
       <Route path='/addtocart' element={<Addtocart/>}/>   
       <Route path='/login' element={< Login />}/>
       <Route path='/register' element={<Register/>} />
       <Route path='/:type/:id' element={<Singleitem/>}/>
       <Route path='/admin' element={<Admin/>}/>
       <Route path='/adminproductadd' element={<AdminProduct/>}/>
       </Routes>      
       </BrowserRouter>    
          </shopItem.Provider>
           
    </div>
  )
}

export default Mainshop