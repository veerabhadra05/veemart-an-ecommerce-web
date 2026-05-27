import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import API_URL from "../api";

const Cart = () => {
  const [cart, setCart] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  function fetchCart() {
    if (!user) return;

    axios.get(`${API_URL}/cart/${user._id}`)
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ REMOVE ITEM
  function handleRemove(id) {
    axios.delete(`${API_URL}/cart/${id}`)
      .then(() => {
        fetchCart();
      })
      .catch((err) => console.log(err));
  }

  // ✅ PLACE ORDER
  function handleOrder() {
    axios.post(`${API_URL}/place-order`, {
    user_id: user._id,
})
      .then((res) => {
        alert(res.data.message);
        fetchCart();
      })
      .catch((err) => console.log(err));
  }

  // ✅ TOTAL CALCULATION
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!user) {
    return <h2 style={{ textAlign: "center" }}>Please login first</h2>;
  }

  return (
    <>
      <Nav />

      <div className="cart-page">
        <h1>Your Cart</h1>

        {cart.length === 0 ? (
          <h3>Cart is empty</h3>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="card item-row"
              >
                <img src={item.image} alt="" width="100" />

                <div>
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                  <p>Qty: {item.quantity}</p>
                </div>

                <button className="btn btn-danger"
                style={{backgroundColor:'red',
                  color:'white',
                  padding:'2px 5px',
                  borderRadius:"5px",
                  fontWeight:'bolder',
                  cursor:'pointer'
                }}
                onClick={() => handleRemove(item.id)}>
                  Remove
                </button>
              </div>
            ))}

            <h2>Total: ₹{total}</h2>

            <button
              onClick={handleOrder}
              className="btn btn-primary"
              style={{
                padding: "10px 20px",
                marginTop: "10px",
                background: "green",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius:'10px'
              }}
            >
              Place Order
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;