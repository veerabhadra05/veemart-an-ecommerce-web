import React, { useState } from 'react';

import axios from 'axios';

import API_URL from '../../api';
import AdminSidebar from '../../components/AdminSidebar';

const AddProduct = () => {

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

    const [preview, setPreview] = useState("");
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if(name === "image") {
            setPreview(value);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.post(`${API_URL}/admin/add-product`, formData)
            .then((res) => {
                alert(res.data.message);
                setFormData({
                    name: "",
                    image: "",
                    price: "",
                    description: "",
                    stock: "",
                    category: ""

                });

                setPreview("");

            })

            .catch((err) => {
                console.log(err);
                alert("Failed to add product");
            });
    }

    return (

        <div className="admin-layout">
            <AdminSidebar />
            <div className="main-content">
                <h1 className="page-title">
                    Add Product
                </h1>

                <div className="form-box">

                    <form
                        onSubmit={handleSubmit}
                        className="form-layout"
                    >

                        <input
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={formData.name}
                            onChange={handleChange}
                            className=""
                            required
                        />

                        <input
                            type="text"
                            name="image"
                            placeholder="Image URL"
                            value={formData.image}
                            onChange={handleChange}
                            className=""
                            required
                        />

                        {
                            preview && (

                                <img
                                    src={preview}
                                    alt="preview"
                                    className="preview-img"
                                />
                            )
                        }

                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                            className=""
                            required
                        />

                        <input
                            type="number"
                            name="stock"
                            placeholder="Stock"
                            value={formData.stock}
                            onChange={handleChange}
                            className=""
                            required
                        />

                        <input
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={formData.category}
                            onChange={handleChange}
                            className=""
                            required
                        />

                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="5"
                            className=""
                            required
                        />

                        <button
                            type="submit"
                            className="primary-btn"
                        >
                            Add Product
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default AddProduct;