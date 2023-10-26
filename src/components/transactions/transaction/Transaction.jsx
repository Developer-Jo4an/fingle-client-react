import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { timeRefactor } from '../../../my-functions/my-functions'
import {useTransactionsContext} from '../transactions/TransactionsProvider'

import './transaction.css'

const Transaction = ({ transaction }) => {
    const {transactionType, count, date, card} = transaction

    const {transactionMWS, modifiedTransaction, prevTransaction} = useTransactionsContext()
    const [, dispatch] = modifiedTransaction

    const getInfo = () => {
        if (transactionType === 'expense' || transactionType === 'income')
            return `${transaction.category.name}${transaction.subCategory ? ` | ${transaction.subCategory.name}` : ''}`
        else return card.cardName
    }

    const getAddInfo = () => transactionType === 'expense' ||
        transactionType === 'income' ? card.cardName : transaction.transferCard.cardName

    const getCountColor = () => transactionType === 'expense' ? '#ee3a3a' :
        transactionType === 'income' ? '#24e597' : '#f5d544'

    const getSign = () => transactionType === 'transfer' ?
        'fa-solid fa-repeat' : transaction.category.sign

    const getBackground = () => ({backgroundColor: transactionType === 'expense' ||
        transactionType === 'income' ? transaction.category.color : '#f5d544'})

    const setModifiedTransaction = () => {
        dispatch({type: 'set', transaction: transaction})
        prevTransaction[1](transaction)
        transactionMWS[1](true)
    }

    return (
        <div className={'transaction'} onClick={setModifiedTransaction}>
            <div className={'transaction-sign'}>
                <div
                    style={getBackground()}
                    className={'transaction-sign-wrapper'}
                >{<FontAwesomeIcon icon={getSign()}/>}</div>
            </div>
            <div className={'transaction-info'}><div>{getInfo()}</div></div>
            <div
                style={{'--count-color': getCountColor()}}
                className={'transaction-count'}
            >{count} $</div>

            <div className={'transaction-additional-info'}>{getAddInfo()}</div>
            <div className={'transaction-time'}>{timeRefactor(date)}</div>
        </div>
    )
}

export default Transaction