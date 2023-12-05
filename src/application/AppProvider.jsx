import React, {useContext, useEffect, useState} from 'react'

import axios from 'axios'
import {errorUser, formattedPeriod, userId} from '../my-functions/my-functions'

const AppContext = React.createContext()
export const useAppContext = () => useContext(AppContext)

const AppProvider = ({ children }) => {
    // states
    const [user, setUser] = useState({}) // userInfoState
    const [page, setPage] = useState('home') // activePageState
    const [period, setPeriod] = useState('Week') // transactions period
    const [filter, setFilter] = useState({ // transactions filter
        transactionType: [],
        card: [],
        category: [],
    })
    const [transactions, setTransactions] = useState([]) // all transactions from server
    const [total, setTotal] = useState({ // total count about transactions
        expense: 0,
        income: 0,
        total: 0
    })
    const [filterEls, setFilterEls] = useState([]) // filtered transactions
    // modal windows
    const [periodMWS, setPeriodMWS] = useState(false) // period modal window
    const [filterMWS, setFilterMWS] = useState(false) // filter modal window

    useEffect(() => { // filtered transactions logic
        if (user.transactions) {
            setTotal({
                expense: 0,
                income: 0,
                total: 0
            })

            const [start, stop] = formattedPeriod(period)
            const formattedTransactions = user.transactions.reduce((acc, transaction) => {
                transaction.date = new Date(transaction.date)
                const checkObject = {
                    date: transaction => start <= transaction.date && transaction.date <= stop,
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
        }
    }, [period, filter, user.transactions])

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userInfo = await axios.get(`/get-user-info${userId}`)
                const { data } = userInfo
                if (data.status) setUser( data.userInfo )
                else { alert(data.message); setUser(errorUser) }
            } catch (e) {alert('Request error(400)'); setUser(errorUser) }
        }
        getUserData()
    }, [])

    return (user._id && <AppContext.Provider value={{
        user: [user, setUser],
        page: [page, setPage],
        period: [period, setPeriod],
        filter: [filter, setFilter],
        filterEls: [filterEls, setFilterEls],
        periodMWS: [periodMWS, setPeriodMWS],
        filterMWS: [filterMWS, setFilterMWS],
        transactions: [transactions, setTransactions],
        total: [total, setTotal]
    }}>{ children }</AppContext.Provider>)
}

export default AppProvider