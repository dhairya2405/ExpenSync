
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ['#875CF5', '#FA2C37', '#FF6900', '#4f39f6'];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
    const [chartData, setChartData] = useState([]);

    const preparedChartData = () => {
        const today = moment();
        const sixtyDaysAgo = moment().subtract(60, 'days');

        // Filter only last 60 days income
        const filtered = data?.filter((item) => {
            const date = moment(item?.date);
            return date.isSameOrAfter(sixtyDaysAgo) && date.isSameOrBefore(today);
        });

        // Group by income source and sum their amounts
        const grouped = {};
        filtered?.forEach((item) => {
            const source = item.source || 'Other';
            if (!grouped[source]) {
                grouped[source] = 0;
            }
            grouped[source] += item.amount;
        });

        // Convert to pie chart format
        const dataArr = Object.keys(grouped).map((key) => ({
            name: key,
            amount: grouped[key],
        }));

        setChartData(dataArr);
    };

    useEffect(() => {
        preparedChartData();
    }, [data]);

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold text-gray-800">Last 60 Days Income</h5>
            </div>

            {chartData.length > 0 ? (
                <CustomPieChart
                    data={chartData}
                    label="Total Income"
                    totalAmount={`$${totalIncome}`}
                    showTextAnchor
                    colors={COLORS}
                />
            ) : (
                <p className="text-sm text-gray-500 text-center py-8">
                    No income recorded in the last 60 days.
                </p>
            )}
        </div>
    );
};

export default RecentIncomeWithChart;
