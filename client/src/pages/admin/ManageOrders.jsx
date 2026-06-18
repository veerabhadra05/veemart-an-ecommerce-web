import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import API_URL from '../../api';
import AdminSidebar from '../../components/AdminSidebar';

const ManageOrders = () => {

    const [orders, setOrders] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    if(!user || user.role !== "admin") {
        window.location.href = "/login";
    }

    useEffect(() => {

        fetchOrders();

    }, []);

    function fetchOrders() {
        axios.get(`${API_URL}/admin/orders`)
           .then((res) => {
                setOrders(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleStatusChange(orderId, status) {
        axios.put(`${API_URL}/admin/order-status/${orderId}`, {
            status
        })
        .then((res) => {
            toast.info(res.data.message)
            fetchOrders();
        })

        .catch((err) => {
            console.log(err);
        });
    }

    return (

        <div className="admin-layout">
            <AdminSidebar />
            <div className="main-content">
                <h1 className="page-title">
                    Manage Orders
                </h1>

                <div className="">

                    {
                        orders.map((order) => (

                            <div
                                key={order._id}
                                className="orders-list"
                            >

                                <div className="order-card">

                                    <div>

                                        <h2 className="order-header">
                                            Order ID:
                                        </h2>

                                        <p className="">
                                            {order._id}
                                        </p>

                                    </div>

                                    <div>

                                        <select
                                            value={order.status}
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    order._id,
                                                    e.target.value
                                                )
                                            }
                                            className="status-select"
                                        >

                                            <option value="Pending">
                                                Pending
                                            </option>

                                            <option value="Confirmed">
                                                Confirmed
                                            </option>

                                            <option value="Shipped">
                                                Shipped
                                            </option>

                                            <option value="Delivered">
                                                Delivered
                                            </option>

                                            <option value="Cancelled">
                                                Cancelled
                                            </option>

                                        </select>

                                    </div>

                                </div>

                                <div className="order-items">

                                    {
                                        order.items.map((item, index) => (

                                            <div
                                                key={index}
                                                className="order-item"
                                            >

                                                <img
                                                    src={item.image}
                                                    alt=""
                                                    className="order-img"
                                                />

                                                <div>

                                                    <h3 className="">
                                                        {item.name}
                                                    </h3>

                                                    <p>
                                                        ₹{item.price}
                                                    </p>

                                                    <p>
                                                        Quantity: {item.quantity}
                                                    </p>

                                                </div>

                                            </div>
                                        ))
                                    }

                                </div>

                            </div>
                        ))
                    }

                </div>

            </div>

        </div>
    );
};

export default ManageOrders;