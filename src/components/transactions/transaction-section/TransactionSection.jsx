import React, {useEffect, useState} from 'react'
import TransactionsChunk from '../transactions-chuck/TransactionsChunk'
import AddTransaction from '../add-transaction/AddTransaction'
import Loader from '../../loader/Loader'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import './transaction-section.css'

const TransactionSection = ({setFilterElements, filterElements, transactions, setAddTransactionVisible, filtered, setTransactionMW, setTransactionObject, setCopy}) => {

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
                        if (!result.includes(false)) {
                            acc.push(transaction)
                        }
                        return acc
                    }, [])
                    if (newArray[0]) acc.push([date, newArray])
                    return acc
                }, [])
            }
        })
    }, [transactions, filtered])


    useEffect(() => {
        setFilterElements(prev => {
            const checker = (type, obj) => {
                const logic = {
                    transactionType: obj => {
                        if (prev.find(item => ))
                        return [...prev, {id: obj._id, label: obj.label, icon: `fa-solid fa-${obj.icon.iconName}`}]
                    },
                    card: obj => {
                        console.log(obj)
                    },
                    expense: obj => {
                        console.log(obj)
                    },
                    income: obj => {
                        console.log(obj)
                    },
                }
                return logic[type](obj)
            }

            for (const key in filtered) {
                const value = filtered[key]
                if (value.length) return value.forEach(item => checker(key, item.obj))
            }
            return []
        })
    }, [filtered])

    return (
        <section className={'transaction-section'}>
            <div className={'transaction-filters-section'}>
                {filterElements.length ?
                    <div className={'filter-elements-wrapper'}>
                        {filterElements.map(element => (
                            <div
                                key={element.label}
                                className={'filter-element'}
                                style={{'--filter-element-color': element.color}}
                            >
                                <FontAwesomeIcon icon={element.icon}/>
                                {element.label}
                                <FontAwesomeIcon icon={'fa-solid fa-xmark'}/>
                            </div>
                        ))}
                    </div>
                    :
                    <div></div>
                }
            </div>
            {filteredTransactions[0] && filteredTransactions[0] !== 'loader' ? filteredTransactions.map((chunk, i) =>
                <TransactionsChunk
                    key={`${chunk[1][0]._id}${Math.random()}`}
                    chunk={chunk}
                    index={i}
                    setTransactionObject={setTransactionObject}
                    setTransactionMW={setTransactionMW}
                    setCopy={setCopy}
                />)
                : filteredTransactions[0] === 'loader' ? <Loader/>
                : <div className={'no-transactions'}>Transactions not found</div>
            }
            <AddTransaction setVisible={setAddTransactionVisible}/>
        </section>
    )
}

export default TransactionSection