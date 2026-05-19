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

        <div className="flex bg-gray-100 min-h-screen">

            <AdminSidebar />

            <div className="flex-1 p-8">

                <h1 className="text-3xl font-bold mb-8">
                    Dashboard
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <DashboardCard
                        title="Total Products"
                        value={stats.products}
                    />

                    <DashboardCard
                        title="Total Orders"
                        value={stats.orders}
                    />

                    <DashboardCard
                        title="Total Users"
                        value={stats.users}
                    />

                </div>

            </div>

        </div>
    );
};

export default Dashboard;