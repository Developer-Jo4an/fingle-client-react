import React from 'react'
import {useTransactionsContext} from '../../../transactions/TransactionsProvider'

import './modified-transaction-type.css'

const ModifiedTransactionType = () => {

    const {modifiedTransaction} = useTransactionsContext()

    if (!modifiedTransaction[0]) return null

    const {transactionType} = modifiedTransaction[0]
    const getValue = () => transactionType.slice(0, 1).toUpperCase() + transactionType.slice(1)
    return (
        <div className={'modified-transaction-type'}>
            <div className={'modified-option-type-name'}>Type</div>
            <div className={'modified-option-type-value'}>{getValue()}</div>
        </div>
    )
}

export default ModifiedTransactionType