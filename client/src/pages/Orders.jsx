import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    axios
      .get(`http://localhost:5000/orders/${user.ID}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!user) {
    return <h2>Please login to view orders</h2>;
  }

  return (

    <>
    <Nav/>
      <div className="page">
      <h1>Your Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.order_id}
            className="card"
          >
            <h3>Order ID: {order.order_id}</h3>
            <p>Status: {order.status}</p>
            <p>Payment: {order.payment_status}</p>
            <p>Date: {order.created_at}</p>

            <div>
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="item-row"
                  // style={{
                  //   display: "flex",
                  //   gap: "10px",
                  //   marginTop: "10px",
                  //   alignItems: "center"
                  // }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    width="80"
                  />
                  <div>
                    <p>{item.name}</p>
                    <p>₹{item.price}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
    </>
   
  );
};

export default Orders;