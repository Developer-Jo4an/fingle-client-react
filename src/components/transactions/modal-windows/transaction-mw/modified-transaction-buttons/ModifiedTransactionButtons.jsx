import React, {useState} from 'react'
import Loader from '../../../../loader/Loader'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useModifiedTransactionContext} from '../ModifiedTransactionProvider'
import {useTransactionsContext} from '../../../transactions/TransactionsProvider'
import {useAppContext} from '../../../../../AppProvider'
import axios from 'axios'
import {userId} from '../../../../../my-functions/my-functions'

import './modified-transaction-buttons.css'

const ModifiedTransactionButtons = () => {

    const {modifiedMode} = useModifiedTransactionContext()
    const {modifiedTransaction, prevTransaction, transactionMWS} = useTransactionsContext()
    const [modified, dispatch] = modifiedTransaction
    const {user} = useAppContext()

    const [loader, setLoader] = useState(false)

    const endOperation = () => { transactionMWS[1](false); setLoader(false) }

    const successRequest = data => {
        if (data.status) {
            const { transactions, allCards } = data
            user[1](prev => ({...prev, transactions, allCards}))
        } else return new Error(data.message)
    }

    const repeatTransaction = async () => {
        let repeatedTransaction = {}
        for (const key in prevTransaction[0]) if (key !== '_id') repeatedTransaction[key] = prevTransaction[0][key]
        repeatedTransaction = {...repeatedTransaction, date: new Date()}

        try {
            setLoader(true)

            const transactionsRequest = await axios.post(`${userId}/add-transaction`, {transaction: repeatedTransaction})

            const answer = successRequest(transactionsRequest.data)
            if (answer instanceof Error) throw answer
        }
        catch (e) { alert(e.message) }
        finally { endOperation() }
    }

    const deleteTransaction = async () => {
        try {
            setLoader(true)

            const transactionsRequest = await axios.delete(`${userId}/delete-transaction/${prevTransaction[0]._id}`)

            const answer = successRequest(transactionsRequest.data)
            if (answer instanceof Error) throw answer
        }
        catch (e) { alert(e.message) }
        finally { endOperation() }
    }

    const saveChanges = async () => {

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
            try {
                setLoader(true)

                const transactionsRequest = await axios.put(`${userId}/modified-transaction`, { modified: modified })

                const answer = successRequest(transactionsRequest.data)
                if (answer instanceof Error) throw answer
            }
            catch (e) { alert(e.message) }
            finally { endOperation() }
        } else {
            console.log(typeof modified.count)
            dispatch({type: 'set', transaction: prevTransaction[0]})
            alert('Transaction change error, please try this later!')
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