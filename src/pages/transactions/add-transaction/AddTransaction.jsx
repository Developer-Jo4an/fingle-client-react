import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useTransactionsContext} from '../general/TransactionsProvider'

import './add-transaction.css'

const AddTransaction = () => {

    const {addMWS} = useTransactionsContext()

    return (
        <div
            className={'add-transaction-btn'}
            onClick={() => addMWS[1](true)}
        >
            <div className={'pulse-animation'}></div>
            <FontAwesomeIcon icon='fa-solid fa-plus'/>
        </div>
    )
}

export default AddTransaction