import React, {useEffect, useRef} from 'react'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faCheck,
    faDeleteLeft,
    faDivide,
    faEquals,
    faMinus,
    faMultiply,
    faPlus, faXmark
} from '@fortawesome/free-solid-svg-icons'

import './modified-transaction-calc.css'

const ModifiedTransactionCalc = ({transactionObject, setTransactionObject, setCalcVisible, calcVisible}) => {

    const inputWr = useRef()

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
        {value: 'empty', label: (<div></div>), type: 'empty'},
        {value: 'minus', label: <FontAwesomeIcon icon={faMinus}/>, sign: ' - ', type: 'action'},
        {value: '1', label: '1', type: 'number'},
        {value: '2', label: '2', type: 'number'},
        {value: '3', label: '3', type: 'number'},
        {value: 'equals', label: <FontAwesomeIcon icon={faEquals}/>, type: 'equals'},
        {value: 'plus', label: <FontAwesomeIcon icon={faPlus}/>, sign: ' + ', type: 'action'},
        {value: 'empty2', label: (<div></div>), type: 'empty'},
        {value: '0', label: '0', type: 'number'},
        {value: '.', label: '.', type: 'number'},
        {value: 'apply', label: <FontAwesomeIcon style={{color: '#24e597'}} icon={faCheck}/>, type: 'apply'},
    ]

    const counter = count => {
        try {
            const result = eval(count)
            if (result < 0) {
                inputWr.current.classList.add('error-animation')
                setTimeout(() => inputWr.current.classList.remove('error-animation'), 700)
            } else {
                let strRes = result.toFixed(1).toString()
                return strRes.at(-1) === '0' ? strRes.slice(0, -2) : strRes
            }
        } catch (e) {
            inputWr.current.classList.add('error-animation')
            setTimeout(() => inputWr.current.classList.remove('error-animation'), 700)
            return null
        }
    }

    useEffect(() => {
        if (!calcVisible) {
            const result = counter(transactionObject.count)
            setTransactionObject(prev => result ? {...prev, count: result} : {...prev, count: '0'})
        }
    }, [calcVisible])

    const calculatorChange = item => {

        const {type} = item

        switch (type) {
            case 'number': {
                setTransactionObject(prev => ({...prev, count: prev.count === '0' ? item.value : prev.count + item.value}))
                break
            }
            case 'action': {
                setTransactionObject(prev => ({...prev, count: prev.count + item.sign}))
                break
            }
            case 'equals': {
                const result = counter(transactionObject.count)
                setTransactionObject(prev => result ? {...prev, count: result} : {...prev, count: '0'})
                break
            }
            case 'delete': {
                const checker = count => count === '' ? '0' : count
                setTransactionObject(prev => {
                    const count = prev.count.toString()
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
            case 'apply': {
                const result = counter(transactionObject.count)
                setTransactionObject(prev => result ? {...prev, count: result} : {...prev, count: '0'})
                setCalcVisible(false)
                break
            }
        }
    }

    return (
        <div className={'modified-transaction-calc-modal-window'}>
            <div ref={inputWr} className={'modified-transaction-input-wrapper'}>
                <div className={'modified-transaction-input'}>{transactionObject.count}</div>
            </div>
            <div className={'modified-transaction-calc'}>
                {calculatorArr.map(btn => (
                    <div
                        key={btn.value}
                        className={'calculator-btn'}
                        onClick={() => calculatorChange(btn)}
                    >{btn.label}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ModifiedTransactionCalc;