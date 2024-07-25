import  { useEffect, useState } from "react";
import axios from "axios";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBContainer
} from "mdb-react-ui-kit";
import Admin from "./Admin";


const AdminOrderTable = () => {
  const [orders, setOrders] = useState([]);
//   const token = localStorage.getItem("usertoken");

//   const userConfig = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token,
//     },
//   };
const adminToken = localStorage.getItem('adminToken');
console.log(adminToken);

const adminConfig = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: adminToken,
  },
};

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3033/api/admin/orders`,adminConfig
        
        );
        console.log("adminOrdewr",response);
        setOrders(response.data.Data);
        console.log(orders);

      } catch (error) {
        console.error(error.response?.data?.message || error.message);
      }
    };

    fetchOrders();
  }, []);

  const calculateTotalRevenue = () => {
    return orders.reduce((acc, order) => acc + order.totalPrice, 0);
  };

  return (
    < >
     <Admin />

      <MDBContainer style={{ marginTop: "70px", padding: "20px" }}>
        <MDBRow>
          <MDBCol>
            <h2>Admin Order Table</h2>
            <MDBTable striped>
              <MDBTableHead>
                <tr>
                  <th>Order ID</th>
                  <th>User ID</th>
                  <th>Product ID</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {orders.map((order) =>
                  order.products.map((product) => ( 
                    <tr key={product._id}>
                      <td>{order._id}</td>
                      <td>{order.userId}</td>
                      <td>{product.productId}</td>
                      <td>{product.quantity}</td>
                      <td>₹{order.totalPrice}</td>
                    </tr>
                  ))
                 )} 
              </MDBTableBody>
            </MDBTable>
            <h3>Total Revenue: ₹{calculateTotalRevenue()}</h3>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default AdminOrderTable;
