import React from 'react'
import TransactionsProvider from './TransactionsProvider'
import MyHead from '../../UI/head/MyHead'
import Filter from '../filter/Filter'
import DateFilterModalWindow from '../modal-windows/date-filter-mw/DateFilterModalWindow'
import ModalWindow from '../modal-windows/mw/ModalWindow'
import OptionsTransactionFilter from '../modal-windows/options-transactions-filer/OptionsTransactionFilter'
import PeriodTotalSection from '../period-total-section/PeriodTotalSection'
import TransactionSection from '../transaction-section/TransactionSection'
import TransactionFilterSection from '../transaction-filter-section/TransactionFilterSection'

import './transactions.css'

const Transactions = () => {
    return (
        <TransactionsProvider>
            <section className={'transactions-page'}>
                <MyHead>Transactions</MyHead>
                <Filter/>
                <PeriodTotalSection/>
                <TransactionFilterSection/>
                <TransactionSection/>
                <ModalWindow nav={'periodMWS'}><DateFilterModalWindow/></ModalWindow>
                <ModalWindow nav={'filterMWS'}><OptionsTransactionFilter/></ModalWindow>
            </section>
        </TransactionsProvider>
    )
}

export default Transactions