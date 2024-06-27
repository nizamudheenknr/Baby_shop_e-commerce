import React, { useContext }  from 'react'
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
import { shopItem } from '../Component/Mainshop';
import './Home.css'
import { useNavigate } from 'react-router-dom';
import Footer from '../Component/Footer'
import Navbar from '../Component/Navbar';

const Home = () => {
   const nav=useNavigate()
const { use } =useContext(shopItem)
console.log(use)
  return (
    <div style={{marginTop:'-13px'}}>
      <Navbar/>
      <br/><br/>
      {/* <source src="../img/video/product-world-gif.webm" type="video/mp4"></source> */}
        <MDBCarousel showIndicators showControls fade className='carousel'>
        <MDBCarouselItem itemId={1}>
          <img src='https://cdn.pixelspray.io/v2/black-bread-289bfa/XUefL6/wrkr/original/catalog/brandstore/Mothercare/316-1706725800-stroller1stweekoffeb2024d.jpg' className='d-block w-100'  onClick={()=>nav('/baby stroller')}/>
          <MDBCarouselCaption>
            <h5></h5>
            <p></p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
  
        <MDBCarouselItem itemId={2}>
          <img src='https://cdn.pixelspray.io/v2/black-bread-289bfa/XUefL6/wrkr/original/catalog/brandstore/Mothercare/316-1706725800-nursery1weekfeb2024d.jpg' className='d-block w-100' onClick={()=>nav('/toys')} />
          <MDBCarouselCaption>
            <h5></h5>
            <p></p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
  
        <MDBCarouselItem itemId={3}>
          <img   src='https://cdn.pixelspray.io/v2/black-bread-289bfa/XUefL6/wrkr/original/catalog/brandstore/Mothercare/316-1706725800-ss2024desktop.jpg' className='d-block w-100' onClick={()=>nav('/dress')}  />
          <MDBCarouselCaption>
            <h5></h5>
            <p></p>
            
             
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarousel>

         <h1 className='L-MOffer'>  🎀  𝐿𝒾𝓂𝒾𝓉𝓉𝑒𝒹 🌸𝒻𝒻𝑒𝓇  🎀   </h1>
         <div className='jelly-poster'>
         <img className='imgto-1' onClick={()=>nav('/baby stroller')}  src='https://cdn.pixelbin.io/v2/black-bread-289bfa/HrdP6X/original/hamleys-banner/170445747092637.webp'/>
         <img className='imgto-2'  onClick={() => nav("/dress")} src='https://cdn.pixelbin.io/v2/black-bread-289bfa/HrdP6X/original/hamleys-banner/170445752492639.webp'/>
         <img className='imgto-3' onClick={()=> nav('/baby care')} src="https://cdn.pixelbin.io/v2/black-bread-289bfa/HrdP6X/original/hamleys-banner/170445765092638.webp" alt="" />
         <img className='imgto-4' onClick={()=>nav('/toys')}  src='https://cdn.pixelbin.io/v2/black-bread-289bfa/HrdP6X/original/hamleys-banner/170445769792625.webp'/>
         {/* <img style={{width:'250px'}} src='https://cdn.pixelbin.io/v2/black-bread-289bfa/HrdP6X/original/hamleys-banner/170445759092641.webp'/>
         <img style={{width:'250px'}} src='https://cdn.pixelbin.io/v2/black-bread-289bfa/HrdP6X/original/hamleys-banner/170445767292626.webp' /> */}
         </div>
        <div>
      <img className='LA-Im'  src="https://juniorshop.in/wp-content/uploads/2022/04/banner_1.jpg" alt="" />

      </div>
      <div>
        <img className='B-F-L' src='https://breeze-media.vega.co.in/media/catalog/category/Feeding_bottle.jpg.webp'/>
      </div>
      <div>
        <img className='Explo' src='https://cdn.fcglcdn.com/brainbees/images/cattemplate/750_103_default_toys_040923_11.jpg'/>
      </div>
      

      
        <Footer/>
    </div>
  )
}

export default Home

// https://cdn.pixelspray.io/v2/black-bread-289bfa/XUefL6/wrkr/original/catalog/brandstore/Mothercare/316-1706725800-nursery1weekfeb2024d.jpg