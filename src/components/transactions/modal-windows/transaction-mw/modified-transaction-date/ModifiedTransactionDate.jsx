import React from 'react'

import {useTransactionsContext} from '../../../transactions/TransactionsProvider'
import {useModifiedTransactionContext} from '../ModifiedTransactionProvider'
import {dateRefactor, timeRefactor} from '../../../../../my-functions/my-functions'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import './modified-transaction-date.css'

const ModifiedTransactionDate = () => {

    const {modifiedTransaction} = useTransactionsContext()
    const {refs, modifiedMode} = useModifiedTransactionContext()

    const getValue = () => ({
        date: dateRefactor(modifiedTransaction[0].date),
        time: timeRefactor(modifiedTransaction[0].date)
    })

    if (!modifiedTransaction[0]) return null

    return (
        <div className={`modified-transaction-date ${modifiedMode[0] ? 'get-gap' : ''}`}>
            <div className={'always-visible-date-section'}>
                <div className={'modified-option-date-name'}>Date</div>
                <div className={'modified-option-date-value'}>
                    <div className={'modified-option-date-date'}><FontAwesomeIcon icon='fa-solid fa-calendar'/>{getValue().date}</div>
                    <div className={'modified-option-date-time'}><FontAwesomeIcon icon='fa-solid fa-clock'/>{getValue().time}</div>
                </div>
            </div>
        </div>
    )
}

export default ModifiedTransactionDate