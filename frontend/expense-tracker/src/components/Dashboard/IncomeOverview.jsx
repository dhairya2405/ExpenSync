import React from 'react';
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"]

const IncomeOverview = ({ totalIncome }) => {
    const balanceData = [
        { name: "Total Income", amount: totalIncome },
    ]
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold text-gray-800">Financial Overview</h5>
            </div>

            <CustomPieChart
                data={balanceData}
                label="Total Income"
                totalAmount={`$${totalIncome}`}
                colors={COLORS}
                showTextAnchor
            />
        </div>
    );

}

export default IncomeOverview
