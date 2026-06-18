import React from 'react';

const DashboardCard = ({ title, value, icon }) => {

    return (

        <div className="dashboard-card">

            <div className="card-top">

                <div>

                    <p className="card-label">
                        {title}
                    </p>

                    <h2 className="card-value">
                        {value}
                    </h2>

                </div>

                <div className="card-icon">
                    {icon}
                </div>

            </div>

        </div>
    );
};

export default DashboardCard;