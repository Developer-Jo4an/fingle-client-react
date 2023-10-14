import React, {useEffect, useState} from 'react'
import TransactionsChunk from '../transactions-chuck/TransactionsChunk'
import AddTransaction from '../add-transaction/AddTransaction'
import Loader from '../../loader/Loader'
import PeriodTotalSection from '../period-total-section/PeriodTotalSection'
import TransactionFilterSection from '../transaction-filter-section/TransactionFilterSection'

import './transaction-section.css'

const TransactionSection = ({
    setFilterElements,
    filterElements,
    transactions,
    setAddTransactionVisible,
    filtered,
    setFiltered,
    setTransactionMW,
    setTransactionObject,
    setCopy}) => {

    const [filteredTransactions, setFilteredTransactions] = useState([])

    const [total, setTotal] = useState({
        expense: 0,
        income: 0,
        total: 0
    })

    useEffect(() => {
        setFilteredTransactions(() => {
            let resultTotal = {
                expense: 0,
                income: 0,
                total: 0
            }
            if (!transactions[0] || transactions[0] === 'loader') return transactions
            else {
                const checker = {
                    transactionType: ['transactionType'],
                    card: ['card', '_id'],
                    expense: ['category', 'name'],
                    income: ['category', 'name']
                }

                const filteredTr =  transactions.reduce((acc, chunk) => {
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
                if (!filteredTr[0]) setTotal(resultTotal)
                return filteredTr
            }
        })
    }, [transactions, filtered])


    useEffect(() => {
        const filterElmsArr = []
        for (const key in filtered) {
            const value = filtered[key]
            if (value.length) {
                value.forEach(item => {
                    if (key === 'card') {
                        filterElmsArr.push({
                            id: item.obj._id,
                            obj: {
                                label: item.obj.cardName,
                                color: '#24e597',
                                icon: 'fa-solid fa-credit-card'
                            }
                        })
                    if (key === 'transactionType')
                        filterElmsArr.push({
                            id: item.label,
                            obj: {
                                label: item.obj.label,
                                color: item.obj.color,
                                icon: `fa-solid fa-${item.obj.icon.iconName}`
                            }
                        })
                    if (key === 'expense' || key === 'income')
                        filterElmsArr.push({
                            id: item.label,
                            obj: {
                                label: item.obj.name,
                                color: item.obj.color,
                                icon: item.obj.sign
                            }
                        })
                    }
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
            <PeriodTotalSection total={total}/>
            {filterElements.length ? <TransactionFilterSection filterElements={filterElements} deleteFilterEl={deleteFilterEl}/> : null}
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