import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { timeRefactor } from '../../../my-functions/my-functions'
import { faCookieBite } from '@fortawesome/free-solid-svg-icons'

import './transaction.css'

const Transaction = ({transaction}) => {

    const {transactionType, count, date, card} = transaction

    const getInfo = () => {
        if (transactionType === 'expense' || transactionType === 'income')
            return `${transaction.category.name}${transaction.subCategory ? ` | ${transaction.subCategory.name}` : ''}`
        else return card.name
    }

    const getAddInfo = () => transactionType === 'expense' ||
    transactionType === 'income' ? card.cardName : transaction.transferCard.cardName

    const getCountColor = () => transactionType === 'expense' ? '#ee3a3a' :
        transactionType === 'income' ? '#24e597' : '#f5d544'

    const getCountSum = () => transactionType === 'expense' ? -count : count

    return (
        <div
            className={'transaction'}
        >
            <div className={'transaction-sign'}>
                <div
                    style={{'--background': transaction.category.color}}
                    className={'transaction-sign-wrapper'}
                >{<FontAwesomeIcon icon={faCookieBite}/>}</div>
            </div>
            <div className={'transaction-info'}>{getInfo()}</div>
            <div
                style={{'--count-color': getCountColor()}}
                className={'transaction-count'}
            >{getCountSum()} $</div>

            <div className={'transaction-additional-info'}>{getAddInfo()}</div>
            <div className={'transaction-time'}>{timeRefactor(date)}</div>
        </div>
    );
};

export default Transaction