import React, {useEffect, useRef, useState} from 'react'

import './modified-message.css'

const ModifiedMessage = ({transactionObject, setTransactionObject, setMessageVisible}) => {

    const messageRef = useRef()

    const [newMessage, setMessage] = useState(transactionObject.message ? transactionObject.message : '')

    const modifiedMessageAction = action => {
        const modifiedMessageActionObj = {
            cancel: () => setMessageVisible(false),
            remove:() => {
                setTransactionObject(prev => {
                    const futureObject = {}
                    for (const key in prev) if (key !== 'message') futureObject[key] = prev[key]
                    return futureObject
                })
                setMessage('')
                setMessageVisible(false)
            },
            save:() => {
                setTransactionObject(prev => ({...prev, message: newMessage}))
                setMessageVisible(false)
            }
        }
        modifiedMessageActionObj[action]()
    }

    return (
        <div className={'modified-message-modal-window'}>
            <div className={'modified-message-input-wrapper'}>
                <input
                    value={newMessage}
                    placeholder={'message'}
                    className={'modified-message-input'} type="text"
                    ref={messageRef}
                    onChange={() => setMessage(messageRef.current.value)}
                />
            </div>
            <div className={'modified-message-action-buttons-wrapper'}>
                <button
                    className={'modified-message-btn'}
                    onClick={() => modifiedMessageAction('cancel')}
                >Cancel</button>
                <button
                    className={'modified-message-btn'}
                    onClick={() => modifiedMessageAction('remove')}
                >Remove</button>
                <button
                    className={'modified-message-btn'}
                    onClick={() => modifiedMessageAction('save')}
                >Save</button>
            </div>
        </div>
    )
}

export default ModifiedMessage