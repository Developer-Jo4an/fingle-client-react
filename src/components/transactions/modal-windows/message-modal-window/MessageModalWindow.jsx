import React, {useRef} from 'react'
import {useAddTransactionContext} from '../add-transaction-mw/AddTransactionProvider'

import './message-modal-window.css'

const MessageModalWindow = () => {

    const {newTransaction, messageMWS} = useAddTransactionContext()

    const inputRef = useRef()

    const removeMessage = () => {
        newTransaction[1](prev => {
            const futureObject = {}
            for (const key in prev) if (key !== 'message') futureObject[key] = prev[key]
            return futureObject
        })
        messageMWS[1](false)
        inputRef.current.value = ''
    }

    const saveMessage = () => {
        const value = inputRef.current.value
        if (value !== '') newTransaction[1](prev => ({...prev, message: value}))
        messageMWS[1](false)
        inputRef.current.value = ''
    }

    return (
        <div
            className={'message-modal-window'}
            onClick={e => e.stopPropagation()}
        >
            <div className="message-input-wrapper">
                <input
                    ref={inputRef}
                    type="text"
                    className={'message-input'}
                    placeholder={'message'}
                />
            </div>
            <div className="message-action-buttons">
                <button
                    className={'message-action-btn'}
                    onClick={() => messageMWS[1](false)}
                >Cancel</button>
                <button
                    className={'message-action-btn'}
                    onClick={() => removeMessage()}
                >Remove</button>
                <button
                    className={'message-action-btn'}
                    onClick={() => saveMessage()}
                >Save</button>
            </div>
        </div>
    )
}

export default MessageModalWindow