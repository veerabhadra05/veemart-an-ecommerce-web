import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { useParams, useNavigate } from 'react-router-dom';

import API_URL from '../../api';
import AdminSidebar from '../../components/AdminSidebar';

const EditProduct = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    if(!user || user.role !== "admin") {
        window.location.href = "/login";
    }

    const [formData, setFormData] = useState({

        name: "",
        image: "",
        price: "",
        description: "",
        stock: "",
        category: ""

    });

    useEffect(() => {

        fetchProduct();

    }, []);

    function fetchProduct() {

        axios.get(`${API_URL}/products/${id}`)

            .then((res) => {

                setFormData({

                    name: res.data.title,
                    image: res.data.image,
                    price: res.data.price,
                    description: res.data.description,
                    stock: res.data.stock,
                    category: res.data.category || ""

                });

            })

            .catch((err) => {

                console.log(err);

            });
    }

    function handleChange(e) {

        const { name, value } = e.target;

        setFormData({

            ...formData,
            [name]: value

        });
    }

    function handleSubmit(e) {

        e.preventDefault();

        axios.put(`${API_URL}/admin/product/${id}`, formData)

            .then((res) => {

                alert(res.data.message);

                navigate('/admin/products');

            })

            .catch((err) => {

                console.log(err);

                alert("Update failed");

            });
    }

    return (

        <div className="flex min-h-screen bg-gray-100">

            <AdminSidebar />

            <div className="flex-1 p-8">

                <h1 className="text-3xl font-bold mb-8">
                    Edit Product
                </h1>

                <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl">

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5"
                    >

                        <input
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border p-3 rounded-md"
                            required
                        />

                        <input
                            type="text"
                            name="image"
                            placeholder="Image URL"
                            value={formData.image}
                            onChange={handleChange}
                            className="border p-3 rounded-md"
                            required
                        />

                        <img
                            src={formData.image}
                            alt=""
                            className="w-40 h-40 object-cover rounded-md border"
                        />

                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                            className="border p-3 rounded-md"
                            required
                        />

                        <input
                            type="number"
                            name="stock"
                            placeholder="Stock"
                            value={formData.stock}
                            onChange={handleChange}
                            className="border p-3 rounded-md"
                            required
                        />

                        <input
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={formData.category}
                            onChange={handleChange}
                            className="border p-3 rounded-md"
                            required
                        />

                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="5"
                            className="border p-3 rounded-md"
                            required
                        />

                        <button
                            type="submit"
                            className="bg-black text-white py-3 rounded-md hover:bg-gray-800"
                        >
                            Update Product
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default EditProduct;