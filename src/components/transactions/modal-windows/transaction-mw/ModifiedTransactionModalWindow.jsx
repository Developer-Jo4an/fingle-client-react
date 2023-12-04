import React from 'react'
import ModifiedTransactionButtons from './modified-transaction-buttons/ModifiedTransactionButtons'
import ModifiedTransactionProvider, {useModifiedTransactionContext} from './ModifiedTransactionProvider'
import ModifiedTransactionType from './modified-transaction-type/ModifiedTransactionType'
import ModifiedTransactionDate from './modified-transaction-date/ModifiedTransactionDate'
import ModifiedTransactionCard from './modified-transaction-card/ModifiedTransactionCard'
import ModalWindow from '../../../modal-window/ModalWindow'
import ModifiedCountModalWindow from './modal-windows/modified-count-mw/ModifiedCountModalWindow'
import ModifiedTransactionCount from './modified-transaction-count/ModifiedTransactionCount'
import ModifiedTransactionCategories from './modified-transaction-categories/ModifiedTransactionCategories'
import ModifiedTransactionTransferCard from './modified-transaction-transfer-card/ModifiedTransactionTransferCard'
import ModifiedTransactionMessage from './modified-transaction-message/ModifiedTransactionMessage'
import ModifiedMessageModalWindow from './modal-windows/modified-message-mw/ModifiedMessageModalWindow'

import {useTransactionsContext} from '../../transactions/TransactionsProvider'

import './modified-transaction-modal-window.css'
import ModifiedCloseBtn from './modified-close-btn/ModifiedCloseBtn';

const ModifiedTransactionModalWindow = () => {

    const {modifiedTransaction} = useTransactionsContext()
    const [modified] = modifiedTransaction

    const additionally = type => {
        const additionallyLogic = {
            expense: () => <ModifiedTransactionCategories/>,
            income: () => <ModifiedTransactionCategories/>,
            transfer: () => <ModifiedTransactionTransferCard/>,
        }
        return additionallyLogic[type]()
    }

    return (
        <ModifiedTransactionProvider>
            {modified.transactionType && (
                <div className={'modified-transaction-modal-window'}>
                    <ModifiedCloseBtn/>
                    <div className={'modified-transaction-section'}>
                        <ModifiedTransactionType/>
                        <ModifiedTransactionDate/>
                        <ModifiedTransactionCard/>
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