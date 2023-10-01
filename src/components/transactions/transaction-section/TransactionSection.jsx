import React from 'react'
import TransactionsChunk from '../transactions-chuck/TransactionsChunk'
import AddTransaction from '../add-transaction/AddTransaction'
import Loader from '../../loader/Loader'

import './transaction-section.css'
const TransactionSection = ({transactions, setAddTransactionVisible}) => {
    return (
        <section className={'transaction-section'}>
            {transactions[0] && transactions[0] !== 'loader' ? transactions.map((chunk, i) =>
                <TransactionsChunk key={`${chunk[1][0]._id}${Math.random()}`} chunk={chunk} index={i}/>)
                : transactions[0] === 'loader' ? <Loader/>
                : <div className={'no-transactions'}>Transactions not found</div>
            }
            <AddTransaction setVisible={setAddTransactionVisible}/>
        </section>
    )
}

export default TransactionSection