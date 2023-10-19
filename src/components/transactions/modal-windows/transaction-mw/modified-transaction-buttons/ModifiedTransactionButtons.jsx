import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {useTransactionsContext} from '../../../transactions/TransactionsProvider'
import {useModifiedTransactionContext} from '../ModifiedTransactionProvider'

import './modified-transaction-buttons.css'

const ModifiedTransactionButtons = () => {

    const {transactionMWS, modifiedTransaction} = useTransactionsContext()
    const {modifiedMode} = useModifiedTransactionContext()

    return (
        <div className={'modified-transaction-buttons'}>
            <button
                className={`modified-transaction-button ${modifiedMode[0] ? 'modified-btn-active' : ''}`}
                onClick={() => modifiedMode[1](prev => !prev)}
            ><FontAwesomeIcon icon='fa-solid fa-pen'/>Change</button>
            <button className={'modified-transaction-button modified-repeat-btn'}><FontAwesomeIcon icon='fa-solid fa-repeat'/>Repeat</button>
            <button className={'modified-transaction-button modified-delete-btn'}><FontAwesomeIcon icon='fa-solid fa-trash'/>Delete</button>
        </div>
    )
}

export default ModifiedTransactionButtons