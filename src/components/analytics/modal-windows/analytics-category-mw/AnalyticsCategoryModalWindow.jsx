import React from 'react'

import AnalyticsActiveCategory from './analytics-active-category/AnalyticsActiveCategory'
import AnalyticsActiveCategoryButtons from './analytics-active-category/AnalyticsActiveCategoryButtons'
import ActiveSubCategories from './analytics-active-category/ActiveSubCategories'

import './analytics-category-modal-window.css'

const AnalyticsCategoryModalWindow = () => {
    return (
        <div className={'analytics-active-category-section'}>
            <AnalyticsActiveCategory/>
            <ActiveSubCategories/>
            <AnalyticsActiveCategoryButtons/>
        </div>
    )
}

export default AnalyticsCategoryModalWindow