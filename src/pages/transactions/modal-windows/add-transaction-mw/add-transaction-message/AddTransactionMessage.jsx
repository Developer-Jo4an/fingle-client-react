import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAddTransactionContext } from '../AddTransactionProvider'

import './add-transaction-message.css'

const AddTransactionMessage = () => {

    const { newTransaction } = useAddTransactionContext()
    const [futureTransaction] = newTransaction

    const condition = () => futureTransaction.message && futureTransaction.message !== ''

    return (
        <div className={`add-transaction-message ${ condition() ? 'add-transaction-message-active' : '' }`}>
            <div className={'add-transaction-message-wrapper'}>
                <div className={'add-transaction-message-sign-wrapper'}><FontAwesomeIcon icon='fa-solid fa-message'/></div>
                <div className={'add-transaction-message-value'}>{ condition() ? futureTransaction.message : '' }</div>
            </div>
        </div>
    )
}

export default AddTransactionMessage