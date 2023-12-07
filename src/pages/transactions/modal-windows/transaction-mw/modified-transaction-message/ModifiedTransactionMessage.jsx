import React from 'react'

import {useModifiedTransactionContext} from '../ModifiedTransactionProvider'
import {useTransactionsContext} from '../../../general/TransactionsProvider'

import './modified-transaction-message.css'

const ModifiedTransactionMessage = () => {

    const { modifiedMode, modifiedMessageMWS } = useModifiedTransactionContext()
    const { modifiedTransaction } = useTransactionsContext()
    const [modified, _] = modifiedTransaction


    return (
        <div className={`modified-transaction-message ${modifiedMode[0] ? 'get-gap' : ''}`}>
            <div className={'always-visible-message-section'}>
                <div className={'modified-option-message-name'}>Message</div>
                <div className={'modified-option-message-value'}>{ modified.message }</div>
            </div>
            <div
                className={`invisible-message-section`}
                style={{height: modifiedMode[0] ? 'auto' : '0px'}}
            ><div
                className={'modified-message-btn'}
                onClick={() => modifiedMessageMWS[1](true)}
            >Select message</div></div>
        </div>
    )
}

export default ModifiedTransactionMessage