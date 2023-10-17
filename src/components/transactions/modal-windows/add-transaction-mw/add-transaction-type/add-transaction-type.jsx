import React from 'react'

import {useAddTransactionContext} from '../AddTransactionProvider'

import './add-transaction-type.css'

const AddTransactionType = () => {

    const {newTransaction} = useAddTransactionContext()

    const transactionTypes = [
        {id: 'expense', label: 'Expense'},
        {id: 'income', label: 'Income'},
        {id: 'transfer', label: 'Transfer'},
    ]

    const selectType = type => {
        newTransaction[1](prev => {
            const futureObject = {}
            for (const key in prev) if (key !== 'category' && key !== 'subCategory' && key !== 'transferCard') futureObject[key] = prev[key]
            futureObject.transactionType = type.id
            return futureObject
        })
    }

    return (
        <div className='add-transaction-type'>
            {transactionTypes.map(type => (
                <div
                    key={type.id}
                    className={`transaction-type ${type.id === newTransaction[0].transactionType ? 'transaction-type-active' : ''}`}
                    onClick={() => selectType(type)}
                >{type.label}</div>
            ))}
        </div>
    )
}

export default AddTransactionType