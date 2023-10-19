import React from 'react'
import ModifiedTransactionButtons from './modified-transaction-buttons/ModifiedTransactionButtons'
import ModifiedTransactionProvider, {useModifiedTransactionContext} from './ModifiedTransactionProvider'
import ModifiedTransactionType from './modified-transaction-type/ModifiedTransactionType'
import ModifiedTransactionDate from './modified-transaction-date/ModifiedTransactionDate'
import ModifiedTransactionCard from './modified-transaction-card/ModifiedTransactionCard'
import ModalWindow from '../../../modal-window/ModalWindow'
import ModifiedCountModalWindow from './modal-windows/modified-count-modal-window/ModifiedCountModalWindow'
import ModifiedTransactionCount from './modified-transaction-count/ModifiedTransactionCount'

import './modified-transaction-modal-window.css'

const ModifiedTransactionModalWindow = () => {
    return (
        <ModifiedTransactionProvider>
        <div className={'modified-transaction-modal-window'}>
            <div className={'modified-transaction-section'}>
                <ModifiedTransactionType/>
                <ModifiedTransactionDate/>
                <ModifiedTransactionCard/>
                <ModifiedTransactionCount/>
            </div>
            <ModifiedTransactionButtons/>
            <ModalWindow nav={'modifiedCountMWS'} context={useModifiedTransactionContext}><ModifiedCountModalWindow/></ModalWindow>
        </div>
        </ModifiedTransactionProvider>
    )
}

export default ModifiedTransactionModalWindow