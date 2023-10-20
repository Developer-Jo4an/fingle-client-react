import React, {useState} from 'react'
import {useAddTransactionContext} from '../../AddTransactionProvider'

import './message-modal-window.css'

const MessageModalWindow = () => {

    const {newTransaction, messageMWS} = useAddTransactionContext()
    const [message, setMessage] = useState(newTransaction[0].message ? newTransaction[0].message : '')

    const removeMessage = () => {
        newTransaction[1](prev => {
            const futureObject = {}
            for (const key in prev) if (key !== 'message') futureObject[key] = prev[key]
            return futureObject
        })
        messageMWS[1](false)
        setMessage('')
    }

    const saveMessage = () => {
        if (message) newTransaction[1](prev => ({...prev, message}))
        messageMWS[1](false)
    }

    return (
        <div
            className={'message-modal-window'}
            onClick={e => e.stopPropagation()}
        >
            <div className="message-input-wrapper">
                <input
                    value={message}
                    type="text"
                    className={'message-input'}
                    placeholder={'message'}
                    onChange={el => setMessage(el.target.value)}
                />
            </div>
            <div className="message-action-buttons">
                <button className={'message-action-btn'} onClick={() => messageMWS[1](false)}>Cancel</button>
                <button className={'message-action-btn'} onClick={removeMessage}>Remove</button>
                <button className={'message-action-btn'} onClick={saveMessage}>Save</button>
            </div>
        </div>
    )
}

export default MessageModalWindow