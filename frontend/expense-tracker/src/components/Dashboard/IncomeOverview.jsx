import React, { useMemo } from 'react';
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#00C49F", "#FFBB28", "#0088FE"]

const IncomeOverview = ({ totalIncome, incomeTransactions }) => {
    const balanceData = useMemo(() => {
        if (incomeTransactions && incomeTransactions.length > 0) {
            return incomeTransactions.map((txn, idx) => ({
                name: txn.source || txn.category || `Income ${idx + 1}`,
                amount: Number(txn.amount || 0),
            }))
        }
        return [{ name: "Total Income", amount: totalIncome }]
    }, [incomeTransactions, totalIncome])
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold text-gray-800">Income Overview</h5>
            </div>

            <CustomPieChart
                data={balanceData}
                label="Total Income"
                totalAmount={`₹${totalIncome}`}
                colors={COLORS}
                showTextAnchor
            />
        </div>
    );

}

export default IncomeOverview
