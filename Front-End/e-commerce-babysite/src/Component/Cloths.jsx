// import React, { useContext } from 'react'
// import { shopItem } from './Mainshop'
// import {
//     MDBCard,
//     MDBCardBody,
//     MDBCardTitle,
//     MDBCardText,
//     MDBCardImage,
//     MDBRow,
//     MDBCol,
//     MDBBtn
//   } from 'mdb-react-ui-kit';









// const Cloths = () => {
//     const {sitem}=useContext(shopItem)
//      const filterData=sitem.filter((item)=>item.type==='dress')
//   return (
//     <>
//   <div style={{backgroundColor:'#FDFAFE',display:"flex",flexWrap:"wrap"}}>
//   <br/><br/>
//      {filterData.map((item)=>(
// <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
// <MDBCol  >
//   <MDBCard style={{width:'300px',marginRight:'40px'}} className='h-100'>
//     <MDBCardImage
//       src={item.image}
//       alt='...'
//       position='top'
//     />
//     <MDBCardBody>
//       <MDBCardTitle>{item.productname}</MDBCardTitle>
//       <MDBCardText>
//        {item.discription}
//       </MDBCardText>
//     </MDBCardBody>
//   </MDBCard>
// </MDBCol>
// </MDBRow>
//         ))}
        

//     </div>
//     </>
//   )
// }

// export default Cloths