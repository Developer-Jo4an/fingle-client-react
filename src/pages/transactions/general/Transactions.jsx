import React from 'react'
import Head from '../../../UI/head/Head'
import Filter from '../../../components/filter/Filter'
import PeriodTotalSection from '../period-total-section/PeriodTotalSection'
import TransactionSection from '../transactions-section/TransactionSection'
import FilterSection from '../../../components/filter/filter-section/FilterSection'
import ModalWindow from '../../../components/modal-window/ModalWindow'
import ModifiedTransactionModalWindow from '../modal-windows/transaction-mw/ModifiedTransactionModalWindow'
import AddTransactionModalWindow from '../modal-windows/add-transaction-mw/AddTransactionModalWindow'
import AddBtn from '../../../UI/add-btn/AddBtn'
import TransactionsProvider, { useTransactionsContext } from './TransactionsProvider'

import './transactions.css'

const Transactions = () => {
    return (
        <TransactionsProvider>
            <section className={'transactions-page'}>
                <Head>Transactions</Head>
                <Filter/>
                <FilterSection/>
                <PeriodTotalSection/>
                <TransactionSection/>
                <AddBtn context={ useTransactionsContext } nav={'addMWS'} bottom={ 95 }/>
                <ModalWindow position={'bottom'} nav={'addMWS'} context={ useTransactionsContext }><AddTransactionModalWindow/></ModalWindow>
                <ModalWindow position={'bottom'} nav={'transactionMWS'} context={ useTransactionsContext }><ModifiedTransactionModalWindow/></ModalWindow>
            </section>
        </TransactionsProvider>
    )
}

export default Transactions