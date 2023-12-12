import React from 'react'

import { useTransactionsContext } from '../../../general/TransactionsProvider'
import { useModifiedTransactionContext } from '../ModifiedTransactionProvider'

import './modified-transaction-count.css'

const ModifiedTransactionCount = () => {

    const { modifiedMode, modifiedCountMWS } = useModifiedTransactionContext()
    const { modifiedTransaction } = useTransactionsContext()
    const [modified] = modifiedTransaction

    const getHeight = () => modifiedMode[0] ? 'auto' : '0px'
    const getColor = () => {
        const colorLogic = {
            expense:  '#ee3a3a',
            income:  '#24e597',
            transfer: '#f5d544',
        }
        return colorLogic[modified.transactionType]
    }

    return (
        <div className={`modified-transaction-count ${modifiedMode[0] ? 'get-gap' : ''}`}>
            <div className={'always-visible-count-section'}>
                <div className={'modified-option-count-name'}>Count</div>
                <div className={'modified-option-count-value'}>{ modified.count } $</div>
            </div>
            <div
                className={'invisible-count-section'}
                style={{height: getHeight()}}
            >
                <div
                    className={'invisible-count-wrapper'}
                    onClick={() => modifiedCountMWS[1](true)}
                >
                    <div className={'modified-current-currency'} style={{ color: getColor() }}>USD</div>
                    <div className={'modified-count'} style={{ color: getColor() }}>{ modified.count }</div>
                </div>
            </div>
        </div>
    )
}

export default ModifiedTransactionCount