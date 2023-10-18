import React from 'react'
import ModifiedTransactionButtons from './modified-transaction-buttons/ModifiedTransactionButtons'
import ModifiedTransactionProvider from './ModifiedTransactionProvider'
import ModifiedTransactionType from './modified-transaction-type/ModifiedTransactionType'
import ModifiedTransactionDate from './modified-transaction-date/ModifiedTransactionDate'

import './modified-transaction-modal-window.css'

const ModifiedTransactionModalWindow = () => {
    return (
        <ModifiedTransactionProvider>
        <div className={'modified-transaction-modal-window'}>
            <div className={'modified-transaction-section'}>
                <ModifiedTransactionType/>
                <ModifiedTransactionDate/>
                <div>Coming soon</div>
            </div>
            <ModifiedTransactionButtons/>
        </div>
        </ModifiedTransactionProvider>
    )
}

export default ModifiedTransactionModalWindow