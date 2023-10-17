import React, {useEffect} from 'react'
import Loader from '../../../../loader/Loader'

import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { userId } from '../../../../../my-functions/my-functions'
import {useAddTransactionContext} from '../AddTransactionProvider'
import {useContextApp} from '../../../../../AppProvider'
import {useTransactionsContext} from '../../../transactions/TransactionsProvider'

import './calculator.css'

const Calculator = () => {

    const {user} = useContextApp()
    const {addMWS} = useTransactionsContext()
    const {newTransaction, refs, messageMWS, loader} = useAddTransactionContext()

    useEffect(() => {
        const checkCard = () => {
            if (newTransaction[0].card) return true
            else {
                refs.card.current.classList.add('error-animation')
                setTimeout(() => refs.card.current.classList.remove('error-animation'), 700)
                return false
            }
        }

        const checkProperty = (nav, key) => {
            if (checkCard()) {
                if (newTransaction[0][key]) return true
                else {
                    refs[nav].current.classList.add('error-animation')
                    setTimeout(() => refs[nav].current.classList.remove('error-animation'), 700)
                    return false
                }
            } else return false
        }

        const checkLogic = {
            expense: () => checkProperty('expense', 'category'),
            income: () => checkProperty('income', 'category'),
            transfer: () => checkProperty('transfer', 'transferCard'),
        }
        if (loader[0]) {
            if (checkLogic[newTransaction[0].transactionType]()) {
                addMWS[1](false)
                const addTransactionRequest = async () => {
                    try {
                        const updatedTransactions = await axios.post(`${userId}/add-transaction`, {transaction: newTransaction[0]})
                        user[1](prev => ({...prev, transactions: updatedTransactions.data}))
                        newTransaction[1]({
                            transactionType: 'expense',
                            date: new Date(),
                            count: '0'
                        })
                        loader[1](false)
                    } catch (e) {user[1](prev => {console.log(e); return prev})}
                }
                addTransactionRequest()
            }
        }
    }, [loader[0]])

    const calculatorChange = item => {
        const counter = count => {
            try {
                const result = eval(count)
                if (result < 0) {
                    refs.count.current.classList.add('error-animation')
                    setTimeout(() => refs.count.current.classList.remove('error-animation'), 700)
                } else {
                    let strRes = result.toFixed(1).toString()
                    return strRes.at(-1) === '0' ? strRes.slice(0, -2) : strRes
                }

            } catch (e) {
                refs.count.current.classList.add('error-animation')
                setTimeout(() => refs.count.current.classList.remove('error-animation'), 700)
                return null
            }
        }
        const {type} = item
        switch (type) {
            case 'number': {
                newTransaction[1](prev => ({...prev, count: prev.count === '0' ? item.value : prev.count + item.value}))
                break
            }
            case 'action': {
                newTransaction[1](prev => ({...prev, count: prev.count + item.sign}))
                break
            }
            case 'delete': {
                const checker = count => count === '' ? '0' : count
                newTransaction[1](prev => {
                    const {count} = prev
                    if (count.at(-1) === ' ') {
                        const newCount = count.slice(0, count.length - 3)
                        return {...prev, count: checker(newCount)}
                    }
                    else {
                        const newCount = count.slice(0, count.length - 1)
                        return {...prev, count: checker(newCount)}
                    }
                })
                break
            }
            case 'equals': {
                const result = counter(newTransaction[0].count)
                newTransaction[1](prev => result ? {...prev, count: result} : prev)
                break
            }
            case 'apply': {
                const result = counter(newTransaction[0].count)
                newTransaction[1](prev => {
                    if (result) return {...prev, count: result}
                    else return prev
                })
                if (result) loader[1](true)
                break
            }
            case 'close': {
                addMWS[1](false)
                break
            }
            case 'message': {
                messageMWS[1](true)
                break
            }
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
        {value: 'close', label: <FontAwesomeIcon style={{color: '#ee3a3a'}} icon='fa-solid fa-xmark'/>, type: 'close'},
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