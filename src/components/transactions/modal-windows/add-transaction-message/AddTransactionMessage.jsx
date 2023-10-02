import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons'

import './add-transaction-message.css'

const AddTransactionMessage = ({state}) => {
    return (
        <div className={`add-transaction-message ${state.message && state.message !== '' ? 'add-transaction-message-active' : ''}`}>
            <div className={'add-transaction-message-wrapper'}>
                <FontAwesomeIcon icon={faMessage}/>
                <div className={'add-transaction-message-value'}>${state.message && state.message !== '' ? state.message : ''}</div>
            </div>
        </div>
    )
}

export default AddTransactionMessage