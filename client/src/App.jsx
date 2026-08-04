import { React, lazy, Suspense } from "react";
import { Route,Routes } from "react-router-dom";
import Loader from "./components/Loader";
import Home from "./pages/Home";
const Products = lazy(() => import("./pages/Products"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Orders = lazy(() => import("./pages/Orders"));
const Cart = lazy(() => import("./pages/Cart"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const ManageProducts = lazy(() => import("./pages/admin/ManageProducts"));
const AddProduct = lazy(() => import("./pages/admin/AddProduct"));
const EditProduct = lazy(() => import("./pages/admin/EditProduct"));
const ManageOrders = lazy(() => import("./pages/admin/ManageOrders"));
const App = () => {
  return (
    <>
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/products/category/:category" element={<Products/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/admin/*" element={<Dashboard/>} />
          <Route path="/admin/products" element={<ManageProducts />} />
          <Route path="/admin/add-product" element={<AddProduct/>} />
          <Route path="/admin/edit-product/:id" element={<EditProduct/>} />
          <Route path="/admin/orders" element={<ManageOrders/>} />
        </Routes>
      </Suspense>
      
    </>
  );
};

export default App;