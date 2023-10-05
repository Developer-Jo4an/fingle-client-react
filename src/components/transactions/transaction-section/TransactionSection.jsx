import React, {useEffect, useState} from 'react'
import TransactionsChunk from '../transactions-chuck/TransactionsChunk'
import AddTransaction from '../add-transaction/AddTransaction'
import Loader from '../../loader/Loader'

import './transaction-section.css'

const TransactionSection = ({transactions, setAddTransactionVisible, filtered, setTransactionMW, setTransactionObject}) => {

    const [filteredTransactions, setFilteredTransactions] = useState([])

    useEffect(() => {
        setFilteredTransactions(() => {
            if (!transactions[0]) return transactions
            else if (transactions[0] === 'loader') return transactions
            else {
                return transactions.reduce((acc, chunk) => {
                    const [date, arr] = chunk
                    const newArray = arr.reduce((acc, transaction) => {
                        const result = []
                        for (const key in filtered) {
                            const value = filtered[key]
                            if (value[0]) {
                                if (key === 'transactionType') result.push(value.includes(transaction.transactionType))
                                else if (key === 'card') result.push(value.includes(transaction.card._id))
                                else if (key === 'expense' || key === 'income') {
                                    result.push(value.includes(transaction.category ? transaction.category.name : false))
                                }
                            }
                        }
                        if (!result.includes(false)) acc.push(transaction)
                        return acc
                    }, [])
                    if (newArray[0]) acc.push([date, newArray])
                    return acc
                }, [])
            }
        })
    }, [transactions, filtered])

    return (
        <section className={'transaction-section'}>
            {filteredTransactions[0] && filteredTransactions[0] !== 'loader' ? filteredTransactions.map((chunk, i) =>
                <TransactionsChunk
                    key={`${chunk[1][0]._id}${Math.random()}`}
                    chunk={chunk}
                    index={i}
                    setTransactionObject={setTransactionObject}
                    setTransactionMW={setTransactionMW}
                />)
                : filteredTransactions[0] === 'loader' ? <Loader/>
                : <div className={'no-transactions'}>Transactions not found</div>
            }
            <AddTransaction setVisible={setAddTransactionVisible}/>
        </section>
    )
}

export default TransactionSection