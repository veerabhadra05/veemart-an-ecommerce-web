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
        <div className="admin-layout">

    <AdminSidebar />

    <div className="main-content">

        <div className="">

            <h1 className="page-title">
                Dashboard
            </h1>

            <p className="subtitle">
                Manage your ecommerce store
            </p>

        </div>

        <div className="dashboard-grid">

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