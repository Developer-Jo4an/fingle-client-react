import React, {useEffect, useState} from 'react'
import TransactionsChunk from '../transactions-chuck/TransactionsChunk'
import AddTransaction from '../add-transaction/AddTransaction'
import Loader from '../../loader/Loader'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import './transaction-section.css'

const TransactionSection = ({setFilterElements, filterElements, transactions, setAddTransactionVisible, filtered, setFiltered, setTransactionMW, setTransactionObject, setCopy}) => {

    const [filteredTransactions, setFilteredTransactions] = useState([])

    const [total, setTotal] = useState({
        expense: 0,
        income: 0,
        total: 0
    })

    useEffect(() => {
        setFilteredTransactions(() => {
            if (!transactions[0]) return transactions
            else if (transactions[0] === 'loader') return transactions
            else {
                const checker = {
                    transactionType: ['transactionType'],
                    card: ['card', '_id'],
                    expense: ['category', 'name'],
                    income: ['category', 'name']
                }
                let resultTotal = {
                    expense: 0,
                    income: 0,
                    total: 0
                }
                return transactions.reduce((acc, chunk) => {

                    const [date, arr] = chunk
                    const newArray = arr.reduce((acc, transaction) => {
                        const result = []
                        for (const key in filtered) {
                            const value = filtered[key]
                            if (value[0]) {
                                result.push(value.reduce((acc, item) => {
                                    const check = checker[key][1] ? transaction[checker[key][0]][checker[key][1]] : transaction[checker[key][0]]
                                    if (item.label === check) acc = true
                                    return acc
                                }, false))
                            }
                        }
                        if (!result.includes(false)) {
                            acc.push(transaction)
                            const totalLogic = {
                                expense: () => {
                                    resultTotal = {
                                        income: resultTotal.income,
                                        expense: resultTotal.expense + transaction.count,
                                        total: resultTotal.total - transaction.count
                                    }
                                },
                                income: () => {
                                    resultTotal = {
                                        expense: resultTotal.expense,
                                        income : resultTotal.income + transaction.count,
                                        total: resultTotal.total + transaction.count
                                    }
                                },
                            }
                            if (transaction.transactionType !== 'transfer') totalLogic[transaction.transactionType]()
                            setTotal(resultTotal)
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
        const filterElmsArr = []
        for (const key in filtered) {
            const value = filtered[key]
            if (value.length) {
                value.forEach(item => {
                    if (key === 'card') filterElmsArr.push({id: item.obj._id, obj: {label: item.obj.cardName, color: '#24e597', icon: 'fa-solid fa-credit-card'}})
                    if (key === 'transactionType') filterElmsArr.push({id: item.label, obj: {label: item.obj.label, color: item.obj.color, icon: `fa-solid fa-${item.obj.icon.iconName}`}})
                    if (key === 'expense' || key === 'income') filterElmsArr.push({id: item.label, obj: {label: item.obj.name, color: item.obj.color, icon: item.obj.sign}})
                })
            }
        }
        setFilterElements(filterElmsArr)
    }, [filtered])

    const deleteFilterEl = id => {
        const newFilter = {}
        for (const key in filtered) newFilter[key] = filtered[key].filter(item => item.label !== id)
        setFiltered(newFilter)
    }

    return (
        <section className={'transaction-section'}>
            <div className={'period-total-section'}>
                <div className={'period-total-wrapper'}>
                    <div className={'period-total'}>
                        <div className={'period-total-header'}>Expense <FontAwesomeIcon icon={'fa-solid fa-arrow-down'}/></div>
                        <div className={'total-period-value total-period-value-expense'}>{total.expense}</div>
                    </div>
                    <div className={'period-total'}>
                        <div className={'period-total-header'}>Income <FontAwesomeIcon icon={'fa-solid fa-arrow-up'}/></div>
                        <div className={'total-period-value total-period-value-income'}>{total.income}</div></div>
                    <div className={'between-line'}></div>
                    <div className={'period-total'}>
                        <div className={'period-header total-for-the-period'}>Total</div>
                        <div className={'total-period-value total-for-the-period'}>{total.total}</div>
                    </div>
                </div>
            </div>
            {filterElements.length ?
                <div className={'transaction-filters-section'}>
                    <div className={'filter-elements-wrapper'}>
                        {filterElements.map(({id, obj}) => (
                            <div
                                key={id}
                                className={'filter-element'}
                                style={{'--filter-element-color': obj.color}}
                                onClick={() => deleteFilterEl(id)}
                            >
                                <FontAwesomeIcon icon={obj.icon}/>
                                {obj.label}
                                <FontAwesomeIcon icon={'fa-solid fa-xmark'}/>
                            </div>
                        ))}
                    </div>
                </div>
                : null
            }

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