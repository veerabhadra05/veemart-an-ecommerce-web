import React from 'react';

const DashboardCard = ({ title, value, icon }) => {

    return (

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-gray-500 text-sm">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold mt-2 text-gray-800">
                        {value}
                    </h2>

                </div>

                <div className="text-4xl">
                    {icon}
                </div>

            </div>

        </div>
    );
};

export default DashboardCard;