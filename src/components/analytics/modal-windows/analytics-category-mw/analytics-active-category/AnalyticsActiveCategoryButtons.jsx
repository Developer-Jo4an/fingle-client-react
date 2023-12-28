import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppContext } from '../../../../../application/AppProvider'
import { useAnalyticsContext } from '../../../AnalyticsProvider'

import './analytics-active-category-buttons.css'

const AnalyticsActiveCategoryButtons = () => {

    const { filter, page, filterEls } = useAppContext()
    const { activeCategory } = useAnalyticsContext()
    if (!Object.keys(activeCategory[0]).length) return null

    const { categoryName, obj } = activeCategory[0]

    const filterBtnClick = () => {
        page[1]('transactions')
        filter[1]({ transactionType: [], account: [], category: [categoryName] })
        filterEls[1]([{ id: categoryName, label: categoryName, icon: obj.sign, color: obj.color }])
    }

    const addTransactionClick = () => alert('See you soooooon, boy! (Youel Romero)')

    return (
        <div className={'active-category-buttons'}>
            <div
                className={'active-category-btn'}
                onClick={filterBtnClick}
            ><FontAwesomeIcon icon='fa-solid fa-filter'/></div>
            <div
                className={'active-category-btn'}
                onClick={addTransactionClick}
            ><FontAwesomeIcon icon='fa-solid fa-plus'/></div>
        </div>
    )
}

export default AnalyticsActiveCategoryButtons