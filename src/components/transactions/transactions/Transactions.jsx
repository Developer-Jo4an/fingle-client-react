import React, {useEffect, useRef, useState} from 'react'
import MyHead from '../../UI/head/MyHead'
import Filter from '../filter/Filter'
import ModalWindow from '../modal-windows/mw/ModalWindow'
import DateFilterModalWindow from '../modal-windows/date-filter-mw/DateFilterModalWindow'
import AddTransactionModalWindow from '../modal-windows/add-transaction-mw/AddTransactionModalWindow'
import TransactionSection from '../transaction-section/TransactionSection'

import moment from 'moment'
import axios from 'axios'
import { dateObj, dateRefactor, userId } from '../../../my-functions/my-functions'

import './transactions.css'

const Transactions = ({activePage, allCards, transactionCategories}) => {
    const [interval, setInterval] = useState('Week')
    const [transactions, setTransactions] = useState([])

    const [dateFilterVisible, setDateFilterVisible] = useState(false)
    const [addTransactionVisible, setAddTransactionVisible] = useState(false)

    const sectionRef = useRef()

    useEffect(() => {
        const transactionRequest = async (interval) => {
            let transactionsData = await axios.post(`${userId}/get-transactions`, {interval})
            transactionsData = transactionsData.data.map(item =>
                new Object({...item, date: new Date(item.date)}))
                .sort((a, b) => b.date - a.date)

            const transactionsObj = {}
            transactionsData.forEach(item => {
                const date = dateRefactor(item.date)
                date in transactionsObj ?
                    transactionsObj[date] = [...transactionsObj[date], item]
                    : transactionsObj[date] = [item]
            })

            const lastTransactions = []
            for (const key in transactionsObj) lastTransactions.push([key, transactionsObj[key]])
            setTransactions(lastTransactions)
        }
        setTransactions(['loader'])
        const nowInterval = dateObj(interval)
        let formattedInterval = null
        if (nowInterval) transactionRequest(nowInterval)
        else {
            if (interval.includes(' - ')) {
                formattedInterval = interval.split(' - ').map((date, i) => {
                    const newDate = moment(date, 'DD.MM.YYYY')._d
                    return i === 0 ? newDate : new Date(newDate.setHours(23, 59, 59, 999))
                })
            } else {
                const startDate = moment(interval, 'DD.MM.YYYY')._d
                const lastDate = new Date(moment(interval, 'DD.MM.YYYY')._d.setHours(23, 59, 59, 999))
                formattedInterval = [startDate, lastDate]
            }
            transactionRequest(formattedInterval)
        }
    }, [interval])

    return (
        <section
            ref={sectionRef}
            style={{display: activePage === 'transactions' ? 'flex' : 'none'}}
            className={'transactions-page'}
        >
            <MyHead>Transactions</MyHead>
            <Filter
                interval={interval}
                setInterval={setInterval}
                setDateFilterVisible={setDateFilterVisible}
            />
            <TransactionSection
                transactions={transactions}
                setAddTransactionVisible={setAddTransactionVisible}/>
            <ModalWindow
                visible={dateFilterVisible}
                setVisible={setDateFilterVisible}>
                <DateFilterModalWindow
                    interval={interval}
                    setInterval={setInterval}
                    setDateFilterVisible={setDateFilterVisible}
                />
            </ModalWindow>
            <ModalWindow
                visible={addTransactionVisible}
                setVisible={setAddTransactionVisible}>
                <AddTransactionModalWindow
                    allCards={allCards}
                    categories={transactionCategories}
                    setMWVisible={setAddTransactionVisible}
                />
            </ModalWindow>
        </section>
    )
}

export default Transactions