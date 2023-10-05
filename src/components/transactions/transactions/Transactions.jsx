import React, {useEffect, useRef, useState} from 'react'
import MyHead from '../../UI/head/MyHead'
import Filter from '../filter/Filter'
import ModalWindow from '../modal-windows/mw/ModalWindow'
import DateFilterModalWindow from '../modal-windows/date-filter-mw/DateFilterModalWindow'
import AddTransactionModalWindow from '../modal-windows/add-transaction-mw/AddTransactionModalWindow'
import TransactionSection from '../transaction-section/TransactionSection'
import OptionsTransactionFilter from '../modal-windows/options-transactions-filer/OptionsTransactionFilter'

import axios from 'axios'
import {formattedInterval, formattedTransactions, userId} from '../../../my-functions/my-functions'

import './transactions.css'
import TransactionModalWindow from '../modal-windows/transaction-mw/TransactionModalWindow';

const Transactions = ({activePage, allCards, transactionCategories}) => {
    const [interval, setInterval] = useState('Week')
    const [transactions, setTransactions] = useState([])
    const [filteredTransactions, setFilteredTransactions] = useState({
        transactionType: [],
        card: [],
        expense: [],
        income: []
    })
    const [dateFilterVisible, setDateFilterVisible] = useState(false)
    const [addTransactionVisible, setAddTransactionVisible] = useState(false)
    const [optionsTransactionsVisible, setOptionsTransactionsVisible] = useState(false)
    const [transactionMW, setTransactionMW] = useState(false)
    const [transactionObject, setTransactionObject] = useState({})
    const sectionRef = useRef()

    useEffect(() => {
        const transactionRequest = async (interval) => {
            try {
                let transactionsData = await axios.post(`${userId}/get-transactions`, {interval})
                const filteredTransactions = formattedTransactions(transactionsData)
                setTransactions(filteredTransactions)
            } catch (e) {setTransactions([])}
        }
        setTransactions(['loader'])
        transactionRequest(formattedInterval(interval))
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
                optionsFilter={optionsTransactionsVisible}
                setOptionsFilter={setOptionsTransactionsVisible}
            />
            <TransactionSection
                transactions={transactions}
                setAddTransactionVisible={setAddTransactionVisible}
                filtered={filteredTransactions}
                setTransactionMW={setTransactionMW}
                setTransactionObject={setTransactionObject}
            />
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
                    interval={interval}
                    setTransactions={setTransactions}
                />
            </ModalWindow>
            <ModalWindow
                visible={optionsTransactionsVisible}
                setVisible={setOptionsTransactionsVisible}>
                <OptionsTransactionFilter
                    filtered={filteredTransactions}
                    setFiltered={setFilteredTransactions}
                    allCards={allCards}
                    categories={transactionCategories}
                />
            </ModalWindow>
            <ModalWindow
                visible={transactionMW}
                setVisible={setTransactionMW}>
                <TransactionModalWindow
                    transactionObject={transactionObject}
                    setTransactionObject={setTransactionObject}
                />
            </ModalWindow>
        </section>
    )
}

export default Transactions