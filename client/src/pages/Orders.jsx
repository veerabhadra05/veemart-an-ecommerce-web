import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import API_URL from "../api";
import Loader2 from "../components/Loader2";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isloading, setIsloading] = useState(false)

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setIsloading(true)
    if (!user) return;
    axios.get(`${API_URL}/orders/${user._id}`)
      .then((res) => {
        setIsloading(false)
        setOrders(res.data);
      })
      .catch((err) => {
        setIsloading(false)
        console.log(err)});
  }, []);

  if (!user) {
    return <h2>Please login to view orders</h2>;
  }

  return (

    <>
    <Nav/>
      <div className="orders-page">
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
            <p>Total: ₹{order.total_amount}</p>
            <p>Date: {order.created_at}</p>

            <div>
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="item-row"
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "10px",
                    alignItems: "center"
                  }}
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
    {
      isloading && <Loader2/>
    }
    </>
   
  );
};

export default Orders;