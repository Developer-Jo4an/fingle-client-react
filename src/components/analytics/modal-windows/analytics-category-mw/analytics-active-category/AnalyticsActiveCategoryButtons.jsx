import React from 'react'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useAppContext} from '../../../../../AppProvider'
import {useAnalyticsContext} from '../../../analytics/AnalyticsProvider'

import './analytics-active-category-buttons.css'

const AnalyticsActiveCategoryButtons = () => {

    const {filter, page, filterEls} = useAppContext()
    const {activeCategory} = useAnalyticsContext()

    if (!Object.keys(activeCategory[0]).length) return null

    const {categoryName, obj} = activeCategory[0]

    const setPage = () => page[1]('transactions')
    const setFilter = () => filter[1]({transactionType: [], card: [], category: [categoryName]})
    const setFilterEls = () => filterEls[1]([{id: categoryName, label: categoryName, icon: obj.sign, color: obj.color}])

    return (
        <div className={'active-category-buttons'}>
            <div
                className={'active-category-btn'}
                onClick={() => {setPage(); setFilter(); setFilterEls()}}
            ><FontAwesomeIcon icon='fa-solid fa-filter'/></div>
            <div className={'active-category-btn'}><FontAwesomeIcon icon='fa-solid fa-plus'/></div>
        </div>
    )
}

export default AnalyticsActiveCategoryButtons