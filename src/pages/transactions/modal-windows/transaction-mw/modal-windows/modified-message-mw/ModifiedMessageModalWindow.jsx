import React, {useEffect, useState} from 'react'

import {useModifiedTransactionContext} from '../../ModifiedTransactionProvider'
import {useTransactionsContext} from '../../../../general/TransactionsProvider'

import './modified-message-modal-window.css'

const ModifiedMessageModalWindow = () => {

    const {modifiedMessageMWS} = useModifiedTransactionContext()
    const {modifiedTransaction} = useTransactionsContext()
    const [modified, dispatch] = modifiedTransaction
    const [message, setMessage] = useState(modified.message ? modified.message : '')

    const removeMessage = () => {
        setMessage('')
        dispatch({type: 'remove-message'})
        modifiedMessageMWS[1](false)
    }
    const saveMessage = () => {
        if (message) dispatch({type: 'add-message', message})
        modifiedMessageMWS[1](false)
    }

    useEffect(() => {
        if (!modifiedMessageMWS[0]) setMessage('')
    }, [modifiedMessageMWS[0]])

    return (
        <div
            className={'modified-message-modal-window'}
            onClick={e => e.stopPropagation()}
        >
            <div className={'modified-message-input-wrapper'}>
                <input
                    value={message}
                    type="text"
                    className={'message-input'}
                    placeholder={'message'}
                    onChange={el => setMessage(el.target.value)}
                />
            </div>
            <div className={'modified-message-action-buttons'}>
                <button className={'modified-message-action-btn'} onClick={() => modifiedMessageMWS[1](false)}>Cancel</button>
                <button className={'modified-message-action-btn'} onClick={removeMessage}>Remove</button>
                <button className={'modified-message-action-btn'} onClick={saveMessage}>Save</button>
            </div>
        </div>
    )
}

export default ModifiedMessageModalWindow