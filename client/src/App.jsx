import React from "react";
import Home from "./pages/Home";
import { Route,Routes } from "react-router-dom";
import Products from "./pages/Products";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Dashboard from "./pages/admin/Dashboard"
import ManageProducts from "./pages/admin/ManageProducts";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import ManageOrders from "./pages/admin/ManageOrders";
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
        <Route path="/admin/*" element={<Dashboard/>} />
        <Route path="/admin/products" element={<ManageProducts />} />
        <Route path="/admin/add-product" element={<AddProduct/>} />
        <Route path="/admin/edit-product/:id" element={<EditProduct/>} />
        <Route path="/admin/orders" element={<ManageOrders/>} />
      </Routes>
      
    </>
  );
};

export default App;