import React, { useEffect, useState } from 'react';
import axios from 'axios';

import API_URL from '../../api';
import AdminSidebar from '../../components/AdminSidebar';
import DashboardCard from '../../components/DashboardCard';

const Dashboard = () => {

    const [stats, setStats] = useState({
        products: 0,
        orders: 0,
        users: 0
    });
    const user = JSON.parse(localStorage.getItem("user"));

    if(!user || user.role !== "admin") {
    window.location.href = "/login";
}

    useEffect(() => {

        axios.get(`${API_URL}/admin/stats`)

            .then((res) => {

                setStats(res.data);

            })

            .catch((err) => {

                console.log(err);

            });

    }, []);

    return (
        <div className="flex min-h-screen bg-[#f5f7fb]">

    <AdminSidebar />

    <div className="flex-1 p-10">

        <div className="mb-10">

            <h1 className="text-4xl font-bold text-gray-800">
                Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
                Manage your ecommerce store
            </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <DashboardCard
                title="Total Products"
                value={stats.products}
                icon="📦"
            />

            <DashboardCard
                title="Total Orders"
                value={stats.orders}
                icon="🛒"
            />

            <DashboardCard
                title="Total Users"
                value={stats.users}
                icon="👤"
            />

        </div>

    </div>

</div>
    );
};

export default Dashboard;