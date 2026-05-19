import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {

    const navigate = useNavigate();

    function handleLogout() {

        localStorage.removeItem("user");

        navigate('/login');
    }

    return (

        <div className="w-64 min-h-screen bg-gray-900 text-white p-5">

            <h1 className="text-2xl font-bold mb-10">
                Admin Panel
            </h1>

            <div className="flex flex-col gap-5">

                <Link to="/admin">
                    Dashboard
                </Link>

                <Link to="/admin/products">
                    Products
                </Link>

                <Link to="/admin/add-product">
                    Add Product
                </Link>

                <Link to="/admin/orders">
                    Orders
                </Link>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 px-4 py-2 rounded-md mt-5"
                >
                    Logout
                </button>

            </div>

        </div>
    );
};

export default AdminSidebar;