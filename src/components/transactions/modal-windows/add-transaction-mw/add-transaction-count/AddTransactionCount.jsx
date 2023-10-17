import React, {useRef} from 'react'

import {useAddTransactionContext} from '../AddTransactionProvider'

import './add-transaction-count.css'

const AddTransactionCount = () => {

    const {newTransaction, refs} = useAddTransactionContext()

    return (
        <div className={'add-transaction-count'} ref={refs.count}>
            <div className={'add-transaction-count-value'}>
                <div className={'add-transaction-count-currency'}>USD</div>
                <div className={'add-transaction-count-now-value'}>{newTransaction[0].count}</div>
            </div>
        </div>
    )
}

export default AddTransactionCount