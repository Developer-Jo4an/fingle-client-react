import React from 'react'
import AnalyticsActiveCategory from './analytics-active-category/AnalyticsActiveCategory'
import AnalyticsActiveCategoryButtons from './analytics-active-category/AnalyticsActiveCategoryButtons'
import ActiveSubCategories from './analytics-active-category/ActiveSubCategories'
import CloseModalWindowBtn from '../../../../UI/close-modal-window-btn/CloseModalWindowBtn'

import {useAnalyticsContext} from '../../AnalyticsProvider'

import './analytics-category-modal-window.css'

const AnalyticsCategoryModalWindow = () => {

    const { categoryMWS } = useAnalyticsContext()

    return (
        <div className={'analytics-active-category-section'}>
            <CloseModalWindowBtn setVision={categoryMWS[1]}/>
            <AnalyticsActiveCategory/>
            <ActiveSubCategories/>
            <AnalyticsActiveCategoryButtons/>
        </div>
    )
}

export default AnalyticsCategoryModalWindow