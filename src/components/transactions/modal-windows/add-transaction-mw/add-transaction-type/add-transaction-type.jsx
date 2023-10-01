import React from 'react'

import './add-transaction-type.css'

const AddTransactionType = ({transactionObj, setTransactionObj}) => {

    const transactionTypes = [
        {id: 'expense', label: 'Expense'},
        {id: 'income', label: 'Income'},
        {id: 'transfer', label: 'Transfer'},
    ]

    const selectType = type => {
        setTransactionObj(prev => {
            const futureObject = {}
            for (const key in prev) if (key !== 'category' && key !== 'transferCard') futureObject[key] = transactionObj[key]
            futureObject.type = type.id
            return futureObject
        })
    }

    return (
        <div className='add-transaction-type'>
            {transactionTypes.map(type => (
                <div
                    key={type.id}
                    className={`transaction-type ${type.id === transactionObj.type ? 'transaction-type-active' : ''}`}
                    onClick={() => selectType(type)}
                >{type.label}</div>
            ))}
        </div>
    )
}

export default AddTransactionType