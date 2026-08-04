import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import API_URL from "../api";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { FaEdit, FaTrash } from "react-icons/fa";
import loadRazorpay from "../utils/loadRazorpay";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [isloading, setIsloading] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
const [editingAddressId, setEditingAddressId] = useState(null)
  const [addressForm,setAddressForm] = useState({
      full_name: "",
      mobile: "",
      house: "",
      area: "",
      city: "",
      state: "",
      pincode: ""
    })
  const [addresses, setAddresses] = useState([])
  const [selectedAddressId, setSelectedAddressId] = useState("")
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const user = JSON.parse(localStorage.getItem("user"));

  function fetchAddresses() {
    axios.get(`${API_URL}/user-address/${user._id}`)
      .then((res) => {
        setAddresses(res.data)

        if (res.data.length > 0) {
          setSelectedAddressId(res.data[0].id)
          setSelectedAddress(res.data[0])
        }else {
          setSelectedAddress(null)
          setSelectedAddressId("")
        }
      })
  }

  async function handleAddAddress(e){
   e.preventDefault()

  try{
     const res = await axios.post(
      `${API_URL}/add-address`,
      {
        user_id:user._id,
        ...addressForm
      }
   )
   setAddressForm({
  full_name: "",
  mobile: "",
  house: "",
  area: "",
  city: "",
  state: "",
  pincode: ""
})

   fetchAddresses()
   setShowModal(false)
  }
  catch(err){
    console.log(err)
   toast.error("Failed to add address")
  }
}

function handleEditAddress() {
  if (!selectedAddress) return

  setAddressForm({
    full_name: selectedAddress.full_name,
    mobile: selectedAddress.mobile,
    house: selectedAddress.house,
    area: selectedAddress.area,
    city: selectedAddress.city,
    state: selectedAddress.state,
    pincode: selectedAddress.pincode
  })

  setEditingAddressId(selectedAddress.id)
  setIsEditMode(true)
  setShowModal(true)
}

async function handleUpdateAddress(e){
  e.preventDefault()

  try{
    await axios.put(`${API_URL}/edit-address`, {
      user_id: user._id,
      address_id: editingAddressId,
      ...addressForm
    })

    toast.success("Address updated")

    fetchAddresses()
    setShowModal(false)
    setIsEditMode(false)
    setEditingAddressId(null)
  }
  catch(err){
    console.log(err)
    toast.error("Update failed")
  }
}

async function handleDeleteAddress(addressId){
  const confirmDelete = window.confirm('Confirm to delete address ?')
  if(confirmDelete){
  try{
    await axios.delete(
      `${API_URL}/delete-address/${user._id}/${addressId}`
    )

    fetchAddresses()
    toast.success("Address deleted")
  }
  catch(err){
    console.log(err)
  }
}
}

    function handleAddressChange(e){
   const {name, value} = e.target

    setAddressForm(prev => ({
        ...prev,
        [name]: value
    }))
  }

  function fetchCart() {
    if (!user) return;
    setIsloading(true)

    axios.get(`${API_URL}/cart/${user._id}`)
      .then((res) => {
        setIsloading(false)
        setCart(res.data);
      })
      .catch((err) => {
        setIsloading(false)
        console.log(err)
      });
  }

  useEffect(() => {
    fetchCart();
    fetchAddresses();
  }, []);

  //  REMOVE ITEM
  function handleRemove(id) {
    setIsloading(true)
    const confirmDelete = window.confirm('Confirm to delete ?')
    if(confirmDelete){
      axios.delete(`${API_URL}/cart/${id}`)
      .then(() => {
        fetchCart();
      })
      .catch((err) => console.log(err));
    }
    else{
      setIsloading(false)
    }
  }

  //  PLACE ORDER
  async function handleOrder() {
    try {
      setIsloading(true)
      const orderResponse = await axios.post(
        `${API_URL}/create-razorpay-order`,
        {
          user_id: user._id
        }
      );

      const order = orderResponse.data;

      const loaded = await loadRazorpay();

      if (!loaded) {
          toast.error("Unable to load Razorpay.");
          return;
      }

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
                response.razorpay_signature,

                delivery_address: selectedAddress
            }
          );

          if (verify.data.success) {
            setIsloading(false)
            toast.success("Payment Successful");
            fetchCart();
          } else {
            setIsloading(false)
            toast.error("Verification Failed");
          }

          fetchCart();
        },

        theme: {
          color: "#3399cc"
        },

        modal: {
          ondismiss: function () {
            setIsloading(false);
            toast.info("Payment cancelled");
          }
        }
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.open();

    } catch (error) {
      setIsloading(false)
      console.log(error);
      toast.error("Payment Failed");

    }
    finally {
      setIsloading(false)
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

      <div className="cart-layout">
        <div className="cart-page cart-left">
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
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      padding: '2px 5px',
                      borderRadius: "5px",
                      fontWeight: 'bolder',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleRemove(item.id)}>
                    Remove
                  </button>
                </div>
              ))}

              <h2>Total: ₹{total}</h2>

              <button
                onClick={()=>{
                  selectedAddress !== null ?
                  handleOrder() : alert('Select Address to place order !')
                }}
                className="btn btn-primary"
                style={{
                  padding: "10px 20px",
                  marginTop: "10px",
                  background: "green",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: '10px'
                }}
              >
                Place Order
              </button>
            </>
          )}
        </div>

        <div className="cart-right">
          { addresses.length > 0 ?
            (<select className="address-select"
            value={selectedAddressId}
            onChange={(e) => {
              setSelectedAddressId(e.target.value)

              const addr = addresses.find(
                a => a.id === e.target.value
              )

              setSelectedAddress(addr)
            }}
          > <option disabled>Select Address</option>
            {addresses.map(addr => (
              <option key={addr.id} value={addr.id}>
                {addr.full_name} - {addr.city}
              </option>
            ))}
          </select>) : 
          ( <p>No address found</p> )
          }

          {selectedAddress && (
          <div className="address-card">
            <p>{selectedAddress.full_name}</p>
            <p>{selectedAddress.mobile}</p>
            <p>{selectedAddress.house}</p>
            <p>{selectedAddress.area}</p>
            <p>{selectedAddress.city}</p>
            <p>{selectedAddress.state}</p>
            <p>{selectedAddress.pincode}</p>

            <div className="dlt-edit-btns">
              <button
              className="delete-btn"
              onClick={() => handleDeleteAddress(selectedAddress.id)}
            >
              <FaTrash/>
            </button>
            <button
              className="edit-btn"
              onClick={() => handleEditAddress(selectedAddress.id)}
            >
              <FaEdit/>
            </button>
            </div>
          </div>
          
        )}  
          <button onClick={()=>setShowModal(true)} className="add-address-btn">
            Add Address
          </button>
        
        </div>

        

      </div>

        {showModal && (
    <div className="address-overlay overlay">
    <div className="address-modal">
      <button className="address-cls-btn"
          type="button"
          onClick={() => {
            setShowModal(false)
            setIsEditMode(false)
            setEditingAddressId(null)

            setAddressForm({
              full_name:"",
              mobile:"",
              house:"",
              area:"",
              city:"",
              state:"",
              pincode:""
            })
          }}
        >
          X
        </button>
    <form onSubmit={isEditMode ? handleUpdateAddress : handleAddAddress} className="address-form">
        <input 
        name="full_name"
        placeholder="Full Name"
        value={addressForm.full_name}
        onChange={handleAddressChange}
        required/>

        <input 
        name="mobile"
        value={addressForm.mobile}
        onChange={handleAddressChange}
        placeholder="Mobile"
        required/>

        <input 
        name="house"
        value={addressForm.house}
        onChange={handleAddressChange}
        placeholder="House No"
        required/>

        <input 
        name="area"
        value={addressForm.area}
        onChange={handleAddressChange}
        placeholder="Area"
        required/>

        <input 
        name="city"
        value={addressForm.city}
        onChange={handleAddressChange}
        placeholder="City"
        required/>

        <input 
        name="state"
        value={addressForm.state}
        onChange={handleAddressChange}
        placeholder="State"
        required/>

        <input 
        name="pincode"
        value={addressForm.pincode}
        onChange={handleAddressChange}
        placeholder="Pincode"
        required/>
      <button> {isEditMode ? "Update" : "Add"}</button>
      
    </form>
  </div>
  </div>
)}

      {isloading &&
        <Loader />
      }
    </>
  );
};

export default Cart;