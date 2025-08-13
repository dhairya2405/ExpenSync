import React, { useEffect, useState } from 'react';
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

const Last30DaysExpenses = ({ data }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseBarChartData(data);
        setChartData(result);
    }, [data]);

    return (
        <div className="card col-span-1">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-lg font-semibold text-gray-800">Last 30 Days Expenses</h5>
            </div>

            {chartData && chartData.length > 0 ? (
                <CustomBarChart data={chartData} />
            ) : (
                <p className="text-sm text-gray-500 text-center py-8">
                    No expenses recorded in the last 30 days.
                </p>
            )}
        </div>
    );
};

export default Last30DaysExpenses;
