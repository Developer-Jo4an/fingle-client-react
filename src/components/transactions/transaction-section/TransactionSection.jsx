import React from 'react'
import Transaction from '../transaction/Transaction'

import {useAppContext} from '../../../AppProvider'
import {chunkTransactions} from '../../../my-functions/my-functions'

import './transaction-section.css'

const TransactionSection = () => {

    const {transactions} = useAppContext()

    return (
        <section className={'transaction-section'}>
            {Object.entries(chunkTransactions(transactions[0])).map(chunk =>
            chunk.length &&
            <div key={chunk[0]} className={'transaction-chunk'}>
                <div className={'transaction-chunk-header'}>{chunk[0]}</div>
                {chunk[1].map(transaction => (<Transaction key={transaction._id} transaction={transaction}/>))}
            </div>
            )}
        </section>
    )
}

export default TransactionSection