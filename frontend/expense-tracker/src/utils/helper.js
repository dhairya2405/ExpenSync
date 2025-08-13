
import moment from "moment";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};


export const getInitials = (name) => {
    if (!name) return ""

    const words = name.split(" ")
    let initials = ""

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0];
    }
    return initials.toUpperCase();
}

export const addThousandsSeperator = (num) => {
    if (num == null || isNaN(num)) return ""

    const [integerPart, fractionalPart] = num.toString().split(".")
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
}


export const prepareExpenseBarChartData = (data) => {
    if (!Array.isArray(data)) return [];

    const today = new Date();
    const last30Days = new Date(today);
    last30Days.setDate(today.getDate() - 30);

    const filtered = data.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= last30Days && itemDate <= today;
    });

    const categoryTotals = {};

    filtered.forEach(item => {
        const category = item.category || "Other";
        if (!categoryTotals[category]) {
            categoryTotals[category] = 0;
        }
        categoryTotals[category] += item.amount;
    });

    return Object.keys(categoryTotals).map(cat => ({
        month: cat,
        amount: categoryTotals[cat],
        category: cat
    }));
};


export const prepareIncomeBarChartData = (data = []) => {
    const today = moment();
    const sixtyDaysAgo = moment().subtract(60, 'days');

    const filteredData = data.filter((item) => {
        const date = moment(item?.date);
        return date.isSameOrAfter(sixtyDaysAgo) && date.isSameOrBefore(today);
    });

    const sortedData = filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format("Do MMM"),
        amount: item?.amount,
        source: item?.source,
    }));

    return chartData;
};

export const prepareExpenseLineChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
    return sortedData.map(item => ({
        month: moment(item?.date).format("DD MMM"),
        amount: item?.amount || 0,
        category: item?.category || "",
    }));
};