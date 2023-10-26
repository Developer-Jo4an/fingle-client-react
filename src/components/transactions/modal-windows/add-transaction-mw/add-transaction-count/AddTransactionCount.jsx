import React from 'react'

import {useAddTransactionContext} from '../AddTransactionProvider'

import './add-transaction-count.css'

const AddTransactionCount = () => {

    const {newTransaction, refs, result} = useAddTransactionContext()
    const [futureTransaction] = newTransaction

    const getColor = () => {
        const {transactionType} = futureTransaction
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
                <div style={{color: getColor()}} className={'add-transaction-count-now-value'}>{result[0]}</div>
            </div>
        </div>
    )
}

export default AddTransactionCount