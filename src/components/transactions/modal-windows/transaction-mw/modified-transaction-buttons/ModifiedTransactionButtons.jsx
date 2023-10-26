import React, {useState} from 'react'
import Loader from '../../../../loader/Loader'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useModifiedTransactionContext} from '../ModifiedTransactionProvider'
import {useTransactionsContext} from '../../../transactions/TransactionsProvider'
import {useAppContext} from '../../../../../AppProvider'
import axios from 'axios';
import {userId} from '../../../../../my-functions/my-functions'

import './modified-transaction-buttons.css'

const ModifiedTransactionButtons = () => {

    const {modifiedMode} = useModifiedTransactionContext()
    const {modifiedTransaction, prevTransaction, transactionMWS} = useTransactionsContext()
    const [modified, dispatch] = modifiedTransaction
    const {user} = useAppContext()

    const [loader, setLoader] = useState(false)

    const repeatTransaction = () => {
        let repeatedTransaction = {}
        for (const key in prevTransaction[0]) if (key !== '_id') repeatedTransaction[key] = prevTransaction[0][key]
        repeatedTransaction = {...repeatedTransaction, date: new Date()}

        const repeatTransactionRequest = async () => {
            try {
                setLoader(true)
                const transactionsRequest = await axios.post(`${userId}/add-transaction`, {transaction: repeatedTransaction})
                user[1](prev => ({...prev, transactions: transactionsRequest.data}))
            } catch (e) { alert('Request error')
            } finally {
                transactionMWS[1](false)
                setLoader(false)
            }
        }
        repeatTransactionRequest()
    }

    const deleteTransaction = () => {
        const deleteTransactionRequest = async () => {
            try {
                setLoader(true)
                const transactionsRequest = await axios.delete(`${userId}/del-transaction/${prevTransaction[0]._id}`)
                user[1](prev => ({...prev, transactions: transactionsRequest.data}))
            } catch (e) { alert('Request error')
            } finally {
                transactionMWS[1](false)
                setLoader(false)
            }
        }
        deleteTransactionRequest()
    }

    const saveChanges = () => {
        const checkerHelper = () => (
            typeof modified.transactionType === 'string' &&
            typeof modified.card === 'object' &&
            typeof modified.date === 'object' &&
            typeof modified.count === 'number')

        const checkerLogic = {
            expense: () => (typeof modified.category === 'object'),
            income: () => (typeof modified.category === 'object'),
            transfer: () => (modified.transferCard && typeof modified.transferCard === 'object' && modified.transferCard._id !== modified.card._id),
        }
        if (checkerHelper() && checkerLogic[modified.transactionType]()) {
            const modifiedTransactionRequest = async () => {
                try {
                    setLoader(true)
                    console.log(modified)
                    const transactionsRequest = await axios.post(`${userId}/modified-transaction`, {transaction: modified})
                    user[1](prev => ({...prev, transactions: transactionsRequest.data}))
                    transactionMWS[1](false)
                    setLoader(false)
                } catch (e) {transactionMWS[1](false); setLoader(false); alert('Request error')}
            }
            modifiedTransactionRequest()
        } else {
            dispatch({type: 'set', transaction: prevTransaction[0]})
            alert ('Произошла ошибка при изменении транзакции, состояние транзакции теперь первоначально!')
        }
    }

    const cancelChanges = () => dispatch({type: 'set', transaction: prevTransaction[0]})

    return (
        <div className={'modified-transaction-buttons'}>
            <button
                className={`modified-transaction-button modified-btn-visible ${modifiedMode[0] ? 'modified-btn-active' : ''}`}
                onClick={() => modifiedMode[1](prev => !prev)}
            ><FontAwesomeIcon icon='fa-solid fa-pen'/>Change</button>
            <button
                className={`modified-transaction-button modified-repeat-btn ${modifiedMode[0] ? '' : 'modified-btn-visible'}`}
                onClick={repeatTransaction}
            ><FontAwesomeIcon icon='fa-solid fa-repeat'/>Repeat</button>
            <button
                className={`modified-transaction-button modified-delete-btn ${modifiedMode[0] ? '' : 'modified-btn-visible'}`}
                onClick={deleteTransaction}
            ><FontAwesomeIcon icon='fa-solid fa-trash'/>Delete</button>
            <button
                className={`modified-transaction-button-action ${modifiedMode[0] ? 'modified-btn-visible' : ''}`}
                style={{'--modified-btn-color': '#24e597'}}
                onClick={saveChanges}
            ><FontAwesomeIcon icon='fa-solid fa-check'/></button>
            <button
                className={`modified-transaction-button-action ${modifiedMode[0] ? 'modified-btn-visible' : ''}`}
                style={{'--modified-btn-color': '#ee3a3a'}}
                onClick={cancelChanges}
            ><FontAwesomeIcon icon='fa-solid fa-xmark'/></button>
            <Loader visible={[loader, setLoader]}></Loader>
        </div>
    )
}

export default ModifiedTransactionButtons