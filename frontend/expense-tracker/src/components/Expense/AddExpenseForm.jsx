import React, { useState } from 'react'
import Input from '../Inputs/Input'
import EmojiPickerPopup from '../EmojiPickerPopup'

const AddExpenseForm = ({onAddExpense}) => {
    const [income,setIncome] = useState({
        category : "",
        amount: "",
        date : "",
        icon : "",
        isRecurring: false,
    })

    const handleChange = (key,value) => setIncome({...income,[key] : value})

    return <div>
        <EmojiPickerPopup icon={income.icon} onSelect={(selectedIcon) => handleChange("icon",selectedIcon)}/>
        <Input value={income.category} onChange={({target})=> handleChange("category",target.value)} label="Category" placeholder="Rent,Grocceries,etc" type="text"/>
        <Input value={income.amount} onChange={({target})=> handleChange("amount",target.value)} label="Amount" placeholder="" type="number"/>
        <Input value={income.date} onChange={({target})=> handleChange("date",target.value)} label="Date" placeholder="" type="date"/>
        <div className='flex items-center gap-2 my-2'>
            <input type='checkbox' checked={income.isRecurring} onChange={({target}) => handleChange('isRecurring', target.checked)} />
            <span className='text-sm text-gray-700'>Mark as recurring</span>
        </div>
        <div className='flex justify-end mt-6'>
            <button type='button' className='add-btn add-btn-fill' onClick={()=> onAddExpense(income)}>
                Add Expense
            </button>
        </div>
    </div>
}

export default AddExpenseForm
