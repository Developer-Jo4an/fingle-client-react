import React, {useEffect, useState} from 'react'
import TransactionsChunk from '../transactions-chuck/TransactionsChunk'
import AddTransaction from '../add-transaction/AddTransaction'
import Loader from '../../loader/Loader'


import './transaction-section.css'

const TransactionSection = ({transactions, setAddTransactionVisible, filtered, setFiltered}) => {

    const [filteredTransactions, setFilteredTransactions] = useState(['loader'])

    useEffect(() => {
        setFilteredTransactions(transactions)
    }, [transactions])



    return (
        <section className={'transaction-section'}>
            {filteredTransactions[0] && filteredTransactions[0] !== 'loader' ? filteredTransactions.map((chunk, i) =>
                <TransactionsChunk key={`${chunk[1][0]._id}${Math.random()}`} chunk={chunk} index={i}/>)
                : filteredTransactions[0] === 'loader' ? <Loader/>
                : <div className={'no-transactions'}>Transactions not found</div>
            }
            <AddTransaction setVisible={setAddTransactionVisible}/>
        </section>
    )
}

export default TransactionSection