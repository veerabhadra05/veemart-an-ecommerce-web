import React from 'react';

import {
    FaBox,
    FaShoppingCart,
    FaPlus,
    FaHome,
    FaSignOutAlt
} from "react-icons/fa";

import { NavLink, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {

    const navigate = useNavigate();
    function handleLogout() {
        localStorage.removeItem("user");
        navigate("/login");
    }

    return (

        <div className="sidebar">

            <div className="header">

                <h1 className="title">
                    Vee<span>Mart</span>
                </h1>
                <p className="title">
                    Admin Panel
                </p>

            </div>

            <div className="links">

                <NavLink
                    to="/admin"
                    end
                    className="link"
                >
                    <FaHome />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/admin/products"
                    className="link"
                >
                    <FaBox />
                    Products
                </NavLink>

                <NavLink
                    to="/admin/add-product"
                    className="link"
                >
                    <FaPlus />
                    Add Product
                </NavLink>

                <NavLink
                    to="/admin/orders"
                    className="link"
                >
                    <FaShoppingCart />
                    Orders
                </NavLink>

            </div>

            <button
                onClick={handleLogout}
                className="logout"
            >
                <FaSignOutAlt />
                Logout
            </button>

        </div>
    );
};

export default AdminSidebar;