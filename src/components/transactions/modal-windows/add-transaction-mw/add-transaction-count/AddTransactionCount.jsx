import React from 'react'

import {useAddTransactionContext} from '../AddTransactionProvider'

import './add-transaction-count.css'

const AddTransactionCount = () => {

    const {newTransaction, refs} = useAddTransactionContext()

    const getColor = () => {
        const {transactionType} = newTransaction[0]
        const colorLogic = {
            expense: () => '#ee3a3a',
            income: () => '#24e597',
            transfer: () => '#f5d544',
        }
        return colorLogic[transactionType]()
    }

    return (
        <div className={'add-transaction-count'} ref={refs.count}>
            <div className={'add-transaction-count-value'}>
                <div style={{color: getColor()}} className={'add-transaction-count-currency'}>USD</div>
                <div style={{color: getColor()}} className={'add-transaction-count-now-value'}>{newTransaction[0].count}</div>
            </div>
        </div>
    )
}

export default AddTransactionCount