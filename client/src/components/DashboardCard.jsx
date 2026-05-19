import React from 'react';

const DashboardCard = ({ title, value }) => {

    return (

        <div className="bg-white shadow-md rounded-xl p-6 w-full">

            <h2 className="text-gray-500 text-lg">
                {title}
            </h2>

            <p className="text-3xl font-bold mt-2">
                {value}
            </p>

        </div>
    );
};

export default DashboardCard;