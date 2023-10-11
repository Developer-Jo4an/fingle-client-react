import React, {useEffect, useRef, useState} from 'react'
import ModifiedDateBlock from './modified-date-block/ModifiedDateBlock'
import ModifiedTypeBlock from './modified-type-block/ModifiedTypeBlock'
import ModifiedCardBlock from './modified-card-block/ModifiedCardBlock'
import ModifiedCountBlock from './modified-count-block/ModifiedCountBlock'
import ModifiedTransactionCalc from './modified-count-block/ModifiedTransactionCalc'
import ModalWindow from '../mw/ModalWindow'
import ModifiedMessageBlock from './modified-message-block/ModifiedMessageBlock'
import ModifiedMessage from './modified-message-block/ModifiedMessage'
import ModalWindowContentCenter from '../mw-content-center/ModalWindowContentCenter'
import ModifiedTransferCard from './modified-transfer-card/ModifiedTransferCard'
import ModifiedIncomeCategories from './modified-income-categories/ModifiedIncomeCategories'
import ModifiedExpenseCategories from './modified-expense-categories/ModifiedExpenseCategories'
import TransactionInfoButtons from './transaction-info-buttons/TransactionInfoButtons'

import './transaction-modal-window.css'

const TransactionModalWindow = ({transactionObject, setTransactionObject, allCards, categories, transactionMW, setCopy, copy, setTransactions, interval, setTransactionMW}) => {
    const [modifiedMode, setModifiedMode] = useState(false)
    const [calcVisible, setCalcVisible] = useState(false)
    const [messageVisible, setMessageVisible] = useState(false)

    const sectionRef = useRef()
    const transferCardRef = useRef()

    const getHeight = ref => `${ref.current.scrollHeight}px`

    useEffect(() => {
        if (!transactionMW) setTimeout(() => setModifiedMode(false), 300)
    }, [transactionMW])

    const moreInfoEls = {
        transfer: () => <ModifiedTransferCard
            allCards={allCards}
            transactionObject={transactionObject}
            setTransactionObject={setTransactionObject}
            getHeight={getHeight}
            modifiedMode={modifiedMode}
            transferCardRef={transferCardRef}
        />,
        expense: () => <ModifiedExpenseCategories
            transactionObject={transactionObject}
            setTransactionObject={setTransactionObject}
            getHeight={getHeight}
            modifiedMode={modifiedMode}
            expense={categories.expense}
        />,
        income: () => <ModifiedIncomeCategories
            transactionObject={transactionObject}
            setTransactionObject={setTransactionObject}
            getHeight={getHeight}
            modifiedMode={modifiedMode}
            income={categories.income}
        />
    }

    return (
        <div className={'transaction-modal-window'}>
            {transactionObject ?
            <div ref={sectionRef} className={'transaction-info-section'}>
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
                    {moreInfoEls[transactionObject.transactionType]()}
                </div>
                <TransactionInfoButtons
                    modifiedMode={modifiedMode}
                    setModifiedMode={setModifiedMode}
                    transactionObject={transactionObject}
                    setTransactionObject={setTransactionObject}
                    setCopy={setCopy}
                    copy={copy}
                    setTransactions={setTransactions}
                    interval={interval}
                    setTransactionMW={setTransactionMW}
                    transferCardRef={transferCardRef}
                />
                <ModalWindow
                    visible={calcVisible}
                    setVisible={setCalcVisible}
                ><ModifiedTransactionCalc
                    transactionObject={transactionObject}
                    setTransactionObject={setTransactionObject}
                    setCalcVisible={setCalcVisible}
                    calcVisible={calcVisible}
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