import React, {useState} from 'react'
import ModifiedDateBlock from './modified-date-block/ModifiedDateBlock'
import ModifiedTypeBlock from './modified-type-block/ModifiedTypeBlock'
import ModifiedCardBlock from './modified-card-block/ModifiedCardBlock'
import ModifiedCountBlock from './modified-count-block/ModifiedCountBlock'
import ModifiedTransactionCalc from './modified-count-block/ModifiedTransactionCalc'
import ModalWindow from '../mw/ModalWindow'
import ModifiedMessageBlock from './modified-message-block/ModifiedMessageBlock'
import ModifiedMessage from './modified-message-block/ModifiedMessage'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import './transaction-modal-window.css'
import ModalWindowContentCenter from '../mw-content-center/ModalWindowContentCenter';

const TransactionModalWindow = ({transactionObject, setTransactionObject, allCards, categories}) => {
    const [modifiedMode, setModifiedMode] = useState(false)
    const getHeight = ref => `${ref.current.scrollHeight}px`

    const [calcVisible, setCalcVisible] = useState(false)
    const [messageVisible, setMessageVisible] = useState(false)

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
                    <ModifiedCardBlock
                        modifiedMode={modifiedMode}
                        transactionObject={transactionObject}
                        setTransactionObject={setTransactionObject}
                        getHeight={getHeight}
                        allCards={allCards}
                    />
                    <ModifiedCountBlock
                        modifiedMode={modifiedMode}
                        transactionObject={transactionObject}
                        getHeight={getHeight}
                        setCalcVisible={setCalcVisible}
                    />
                    <ModifiedMessageBlock
                        modifiedMode={modifiedMode}
                        transactionObject={transactionObject}
                        getHeight={getHeight}
                        setMessageVisible={setMessageVisible}
                    />
                </div>
                <div className={'transaction-info-button'}>
                    <button
                        className={`transaction-info-btn ${modifiedMode ? 'modified-mode-on' : ''}`}
                        onClick={() => setModifiedMode(prev => !prev)}
                    ><FontAwesomeIcon icon={"fa-solid fa-pen"}/>Change</button>
                    <button className={'transaction-info-btn'}><FontAwesomeIcon icon={"fa-solid fa-repeat"}/>Repeat</button>
                    <button className={'transaction-info-btn'}><FontAwesomeIcon icon={"fa-solid fa-trash"}/>Delete</button>
                </div>
                <ModalWindow
                    visible={calcVisible}
                    setVisible={setCalcVisible}
                ><ModifiedTransactionCalc
                    transactionObject={transactionObject}
                    setTransactionObject={setTransactionObject}
                    setCalcVisible={setCalcVisible}
                />
                </ModalWindow>
                <ModalWindowContentCenter
                    visible={messageVisible}
                    setVisible={setMessageVisible}
                ><ModifiedMessage
                    transactionObject={transactionObject}
                    setTransactionObject={setTransactionObject}
                    setMessageVisible={setMessageVisible}
                />
                </ModalWindowContentCenter>
            </div>
            :
            <div>No active transaction</div>
            }
        </div>
    )
}

export default TransactionModalWindow