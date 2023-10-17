import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useAddTransactionContext} from '../AddTransactionProvider'

import './add-transaction-message.css'

const AddTransactionMessage = () => {

    const {newTransaction} = useAddTransactionContext()

    const condition = () => newTransaction[0].message && newTransaction[0].message !== ''

    return (
        <div className={`add-transaction-message ${condition() ? 'add-transaction-message-active' : ''}`}>
            <div className={'add-transaction-message-wrapper'}>
                <FontAwesomeIcon icon='fa-solid fa-message'/>
                <div className={'add-transaction-message-value'}>${condition() ? newTransaction[0].message : ''}</div>
            </div>
        </div>
    )
}

export default AddTransactionMessage