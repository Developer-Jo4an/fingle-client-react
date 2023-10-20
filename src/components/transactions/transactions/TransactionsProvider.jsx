import React, {useContext, useEffect, useReducer, useState} from 'react'

import {dateObj} from '../../../my-functions/my-functions'
import {useAppContext} from '../../../AppProvider'
import moment from 'moment'

const TransactionsContext = React.createContext()
export const useTransactionsContext = () => useContext(TransactionsContext)

export const modifiedTransactionReducer = (state, action) => {
    switch (action.type) {
        case 'set' : return action.transaction
        case 'date' : return {...state, date: action.date}
        case 'date-arrow': return {...state, date: action.callback(state)}
        case 'card' : {
            const futureObject = {}
            for (const key in state) if (key !== 'transferCard') futureObject[key] = state[key]
            return {...futureObject, card: action.card}
        }
        case 'count' : return {...state, count: action.count}
        case 'add-message' : return {...state, message: action.message}
        case 'remove-message' : {
            const futureObject = {}
            for (const key in state) if (key !== 'message') futureObject[key] = state[key]
            return futureObject
        }
        default: return state
    }
}

const TransactionsProvider = ({ children}) => {
    const {user} = useAppContext()

    const [transactions, setTransactions] = useState([]) // all transactions from server
    const [period, setPeriod] = useState('Week') // transactions period
    const [filter, setFilter] = useState({ // transactions filter
        transactionType: [],
        card: [],
        category: [],
    })
    const [filterEls, setFilterEls] = useState([]) // filtered transactions
    const [total, setTotal] = useState({ // total count about transactions
        expense: 0,
        income: 0,
        total: 0
    })
    const [prevTransaction, setPrevTransaction] = useState(false) // prev modified transaction
    // modal windows
    const [periodMWS, setPeriodMWS] = useState(false) // period modal window
    const [filterMWS, setFilterMWS] = useState(false) // filter modal window
    const [addMWS, setAddMWS] = useState(false) // add transaction modal window
    const [transactionMWS, setTransactionMWS] = useState(false) // modified transaction modal window
    // transactions filter

    useEffect(() => { // filtered transactions logic
        setTotal({
            expense: 0,
            income: 0,
            total: 0
        })

        let periodJson = dateObj(period)

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
            filterMWS: [filterMWS, setFilterMWS],
            addMWS: [addMWS, setAddMWS],
            transactionMWS: [transactionMWS, setTransactionMWS],
            modifiedTransaction: useReducer(modifiedTransactionReducer, {}),
            prevTransaction: [prevTransaction, setPrevTransaction]
        }}>{ children }
        </TransactionsContext.Provider>
    )
}

export default TransactionsProvider