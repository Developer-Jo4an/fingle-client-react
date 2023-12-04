import React from 'react'

import {useTransactionsContext} from '../../../transactions/TransactionsProvider'

import './modified-close-btn.css'

const ModifiedCloseBtn = () => {

    const { transactionMWS } = useTransactionsContext()

    return (
        <div
            className={'modified-close-btn'}
            onClick={() => transactionMWS[1](false)}
        ><div className={'modified-close-btn-square'}></div>
        </div>
    )
}

export default ModifiedCloseBtn