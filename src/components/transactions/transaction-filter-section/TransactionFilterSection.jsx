import React from 'react'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useTransactionsContext} from '../transactions/TransactionsProvider'

import './transaction-filter-section.css'

const TransactionFilterSection = () => {

    const {filterEls, filter} = useTransactionsContext()

    const deleteProperty = el => {
        filterEls[1](prev => prev.filter(item => item.id !== el.id))
        filter[1](prev => {
            const newFilter = {}
            for (const key in prev) newFilter[key] = prev[key].filter(item => item !== el.id)
            return newFilter
        })
    }

    return (
        <div className={'transaction-filters-section'}>
            <div className={'filter-elements-wrapper'}>
                {filterEls[0].map(el => (
                    <div
                        key={el.id}
                        className={'filter-element'}
                        style={{'--filter-element-color': el.color}}
                        onClick={() => deleteProperty(el)}
                    ><FontAwesomeIcon icon={el.icon}/>{el.label}<FontAwesomeIcon icon='fa-solid fa-xmark'/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TransactionFilterSection