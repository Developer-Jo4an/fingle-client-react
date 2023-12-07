import React, {useRef} from 'react'
import Transaction from '../transaction/Transaction'

import { useAppContext } from '../../../application/AppProvider'
import { chunkTransactions } from '../../../my-functions/my-functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './transactions-section.css'

const TransactionSection = () => {

    const { transactions } = useAppContext()

    const infoValuesRefs = useRef([])

    const getInfoValues = chunk => {
        const [, arr] = chunk

        const counterObj = arr.reduce((acc, item) => {
            const logic = {
                expense: sum => ({...acc, expense: acc.expense += sum, total: acc.total -= sum}),
                income: sum => ({...acc, income: acc.income += sum, total: acc.total += sum}),
                transfer: () => acc
            }
            return logic[item.transactionType](item.count)
        }, {expense: 0, income: 0, total: 0})

        const { expense, income, total} = counterObj

        return (
            <>
                <div className={'transaction-info-value info-expense-value'}><FontAwesomeIcon icon='fa-solid fa-arrow-down'/>{expense}</div>
                <div className={'transaction-info-value info-income-value'}><FontAwesomeIcon icon='fa-solid fa-arrow-up'/>{income}</div>
                <div style={{'--info-total-color': total < 0 ? '#ee3a3a' : '#24e597'}} className={'transaction-info-value info-total-value'}>
                    <div className={'transaction-info-value-sigma-sign'}>Σ</div>{total}
                </div>
            </>
        )
    }

    const showHideInfoValues = i => {
        const values = infoValuesRefs.current[i]
        if (values.classList.contains('transaction-info-values-show')) values.classList.remove('transaction-info-values-show')
        else {
            values.style.setProperty('--info-values-show', `${values.scrollWidth}px`)
            values.classList.add('transaction-info-values-show')
        }
    }

    const arrayChunks = Object.entries(chunkTransactions(transactions[0]))

    return (
        <section className={'transaction-section'}>
            { arrayChunks.length ?
            arrayChunks.map((chunk, i) =>
            chunk.length &&
            <div key={chunk[0]} className={'transaction-chunk'}>
                <div className={'transaction-chunk-header'}>
                    <div className={'transaction-chunk-date'}>{chunk[0]}</div>
                    <div className={'transaction-chunk-info-wrapper'}>
                        <div
                            className={'transaction-chunk-info-button'}
                            onClick={() => showHideInfoValues(i)}
                        ><FontAwesomeIcon icon='fa-solid fa-info'/></div>
                        <div
                            ref={el => infoValuesRefs.current[i] = el}
                            className={'transaction-info-values-wrapper'}
                            onClick={() => showHideInfoValues(i)}
                        >{getInfoValues(chunk)}</div>
                    </div>
                </div>
                {chunk[1].map(transaction => (<Transaction key={transaction._id} transaction={transaction}/>))}
            </div>)
            :
            <div className={'no-transactions'}>No transactions found in this period</div>
            }
        </section>
    )
}

export default TransactionSection