import React, {useRef} from 'react'

import './modified-message-block.css'

const ModifiedMessageBlock = ({modifiedMode, transactionObject, getHeight, setMessageVisible}) => {

    const messageRef = useRef()

    return (
        <div className={`transaction-info-chunk ${modifiedMode ? 'get-gap' : ''}`}>
            <div className='transaction-info-chunk-info'>
                <div className={'transaction-info-chunk-header'}>Message</div>
                <div className={'transaction-info-chunk-value'}>{transactionObject.message ? transactionObject.message : ''}</div>
            </div>

            <div
                className={`modified-transaction-block ${modifiedMode ? 'modified-block-on' : ''}`}
                style={{'--modified-height': `${modifiedMode ? getHeight(messageRef) : '0px'} `}}
                ref={messageRef}
            ><div className={'new-message-btn-wrapper'}>
                <div
                    className={'new-message-btn'}
                    onClick={() => setMessageVisible(true)}
                >Change message</div>
            </div>
            </div>
        </div>
    )
}

export default ModifiedMessageBlock