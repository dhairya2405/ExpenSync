
import React, { useMemo, useState } from 'react';
import moment from 'moment';
import { LuDownload } from 'react-icons/lu';
import TransactionCard from '../Cards/TransactionInfoCard';

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const categories = useMemo(() => Array.from(new Set(transactions?.map(t => t.category) || [])), [transactions])

  const filtered = useMemo(() => {
    return (transactions || []).filter((t) => {
      const matchesQuery = String(t.category || '').toLowerCase().includes(query.toLowerCase())
        || String(t.amount || '').includes(query)
        || moment(t.date).format('YYYY-MM-DD').includes(query)
      const matchesCategory = !category || t.category === category
      const afterFrom = !from || moment(t.date).isSameOrAfter(moment(from))
      const beforeTo = !to || moment(t.date).isSameOrBefore(moment(to))
      return matchesQuery && matchesCategory && afterFrom && beforeTo
    })
  }, [transactions, query, category, from, to])
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">All Expenses</h5>
        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" />
          Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4">
        <input className='input-box w-full px-3 py-2 border border-gray-300 rounded-md' placeholder='Search by text/amount/date'
          value={query} onChange={(e) => setQuery(e.target.value)} />
        <select className='input-box w-full px-3 py-2 border border-gray-300 rounded-md' value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value=''>All Categories</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input type='date' className='input-box w-full px-3 py-2 border border-gray-300 rounded-md' value={from} onChange={(e) => setFrom(e.target.value)} />
        <input type='date' className='input-box w-full px-3 py-2 border border-gray-300 rounded-md' value={to} onChange={(e) => setTo(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 mt-4 space-y-3">
        {filtered?.map((expense) => (
          <TransactionCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format('DD MMM YYYY')}
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
