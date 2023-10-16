import React, {useEffect, useRef, useState} from 'react'
import MyHead from '../../UI/head/MyHead'
import Filter from '../filter/Filter'
import ModalWindow from '../modal-windows/mw/ModalWindow'
import DateFilterModalWindow from '../modal-windows/date-filter-mw/DateFilterModalWindow'
import AddTransactionModalWindow from '../modal-windows/add-transaction-mw/AddTransactionModalWindow'
import TransactionSection from '../transaction-section/TransactionSection'
import OptionsTransactionFilter from '../modal-windows/options-transactions-filer/OptionsTransactionFilter'
import TransactionModalWindow from '../modal-windows/transaction-mw/TransactionModalWindow'
import { useContextApp } from '../../../AppProvider'

import './transactions.css'
import {dateObj} from '../../../my-functions/my-functions'

const Transactions = () => {
    const {user} = useContextApp()

    const [transactions, setTransactions] = useState([])
    const [period, setPeriod] = useState('All time')
    const [transactionFilter, setTransactionFilter] = useState({
        transactionType: ['expense'],
        card: [],
        category: [],
    })

    useEffect(() => {
        let periodJson = dateObj(period)
        periodJson = periodJson ? periodJson : period // formatted Period

        const formattedTransactions = user[0].transactions.reduce((acc, transaction) => {
            const checkObject = {
                date: transaction => {
                    const date = new Date(transaction.date)
                    return periodJson[0] <= date && date <= periodJson[1]
                },
                filter: transaction => {
                    const result = []
                    for (const key in transactionFilter) {
                        const value = transactionFilter[key]
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
            if (checkObject.date(transaction) && checkObject.filter(transaction)) acc.push(transaction)
            return acc
        }, [])
        setTransactions(formattedTransactions)
    }, [period, setPeriod, user[0].transactions])

    return (
        <div style={{width: '33.3333%'}}>Transactions</div>
    )
}

export default Transactions