import React from 'react'

import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCheck,
    faDeleteLeft,
    faDivide,
    faEquals,
    faMessage,
    faMinus,
    faMultiply,
    faPlus,
    faXmark
} from '@fortawesome/free-solid-svg-icons'
import { formattedInterval, formattedTransactions, userId } from '../../../../../my-functions/my-functions'

import './calculator.css'

const Calculator = ({Ref, state, setState, setMWVisible, messageVisible, interval, setTransactions, allCards}) => {
    const saveTransaction = () => {
        try {
            const transactionRequest = async interval => {
                const transaction = {}
                for (const key in state) key === 'type' ? transaction.transactionType = state[key] : transaction[key] = state[key]
                let transactionsData = await axios.post(`${userId}/add-transaction`, {interval, transaction})
                const filteredTransactions = formattedTransactions(transactionsData)
                setTransactions(filteredTransactions)
                setState({
                    type: 'expense',
                    date: new Date(),
                    card: {
                        _id: allCards[0]._id,
                        cardName: allCards[0].cardName,
                        bankName: allCards[0].bankName
                    },
                    count: '0'
                })
            }
            setMWVisible(false)
            setTransactions(['loader'])
            transactionRequest(formattedInterval(interval))
        } catch (e) {setTransactions([])}
    }

    const calculatorChange = item => {

        const counter = count => {
            try {
                const result = eval(count)
                if (result < 0) {
                    Ref.current.classList.add('error-animation')
                    setTimeout(() => Ref.current.classList.remove('error-animation'), 700)
                } else {
                    let strRes = result.toFixed(1).toString()
                    return strRes.at(-1) === '0' ? strRes.slice(0, -2) : strRes
                }

            } catch (e) {
                Ref.current.classList.add('error-animation')
                setTimeout(() => Ref.current.classList.remove('error-animation'), 700)
                return null
            }
        }
        const {type} = item
        switch (type) {
            case 'number': {
                setState(prev => ({...prev, count: prev.count === '0' ? item.value : prev.count + item.value}))
                break
            }
            case 'action': {
                setState(prev => ({...prev, count: prev.count + item.sign}))
                break
            }
            case 'delete': {
                const checker = count => count === '' ? '0' : count
                setState(prev => {
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
                const result = counter(state.count)
                setState(prev => result ? {...prev, count: result} : prev)
                break
            }
            case 'apply': {
                const result = counter(state.count)
                setState(prev => result ? {...prev, count: result} : prev)
                saveTransaction()
                break
            }
            case 'close': {
                setMWVisible(false)
                break
            }
            case 'message': {
                messageVisible(true)
                break
            }
        }
    }

    const calculatorArr = [
        {value: 'divide', label: <FontAwesomeIcon icon={faDivide}/>, sign: ' / ', type: 'action'},
        {value: '7', label: '7', type: 'number'},
        {value: '8', label: '8', type: 'number'},
        {value: '9', label: '9', type: 'number'},
        {value: 'delete', label: <FontAwesomeIcon icon={faDeleteLeft}/>, type: 'delete'},
        {value: 'multiply', label: <FontAwesomeIcon icon={faMultiply}/>, sign: ' * ', type: 'action'},
        {value: '4', label: '4', type: 'number'},
        {value: '5', label: '5', type: 'number'},
        {value: '6', label: '6', type: 'number'},
        {value: 'message', label: <FontAwesomeIcon icon={faMessage}/>, type: 'message'},
        {value: 'minus', label: <FontAwesomeIcon icon={faMinus}/>, sign: ' - ', type: 'action'},
        {value: '1', label: '1', type: 'number'},
        {value: '2', label: '2', type: 'number'},
        {value: '3', label: '3', type: 'number'},
        {value: 'equals', label: <FontAwesomeIcon icon={faEquals}/>, type: 'equals'},
        {value: 'plus', label: <FontAwesomeIcon icon={faPlus}/>, sign: ' + ', type: 'action'},
        {value: 'close', label: <FontAwesomeIcon style={{color: '#ee3a3a'}} icon={faXmark}/>, type: 'close'},
        {value: '0', label: '0', type: 'number'},
        {value: '.', label: '.', type: 'number'},
        {value: 'apply', label: <FontAwesomeIcon style={{color: '#24e597'}} icon={faCheck}/>, type: 'apply'},
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
        </div>
    )
}

export default Calculator