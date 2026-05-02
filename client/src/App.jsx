import React from "react";
import Home from "./pages/Home";
import { Route,Routes } from "react-router-dom";
import Products from "./pages/Products";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>
      
    </>
  );
};

export default App;