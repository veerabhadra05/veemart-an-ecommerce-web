import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API_URL from '../../api';
import AdminSidebar from '../../components/AdminSidebar';
import Loader2 from '../../components/Loader2';

const EditProduct = () => {

    const { id } = useParams();
    const [categories, setCategories] = useState([])
    const navigate = useNavigate();
    const [isloading, setIsloading] = useState(false)

    const user = JSON.parse(localStorage.getItem("user"));

    if(!user || user.role !== "admin") {
        window.location.href = "/login";
    }

    function fetchCategories(){
        axios.get(`${API_URL}/categories`)
        .then((res)=>{
            setCategories(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
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
        fetchCategories();

    }, []);

    function fetchProduct() {
        setIsloading(true)
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
            })
            .finally(()=>{
                setIsloading(false)
            })
            
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleSubmit(e) {
        setIsloading(true)
        e.preventDefault();
        axios.put(`${API_URL}/admin/product/${id}`, formData)
            .then((res) => {
                toast.success(res.data.message);
                navigate('/admin/products');
            })

            .catch((err) => {
                console.log(err);
                toast.error('Update failed')
            })
            .finally(()=>setIsloading(false))
    }

    return (

        <div className="admin-layout">

            <AdminSidebar />
            <div className="main-content">

                <h1 className="page-title">
                    Edit Product
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

                        { formData.image &&
                            <img
                            src={formData.image}
                            alt=""
                            height={'100px'}
                            width={'100px'}
                            className="preview-img"
                        />
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

                        <select value={formData.category} onChange={handleChange} name='category' required>
                            <option value='' disabled>select category..</option>
                            {
                                categories.map((category)=>(
                                    <option key={category.id} value={category.name}>{category.name}</option>
                                ))
                            }
                        </select>

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
                            Update Product
                        </button>

                    </form>

                </div>

            </div>
            {
                isloading && <Loader2/>
            }

        </div>
    );
};

export default EditProduct;