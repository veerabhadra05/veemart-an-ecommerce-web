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

        <div className="admin-layout">
            <AdminSidebar />
            <div className="main-content">

                <div className="">
                    <h1 className="page-title">
                        Manage Products
                    </h1>
                </div>

                <div className="table-wrapper">
                    <table className="">

                        <thead className="">

                            <tr>

                                <th className="">
                                    Image
                                </th>

                                <th className="">
                                    Name
                                </th>

                                <th className="">
                                    Price
                                </th>

                                <th className="">
                                    Stock
                                </th>

                                <th className="">
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

                                        <td className="action-buttons">

                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                height={'100px'}
                                                width={'100px'}
                                                className="table-img"
                                            />

                                        </td>

                                        <td className="">
                                            {product.title}
                                        </td>

                                        <td className="">
                                            ₹{product.price}
                                        </td>

                                        <td className="">
                                            {product.stock}
                                        </td>

                                        <td className="action-buttons">

                                            <button
                                                onClick={() => navigate(`/admin/edit-product/${product.id}`)}
                                                className="edit-btn"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="delete-btn"
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