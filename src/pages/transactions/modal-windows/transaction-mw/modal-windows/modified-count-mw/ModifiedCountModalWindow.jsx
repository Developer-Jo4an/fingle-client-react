import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useModifiedTransactionContext } from '../../ModifiedTransactionProvider'
import { useTransactionsContext } from '../../../../general/TransactionsProvider'

import './modified-count-modal-window.css'

const ModifiedCountModalWindow = () => {

    const { modifiedTransaction } = useTransactionsContext()
    const [modified, dispatch] = modifiedTransaction
    const { modifiedCountMWS, refs } = useModifiedTransactionContext()

    const getColor = () => {
        const colorLogic = {
            expense: '#ee3a3a',
            income: '#24e597',
            transfer: '#f5d544',
        }
        return colorLogic[modified.transactionType]
    }

    const [result, setResult] = useState('0')

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
        {value: 'none', label: <div></div>, type: 'none'},
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

    const calculatorChange = item => {
        const handleError = () => {
            setResult('0')
            refs.modifiedCountRef.current.classList.add('error-animation')
            setTimeout(() => refs.modifiedCountRef.current.classList.remove('error-animation'), 700)
        }

        const equals = res => {
            try {
                const result = eval(res)
                if (result <= 0) handleError()
                else {
                    if (result.toString().includes('.')) { setResult(result.toFixed(2).toString()) }
                    else setResult(result.toString())
                }
            } catch (e) { handleError() }
        }

        const apply = res => {
            try {
                const result = eval(res)
                if (result <= 0) handleError()
                else {
                    if (result.toString().includes('.')) dispatch({ type: 'count', count: +result.toFixed(2) })
                    else dispatch({ type: 'count', count: +result })
                    setResult('0')
                    modifiedCountMWS[1](false)
                }
            } catch (e) { handleError() }
        }

        const {type, value, sign} = item
        switch (type) {
            case 'number' : setResult(prev => {
                if (prev === '0') return value === '.' ? prev + value : value
                else return prev + value
            }); break
            case 'action' : setResult(prev => prev + sign); break
            case 'delete' : setResult(prev => {
                if (prev.length === 1) return '0'
                if (prev.at(-1) === ' ') return prev.slice(0, prev.length - 3)
                else return prev.slice(0, prev.length - 1)
            }); break
            case 'close' : modifiedCountMWS[1](false); break
            case 'equals' : equals(result); break
            case 'apply' : apply(result); break
        }
    }

    return (
        <div className={'modified-count-modal-window'}>
            <input
                ref={ refs.modifiedCountRef }
                value={ result }
                type='text'
                className={'modified-count-input'}
                style={{ color: getColor() }}
                onChange={() => {}}
            />
            <div className={'modified-count-calculator'}>
                {calculatorArr.map(item => (
                    <div
                        key={ item.value }
                        className={'modified-calculator-btn'}
                        onClick={() => calculatorChange(item)}
                    >{ item.label }</div>
                ))}
            </div>
        </div>
    )
}

export default ModifiedCountModalWindow