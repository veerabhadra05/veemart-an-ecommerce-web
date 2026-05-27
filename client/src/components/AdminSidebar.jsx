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

    const linkClass =
        "flex items-center gap-3 px-4 py-3 rounded-xl transition text-gray-300 hover:bg-white/10 hover:text-white";

    const activeClass =
        "bg-white text-black font-semibold";

    return (

        <div className="w-[260px] min-h-screen bg-[#111827] text-white p-6 flex flex-col">

            <div className="mb-10">

                <h1 className="text-3xl font-bold">
                    VeeMart
                </h1>

                <p className="text-gray-400 text-sm mt-1">
                    Admin Panel
                </p>

            </div>

            <div className="flex flex-col gap-3">

                <NavLink
                    to="/admin"
                    end
                    className={({ isActive }) =>
                        `${linkClass} ${isActive ? activeClass : ""}`
                    }
                >
                    <FaHome />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/admin/products"
                    className={({ isActive }) =>
                        `${linkClass} ${isActive ? activeClass : ""}`
                    }
                >
                    <FaBox />
                    Products
                </NavLink>

                <NavLink
                    to="/admin/add-product"
                    className={({ isActive }) =>
                        `${linkClass} ${isActive ? activeClass : ""}`
                    }
                >
                    <FaPlus />
                    Add Product
                </NavLink>

                <NavLink
                    to="/admin/orders"
                    className={({ isActive }) =>
                        `${linkClass} ${isActive ? activeClass : ""}`
                    }
                >
                    <FaShoppingCart />
                    Orders
                </NavLink>

            </div>

            <button
                onClick={handleLogout}
                className="mt-auto bg-red-500 hover:bg-red-600 py-3 rounded-xl flex items-center justify-center gap-2 transition"
            >
                <FaSignOutAlt />
                Logout
            </button>

        </div>
    );
};

export default AdminSidebar;