import React, {useContext, useEffect, useState} from 'react'

import {dateObj, dateRefactor} from '../../../my-functions/my-functions'
import {useContextApp} from '../../../AppProvider'
import moment from 'moment'

const TransactionsContext = React.createContext()
export const useTransactionsContext = () => useContext(TransactionsContext)

const TransactionsProvider = ({ children}) => {
    const {user} = useContextApp()

    const [transactions, setTransactions] = useState([])
    const [period, setPeriod] = useState('Week')
    const [filter, setFilter] = useState({
        transactionType: [],
        card: [],
        category: [],
    })
    const [filterEls, setFilterEls] = useState([])
    const [total, setTotal] = useState({
        expense: 0,
        income: 0,
        total: 0
    })
    // modal windows
    const [periodMWS, setPeriodMWS] = useState(false)
    const [filterMWS, setFilterMWS] = useState(false)

    useEffect(() => {
        setTotal({
            expense: 0,
            income: 0,
            total: 0
        })

        let periodJson = dateObj(period) // formatted Period

        if (!periodJson) {
            if (period.includes(' - ')) {
                periodJson = period.split(' - ').map((item, index) => {
                    const date = moment(item, 'DD.MM.YYYY')._d
                    return index === 1 ? date.setHours(23, 59, 59, 999) : date
                })
            } else periodJson = [moment(period, 'DD.MM.YYYY')._d,
                moment(period, 'DD.MM.YYYY')._d.setHours(23, 59, 59, 999)]
        }

        const formattedTransactions = user[0].transactions.reduce((acc, transaction) => {
            const checkObject = {
                date: transaction => {
                    const date = new Date(transaction.date)
                    return periodJson[0] <= date && date <= periodJson[1]
                },
                filter: transaction => {
                    const result = []
                    for (const key in filter) {
                        const value = filter[key]
                        if (value.length) {
                            const {transactionType, card, category} = transaction

                            const filterLogic = {
                                transactionType: () => result.push(value.includes(transactionType)),
                                card: () => result.push(value.includes(card._id)),
                                category: () => {
                                    if (transactionType === 'transfer') result.push(false)
                                    else result.push(value.includes(category.name))
                                }
                            }; filterLogic[key]()
                        }
                    }
                    return !result.includes(false)
                },
            }
            if (checkObject.date(transaction) && checkObject.filter(transaction)) {
                const totalLogic = {
                    expense: () => setTotal(prev => ({
                        expense: prev.expense + transaction.count,
                        income: prev.income,
                        total: prev.total - transaction.count
                    })),
                    income: () => setTotal(prev => ({
                        expense: prev.expense,
                        income: prev.income + transaction.count,
                        total: prev.total + transaction.count
                    })),
                    transfer: () => {}
                }
                totalLogic[transaction.transactionType]()
                acc.push(transaction)
            }
            return acc
        }, [])
        setTransactions(formattedTransactions)
    }, [period, filter, user[0].transactions])

    return (
        <TransactionsContext.Provider value={{
            transactions: [transactions, setTransactions],
            period: [period, setPeriod],
            filter: [filter, setFilter],
            filterEls: [filterEls, setFilterEls],
            total: [total, setTotal],
            periodMWS: [periodMWS, setPeriodMWS],
            filterMWS: [filterMWS, setFilterMWS]
        }}>{ children }
        </TransactionsContext.Provider>
    )
}

export default TransactionsProvider