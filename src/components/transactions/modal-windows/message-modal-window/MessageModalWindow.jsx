import React, {useRef} from 'react'

import './message-modal-window.css'
const MessageModalWindow = ({setVisible, setState}) => {

    const inputRef = useRef()

    const removeMessage = () => {
        setState(prev => {
            const futureObject = {}
            for (const key in prev) if (key !== 'message') futureObject[key] = prev[key]
            return futureObject
        })
        setVisible(false)
        inputRef.current.value = ''
    }

    const saveMessage = () => {
        const value = inputRef.current.value
        if (value !== '') setState(prev => ({...prev, message: value}))
        setVisible(false)
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
                    onClick={() => setVisible(false)}
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