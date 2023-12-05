import React, {useEffect, useState} from 'react'
import Loader from '../../../../loader/Loader'

import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { userId } from '../../../../../my-functions/my-functions'
import {useAddTransactionContext} from '../AddTransactionProvider'
import {useAppContext} from '../../../../../application/AppProvider'
import {useTransactionsContext} from '../../../transactions/TransactionsProvider'

import './calculator.css'

const Calculator = () => {

    const {user} = useAppContext()
    const {addMWS} = useTransactionsContext()
    const {newTransaction, refs, messageMWS, loader, result} = useAddTransactionContext()
    const [futureTransaction, dispatch] = newTransaction
    const [apply, setApply] = useState(false)

    const successRequest = data => {
        if (data.status) {
            const { transactions, allCards } = data
            user[1](prev => ({...prev, transactions, allCards}))
        } else return new Error(data.message)
    }

    useEffect(() => {
        if (apply) {
            const transactionRequestFunction = async () => {
                try {
                    loader[1](true)
                    const transactionsRequest = await axios.post(`${userId}/add-transaction`, { transaction: futureTransaction })

                    const answer = successRequest(transactionsRequest.data)
                    if (answer instanceof Error) throw answer

                } catch (e) { alert('Request error(400)')
                } finally {
                    loader[1](false)
                    addMWS[1](false)
                    setApply(false)
                    dispatch({type: 'zeroing'})
                    result[1]('0')
                }
            }
            transactionRequestFunction()
        }
    }, [apply])



    const calculatorChange = item => {
        const handleError = ref => {
            ref.current.classList.add('error-animation')
            setTimeout(() => ref.current.classList.remove('error-animation'), 700)
        }

        const checker = () => {
            if (!futureTransaction.transactionType) {alert('No type'); return false}
            if (!futureTransaction.date) {alert('No date'); return false}
            if (!futureTransaction.card) {handleError(refs.card); return false}
            if (!futureTransaction.count) {handleError(refs.count); return false}

            const checkerLogic = {
                expense: () => {if (!futureTransaction.category) {handleError(refs.expense); return false} else return true},
                income: () => {if (!futureTransaction.category) {handleError(refs.income); return false} else return true},
                transfer: () => {if (!futureTransaction.transferCard) {handleError(refs.transfer); return false} else return true},
            }
            return checkerLogic[futureTransaction.transactionType]()
        }

        const equals = res => {
            try {
                const result = eval(res)
                if (result <= 0) handleError(refs.count)
                else {
                    if (result.toString().includes('.')) {result[1](result.toFixed(2).toString())}
                    else result[1](result.toString())
                }
            } catch (e) {handleError(refs.count)}
        }

        const apply = res => {
            try {
                const count = eval(res)
                if (count <= 0) handleError(refs.count)
                else {
                    if (checker()) {
                        if (count.toString().includes('.')) {
                            dispatch({type: 'count', count: count.toFixed(2)})
                            result[1](count.toFixed(2).toString())
                        }
                        else {
                            dispatch({type: 'count', count: count})
                            result[1](count.toString())
                            setApply(true)
                        }
                        setApply(true)
                    }
                }
            } catch (e) { handleError(refs.count) }
        }
        const {type, value, sign} = item
        switch (type) {
            case 'number' : result[1](prev => {
                if (prev === '0') return value === '.' ? prev + value : value
                else return prev + value
            }); break
            case 'action' : result[1](prev => prev + sign); break
            case 'delete' : result[1](prev => {
                if (prev.length === 1) return '0'
                if (prev.at(-1) === ' ') return prev.slice(0, prev.length - 3)
                else return prev.slice(0, prev.length - 1)
            }); break
            case 'close' : addMWS[1](false); break
            case 'equals' : equals(result[0]); break
            case 'apply' : apply(result[0]); break
            case 'message' : messageMWS[1](true); break
        }

    }

    const calculatorArr = [
        {value: 'divide', label: <FontAwesomeIcon icon='fa-solid fa-divide'/>, sign: ' / ', type: 'action'},
        {value: '7', label: '7', type: 'number'},
        {value: '8', label: '8', type: 'number'},
        {value: '9', label: '9', type: 'number'},
        {value: 'delete', label: <FontAwesomeIcon icon='fa-solid fa-delete-left'/>, type: 'delete'},
        {value: 'multiply', label: <FontAwesomeIcon icon='fa-solid fa-multiply'/>, sign: ' * ', type: 'action'},
        {value: '4', label: '4', type: 'number'},
        {value: '5', label: '5', type: 'number'},
        {value: '6', label: '6', type: 'number'},
        {value: 'message', label: <FontAwesomeIcon icon='fa-solid fa-message'/>, type: 'message'},
        {value: 'minus', label: <FontAwesomeIcon icon='fa-solid fa-minus'/>, sign: ' - ', type: 'action'},
        {value: '1', label: '1', type: 'number'},
        {value: '2', label: '2', type: 'number'},
        {value: '3', label: '3', type: 'number'},
        {value: 'equals', label: <FontAwesomeIcon icon='fa-solid fa-equals'/>, type: 'equals'},
        {value: 'plus', label: <FontAwesomeIcon icon='fa-solid fa-plus'/>, sign: ' + ', type: 'action'},
        {value: 'close', label: <FontAwesomeIcon style={{color: '#ee3a3a'}}  icon='fa-solid fa-arrow-right-from-bracket' rotation={180}/>, type: 'close'},
        {value: '0', label: '0', type: 'number'},
        {value: '.', label: '.', type: 'number'},
        {value: 'apply', label: <FontAwesomeIcon style={{color: '#24e597'}} icon='fa-solid fa-check'/>, type: 'apply'}
    ]

    return (
        <div className={'calculator'}>
            {calculatorArr.map(item => (
                <div
                    key={item.value}
                    className={'calculator-btn'}
                    onClick={() => calculatorChange(item)}
                >{item.label}</div>
            ))}
            <Loader visible={loader}/>
        </div>
    )
}

export default Calculator