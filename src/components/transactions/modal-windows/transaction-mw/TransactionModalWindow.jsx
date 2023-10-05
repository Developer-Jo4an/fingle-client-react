import React, {useState} from 'react'
import ModifiedDateBlock from './modified-date-block/ModifiedDateBlock'
import ModifiedTypeBlock from './modified-type-block/ModifiedTypeBlock'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import './transaction-modal-window.css'

const TransactionModalWindow = ({transactionObject, setTransactionObject}) => {
    const [modifiedMode, setModifiedMode] = useState(false)
    const getHeight = ref => `${ref.current.scrollHeight}px`

    return (
        <div className={'transaction-modal-window'}>
            {transactionObject ?
            <div className={'transaction-info-section'}>
                <div className={'transaction-info-wrapper'}>
                    <ModifiedTypeBlock transactionObject={transactionObject}/>
                    <ModifiedDateBlock
                        modifiedMode={modifiedMode}
                        transactionObject={transactionObject}
                        setTransactionObject={setTransactionObject}
                        getHeight={getHeight}
                    ></ModifiedDateBlock>
                </div>
                <div className={'transaction-info-button'}>
                    <button
                        className={`transaction-info-btn ${modifiedMode ? 'modified-mode-on' : ''}`}
                        onClick={() => setModifiedMode(prev => !prev)}
                    ><FontAwesomeIcon icon={"fa-solid fa-pen"}/>Change</button>
                    <button className={'transaction-info-btn'}><FontAwesomeIcon icon={"fa-solid fa-repeat"}/>Repeat</button>
                    <button className={'transaction-info-btn'}><FontAwesomeIcon icon={"fa-solid fa-trash"}/>Delete</button>
                </div>
            </div>
            :
            <div>No active transaction</div>
            }
        </div>
    )
}

export default TransactionModalWindow