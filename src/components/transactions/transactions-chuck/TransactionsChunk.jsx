import React, {useRef} from 'react'
import Transaction from '../transaction/Transaction'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'

import './transaction-chunk.css'

const TransactionsChunk = ({chunk, index, setTransactionObject, setTransactionMW, setCopy}) => {

    const [date, array] = chunk

    const countRefs = useRef([])

    const addWidth = i => {
        const el = countRefs.current[i].lastElementChild
        const prevWidth = el.style.width
        const newWidth = `${el.scrollWidth}px`
        el.style.width = prevWidth === '0px' ? newWidth : '0px'
    }

    const total = array.reduce((acc, item) => {
        const {transactionType, count} = item
        switch (transactionType) {
            case 'expense': { acc.expense += count; acc.total -= count} break
            case 'income': {acc.income += count; acc.total -= count} break
        }
        return acc
    }, {expense: 0, income: 0, total: 0})

    const getTotal = () => ({color: total.expense > total.income ?
            '#ee3a3a' : total.expense < total.income ? '#24e597' : '#f5d544'})

    return (
        <div
            key={array[0]._id}
            className={'transaction-chunk'}
        >
            <div className={'transaction-chunk-header'}>
                <div className={'transaction-chunk-date'}>{date}</div>
                <div
                    ref={el => countRefs.current[index] = el}
                    className={'transaction-chunk-count-info'}
                    onClick={() => addWidth(index)}
                ><FontAwesomeIcon className={'transaction-chunk-i'} icon={faInfo}/>
                    <div
                        className={'transaction-chunk-count-total'}
                        style={{width: 0}}
                    >
                        <div style={{color: '#ee3a3a'}}>-{total.expense}$</div>
                        <div style={{color: '#24e597'}}>{total.income}$</div>
                        <div
                            style={getTotal()}
                            className={'transaction-chunk-total-total'}>Σ{total.total}$
                        </div>
                    </div>
                </div>
            </div>
            {array.map(transaction => <Transaction
                key={`${transaction._id}${Math.random()}`}
                transaction={transaction}
                setTransactionObject={setTransactionObject}
                setTransactionMW={setTransactionMW}
                setCopy={setCopy}
            />)}
        </div>
    )
}

export default TransactionsChunk
