import React from 'react'
import TransactionsProvider, {useTransactionsContext} from './TransactionsProvider'
import MyHead from '../../UI/head/MyHead'
import Filter from '../../filter/Filter'
import ModalWindow from '../../modal-window/ModalWindow'
import PeriodTotalSection from '../period-total-section/PeriodTotalSection'
import TransactionSection from '../transaction-section/TransactionSection'
import FilterSection from '../../filter/filter-section/FilterSection'
import AddTransaction from '../add-transaction/AddTransaction'
import AddTransactionModalWindow from '../modal-windows/add-transaction-mw/AddTransactionModalWindow'
import ModifiedTransactionModalWindow from '../modal-windows/transaction-mw/ModifiedTransactionModalWindow'

import './transactions.css'

const Transactions = () => {

    return (
        <TransactionsProvider>
            <section className={'transactions-page'}>
                <MyHead>Transactions</MyHead>
                <Filter/>
                <PeriodTotalSection/>
                <FilterSection/>
                <TransactionSection/>
                <AddTransaction/>
                <ModalWindow position={'bottom'} nav={'addMWS'} context={useTransactionsContext}><AddTransactionModalWindow/></ModalWindow>
                <ModalWindow position={'bottom'} nav={'transactionMWS'} context={useTransactionsContext}><ModifiedTransactionModalWindow/></ModalWindow>
            </section>
        </TransactionsProvider>
    )
}

export default Transactions