import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../../api';
import AdminSidebar from '../../components/AdminSidebar';

const ManageProducts = () => {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
        window.location.href = "/login";
    }

    useEffect(() => {

        fetchProducts();

    }, []);

    function fetchProducts() {

        axios.get(`${API_URL}/products`)

            .then((res) => {

                setProducts(res.data);

            })

            .catch((err) => {

                console.log(err);

            });
    }

    function handleDelete(id) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (confirmDelete) {

            axios.delete(`${API_URL}/admin/product/${id}`)

                .then((res) => {

                    alert(res.data.message);

                    fetchProducts();

                })

                .catch((err) => {

                    console.log(err);

                });
        }
    }

    return (

        <div className="flex bg-gray-100 min-h-screen">

            <AdminSidebar />

            <div className="flex-1 p-8">

                <div className="flex justify-between items-center mb-8">

                    <h1 className="text-3xl font-bold">
                        Manage Products
                    </h1>

                </div>

                <div className="overflow-x-auto bg-white rounded-xl shadow-md">

                    <table className="w-full text-sm">

                        <thead className="bg-gray-200">

                            <tr>

                                <th className="p-4 text-left">
                                    Image
                                </th>

                                <th className="p-4 text-left">
                                    Name
                                </th>

                                <th className="p-4 text-left">
                                    Price
                                </th>

                                <th className="p-4 text-left">
                                    Stock
                                </th>

                                <th className="p-4 text-left">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                products.map((product) => (

                                    <tr
                                        key={product.id}
                                        className="border-b hover:bg-gray-50 transition"
                                    >

                                        <td className="p-4">

                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-16 h-16 object-cover rounded-lg border"
                                            />

                                        </td>

                                        <td className="p-4">
                                            {product.title}
                                        </td>

                                        <td className="p-4">
                                            ₹{product.price}
                                        </td>

                                        <td className="p-4">
                                            {product.stock}
                                        </td>

                                        <td className="p-4 flex gap-3">

                                            <button
                                                onClick={() => navigate(`/admin/edit-product/${product.id}`)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
};

export default ManageProducts;