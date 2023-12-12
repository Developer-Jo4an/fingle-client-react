import React from 'react'
import ModifiedTransactionButtons from './modified-transaction-buttons/ModifiedTransactionButtons'
import ModifiedTransactionProvider, { useModifiedTransactionContext } from './ModifiedTransactionProvider'
import ModifiedTransactionType from './modified-transaction-type/ModifiedTransactionType'
import ModifiedTransactionDate from './modified-transaction-date/ModifiedTransactionDate'
import ModifiedTransactionAccount from './modified-transaction-account/ModifiedTransactionAccount'
import ModalWindow from '../../../../components/modal-window/ModalWindow'
import ModifiedCountModalWindow from './modal-windows/modified-count-mw/ModifiedCountModalWindow'
import ModifiedTransactionCount from './modified-transaction-count/ModifiedTransactionCount'
import ModifiedTransactionCategories from './modified-transaction-categories/ModifiedTransactionCategories'
import ModifiedTransactionTransferAccount from './modified-transaction-transfer-account/ModifiedTransactionTransferAccount'
import ModifiedTransactionMessage from './modified-transaction-message/ModifiedTransactionMessage'
import ModifiedMessageModalWindow from './modal-windows/modified-message-mw/ModifiedMessageModalWindow'
import CloseModalWindowBtn from '../../../../UI/close-modal-window-btn/CloseModalWindowBtn'

import { useTransactionsContext } from '../../general/TransactionsProvider'

import './modified-transaction-modal-window.css'

const ModifiedTransactionModalWindow = () => {

    const { modifiedTransaction, transactionMWS } = useTransactionsContext()
    const [modified] = modifiedTransaction

    const additionally = type => {
        const additionallyLogic = {
            expense: () => <ModifiedTransactionCategories/>,
            income: () => <ModifiedTransactionCategories/>,
            transfer: () => <ModifiedTransactionTransferAccount/>,
        }
        return additionallyLogic[type]()
    }

    return (
        <ModifiedTransactionProvider>
            {modified.transactionType && (
                <div className={'modified-transaction-modal-window'}>
                    <CloseModalWindowBtn setVision={transactionMWS[1]}/>
                    <div className={'modified-transaction-section'}>
                        <ModifiedTransactionType/>
                        <ModifiedTransactionDate/>
                        <ModifiedTransactionAccount/>
                        <ModifiedTransactionCount/>
                        <ModifiedTransactionMessage/>
                        {additionally(modified.transactionType)}
                    </div>
                    <ModifiedTransactionButtons/>
                    <ModalWindow
                        position={'bottom'}
                        nav={'modifiedCountMWS'}
                        context={useModifiedTransactionContext}>
                        <ModifiedCountModalWindow/></ModalWindow>
                    <ModalWindow
                        position={'center'}
                        nav={'modifiedMessageMWS'}
                        context={useModifiedTransactionContext}>
                        <ModifiedMessageModalWindow/></ModalWindow>
                </div>

            )}
        </ModifiedTransactionProvider>
    )
}

export default ModifiedTransactionModalWindow