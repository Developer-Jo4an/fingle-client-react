import React, {useEffect, useRef} from 'react'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import axios from 'axios'

import './transaction-info-bottons.css'
import {formattedInterval, formattedTransactions, userId} from '../../../../../my-functions/my-functions';
import transaction from '../../../transaction/Transaction';

const TransactionInfoButtons = ({modifiedMode, setModifiedMode, transactionObject, setTransactionObject, setCopy, copy, setTransactions, interval, setTransactionMW}) => {

    const repeat = useRef()
    const del = useRef()
    const apply = useRef()
    const cancel = useRef()

    const repeatTransaction = () => {
        try {
            const request = async interval => {
                const transaction = {}
                for (const key in copy) {
                    if (key !== '_id') transaction[key] = copy[key]
                    if (key === 'date') transaction[key] = new Date()
                }
                let transactionsData = await axios.post(`${userId}/add-transaction`, {interval, transaction})
                const filteredTransactions = formattedTransactions(transactionsData)
                setTransactions(filteredTransactions)
            }
            setTransactionMW(false)
            setTransactions(['loader'])
            request(formattedInterval(interval))
        } catch (e) {setTransactions([])}
    }

    const deleteTransaction = () => {
        try {
            const request = async interval => {
                const transactionId = copy._id
                let transactionsData = await fetch(`${userId}/del-transaction`, {
                    headers: {'Content-Type': 'application/json'},
                    method: 'DELETE',
                    body: JSON.stringify({interval, transactionId})
                })
                const transactionsDataJSON = await transactionsData.json()
                const filteredTransactions = formattedTransactions({data: transactionsDataJSON})
                setTransactions(filteredTransactions)
            }
            setTransactionMW(false)
            setTransactions(['loader'])
            request(formattedInterval(interval))
        } catch (e) {setTransactions([])}
    }

    const changeTransaction = () => {
        try {

            const request = async interval => {

            }

            // setTransactionMW(false)
            // setTransactions(['loader'])
            request(formattedInterval(interval))
        } catch (e) {setTransactions([])}
    }

    const cancelChange = () => setTransactionObject(copy)


    return (
        <div className={'transaction-info-buttons'}>
            <button
                className={`transaction-info-btn ${modifiedMode ? 'modified-mode-on' : ''}`}
                onClick={() => setModifiedMode(prev => !prev)}
            ><FontAwesomeIcon icon={"fa-solid fa-pen"}/>Change</button>



            <button
                style={{display: modifiedMode ? 'none' : 'flex'}}
                ref={repeat}
                className={'transaction-info-btn repeat-btn'}
                onClick={repeatTransaction}
            ><FontAwesomeIcon icon={"fa-solid fa-repeat"}/>Repeat</button>
            <button
                style={{display: modifiedMode ? 'none' : 'flex'}}
                ref={del}
                className={'transaction-info-btn del-btn'}
                onClick={deleteTransaction}
            ><FontAwesomeIcon icon={"fa-solid fa-trash"}/>Delete</button>



            <button
                style={{display: modifiedMode ? 'flex' : 'none'}}
                ref={cancel}
                className={'transaction-info-btn cancel-btn'}
                onClick={cancelChange}
            ><FontAwesomeIcon icon={"fa-solid fa-xmark"}/></button>
            <button
                style={{display: modifiedMode ? 'flex' : 'none'}}
                ref={apply}
                className={'transaction-info-btn apply-btn'}
                onClick={changeTransaction}
            ><FontAwesomeIcon icon={"fa-solid fa-check"}/></button>
        </div>
    )
}

export default TransactionInfoButtons