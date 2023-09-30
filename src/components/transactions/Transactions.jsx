import React, {useEffect, useRef, useState} from 'react'
import moment from "moment"
import axios from "axios"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCookieBite, faInfo} from "@fortawesome/free-solid-svg-icons"

import MyHead from "../UI/head/MyHead"
import Filter from "./Filter"
import ModalWindow from "./modal-window/ModalWindow"
import DateFilterModalWindow from "./modal-windows/DateFilterModalWindow"
import {dateObj, dateRefactor, timeRefactor, userId} from "../../my-functions/my-functions"
import Loader from "../loader/Loader"
import AddTransaction from "./AddTransaction";

import '../../styles/pages/transactions/transactions.css'

import AddTransactionModalWindow from "./modal-windows/AddTransactionModalWindow";



const Transactions = ({activePage, allCards, transactionCategories}) => {
    const [interval, setInterval] = useState('Week')

    const [dateFilterVisible, setDateFilterVisible] = useState(false)
    const [addTransactionVisible, setAddTransactionVisible] = useState(false)
    const [transactions, setTransactions] = useState([])

    const totalCountsRefs = useRef([])

    useEffect(() => {
        const transactionRequest = async (interval) => {
            let transactionsData = await axios.post(`${userId}/get-transactions`, {interval})

            transactionsData = transactionsData.data.map(item => new Object({...item, date: new Date(item.date)})).sort((a, b) => b.date - a.date)

            const transactionsObj = {}
            transactionsData.forEach(item => {
                const date = dateRefactor(item.date)
                date in transactionsObj ? transactionsObj[date] = [...transactionsObj[date], item] :
                    transactionsObj[date] = [item]
            })

            const lastTransactions = []
            for (const key in transactionsObj) {lastTransactions.push([key, transactionsObj[key]])}
            setTransactions(lastTransactions)
        }

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
                const date = moment(interval, 'DD.MM.YYYY')._d
                formattedInterval = [date, new Date(date.setHours(23, 59, 59, 999))]
            }
            transactionRequest(formattedInterval)
        }
    }, [interval])

    const createTransactionPart = (transactionArr, i) => {
        const [date, array] = transactionArr
        const createTransaction = transaction => {
            const {transactionType, count, date, card} = transaction
            return (
                <div
                    key={`transaction._id${Math.random()}`}
                    className={'transaction'}
                >
                    <div className={'transaction-sign'}>
                        <div
                            style={{backgroundColor: transaction.category.color}}
                            className={'transaction-sign-wrapper'}
                        >{<FontAwesomeIcon icon={faCookieBite}/>}</div>
                    </div>
                    <div className={'transaction-info'}>{transaction.category.name}</div>
                    <div style={{color: transactionType === 'expense' ? 'red' : transactionType === 'income' ? '#24e597' : '#f5d544'}} className={'transaction-count'}>{transactionType === 'expense' ? -count : count} $</div>
                    <div className={'transaction-card'}>{card.cardName}</div>
                    <div className={'transaction-time'}>{timeRefactor(date)}</div>
                </div>
            )
        }

        const addWidth = i => {
            const el = totalCountsRefs.current[i].lastElementChild
            const width = `${el.scrollWidth}px`
            el.style.width = el.style.width === '0px' ? width : '0px'
        }

        const total = array.reduce((acc, item) => {
            const {transactionType, count} = item
            switch (transactionType) {
                case 'expense': {
                    acc.expense += count
                    acc.total -= count
                } break
                case 'income': {
                    acc.income += count
                    acc.total -= count
                } break
            }
            return acc
        }, {expense: 0, income: 0, total: 0})

        return (
            <div
                key={array[0]._id}
                className={'transaction-part'}
            >
                <div className={'transaction-part-header'}>
                    <div className={'transaction-part-date'}>{date}</div>
                    <div
                        ref={el => totalCountsRefs.current[i] = el}
                        className={'transaction-part-count-info'}
                        onClick={() => addWidth(i)}
                    >
                        <FontAwesomeIcon className={'transaction-part-i'} icon={faInfo}/>
                        <div
                            className={'transaction-part-count-total'}
                            style={{width: 0}}
                        >
                            <div style={{color: '#ee3a3a'}}>-{total.expense}$</div>
                            <div style={{color: '#24e597'}}>{total.income}$</div>
                            <div
                                style={{color: total.expense > total.income ? '#ee3a3a' : total.expense < total.income ? '#24e597' : '#f5d544'}}
                                className={'transaction-part-total-total'}>Σ{total.total}$
                            </div>
                        </div>
                    </div>
                </div>
                {array.map(transaction => createTransaction(transaction))}
            </div>
        )
    }

    return (
        <section style={{display: activePage === 'transactions' ? 'flex' : 'none'}} className={'transactions-page'}>
            <MyHead>Transactions</MyHead>
            <Filter interval={interval} setInterval={setInterval} setDateFilterVisible={setDateFilterVisible} transactions={transactions} allCards={allCards} transactionCategories={transactionCategories}/>
            <section className={'transaction-section'}>
                {transactions[0] ? transactions.map((transactionArr, i) => createTransactionPart(transactionArr, i)) : <Loader/>}
                {<AddTransaction setVisible={setAddTransactionVisible}/>}
            </section>
            <ModalWindow visible={dateFilterVisible} setVisible={setDateFilterVisible}><DateFilterModalWindow interval={interval} setInterval={setInterval} setDateFilterVisible={setDateFilterVisible}/></ModalWindow>
            <ModalWindow visible={addTransactionVisible} setVisible={setAddTransactionVisible}><AddTransactionModalWindow allCards={allCards} categories={transactionCategories}/></ModalWindow>
        </section>
    )
}

export default Transactions;