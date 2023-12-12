import React from 'react'

import { useAddTransactionContext } from '../AddTransactionProvider'

import './add-transaction-type.css'

const AddTransactionType = () => {

    const { newTransaction } = useAddTransactionContext()
    const [futureTransaction, dispatch] = newTransaction
    const transactionTypes = [
        { id: 'expense', label: 'Expense' },
        { id: 'income', label: 'Income' },
        { id: 'transfer', label: 'Transfer' },
    ]

    const selectType = type => dispatch({ type: 'type', trType: type.id })

    return (
        <div className='add-transaction-type'>
            {transactionTypes.map(type => (
                <div
                    key={type.id}
                    className={`transaction-type ${type.id === futureTransaction.transactionType ? 'transaction-type-active' : ''}`}
                    onClick={() => selectType(type)}
                >{ type.label }</div>
            ))}
        </div>
    )
}

export default AddTransactionType