import React from "react";
import Home from "./pages/Home";
import { Route,Routes } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import Products from "./pages/Products";
import Register from "./pages/Register";
import Login from "./pages/Login";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/addproduct" element={<AddProduct/>} />
        <Route path="/products" element={<Products/>} />
      </Routes>
      
    </>
  );
};

export default App;