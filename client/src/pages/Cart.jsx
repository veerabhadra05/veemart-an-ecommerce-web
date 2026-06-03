import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import API_URL from "../api";
import { toast } from "react-toastify";

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

  //  REMOVE ITEM
  function handleRemove(id) {
    axios.delete(`${API_URL}/cart/${id}`)
      .then(() => {
        fetchCart();
      })
      .catch((err) => console.log(err));
  }

  //  PLACE ORDER
async function handleOrder() {
  try {

    const orderResponse = await axios.post(
      `${API_URL}/create-razorpay-order`,
      {
        user_id : user._id
      }
    );

    const order = orderResponse.data;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,

      amount: order.amount,

      currency: order.currency,

      order_id: order.id,

      name: "VeeMart",

      description: "Product Purchase",

      handler: async function (response) {

        const verify = await axios.post(
          `${API_URL}/verify-payment`,
          {
            user_id: user._id,

            razorpay_order_id:
              response.razorpay_order_id,

            razorpay_payment_id:
              response.razorpay_payment_id,

            razorpay_signature:
              response.razorpay_signature
          }
        );

        toast.success("Payment Successful");

        fetchCart();
      },

      theme: {
        color: "#3399cc"
      }
    };

    const razorpay =
      new window.Razorpay(options);

    razorpay.open();

  } catch (error) {

    console.log(error);

    toast.error("Payment Failed");

  }
}

  //  TOTAL CALCULATION
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

                <div className="item-details">
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