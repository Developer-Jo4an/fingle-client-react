import React from 'react'
import AddTransactionCategory from '../add-transaction-category/AddTransactionCategory'
import AddTransactionTransferCard from '../add-transaction-transfer-card/AddTransactionTransferCard'
import AddTransactionIncomeCategory from '../add-transaction-income/AddTransactionIncomeCategory'
import AddTransactionSubMoreInfo from '../add-transaction-more-sub-more-info/AddTransactionSubMoreInfo'

import { useAddTransactionContext } from '../AddTransactionProvider'

const AddTransactionMoreInfo = () => {

    const { newTransaction, refs } = useAddTransactionContext()
    const [futureTransaction] = newTransaction

    return (
        <div className={`add-transaction-more-info`}>
            <div
                className={`add-transaction-more-info-wrapper 
                        ${futureTransaction.transactionType === 'expense' ?
                    'start' : futureTransaction.transactionType === 'income' ? 'middle' : 'end'}`}>
                <AddTransactionCategory Ref={ refs.expense }/>
                <AddTransactionIncomeCategory Ref={ refs.income }/>
                <AddTransactionTransferCard Ref={ refs.transfer }/>
            </div>
            <AddTransactionSubMoreInfo/>
        </div>
    )
}

export default AddTransactionMoreInfo