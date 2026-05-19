import React, { useEffect, useState } from 'react';

import axios from 'axios';

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

            alert(res.data.message);

            fetchOrders();

        })

        .catch((err) => {

            console.log(err);

        });
    }

    return (

        <div className="flex min-h-screen bg-gray-100">

            <AdminSidebar />

            <div className="flex-1 p-8">

                <h1 className="text-3xl font-bold mb-8">
                    Manage Orders
                </h1>

                <div className="flex flex-col gap-6">

                    {
                        orders.map((order) => (

                            <div
                                key={order._id}
                                className="bg-white p-6 rounded-xl shadow-md"
                            >

                                <div className="flex justify-between items-center mb-5">

                                    <div>

                                        <h2 className="font-bold text-lg">
                                            Order ID:
                                        </h2>

                                        <p className="text-gray-500 break-all">
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
                                            className="border p-2 rounded-md"
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

                                <div className="flex flex-col gap-5">

                                    {
                                        order.items.map((item, index) => (

                                            <div
                                                key={index}
                                                className="flex items-center gap-5 border rounded-lg p-4"
                                            >

                                                <img
                                                    src={item.image}
                                                    alt=""
                                                    className="w-24 h-24 object-cover rounded-md"
                                                />

                                                <div>

                                                    <h3 className="font-semibold text-lg">
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