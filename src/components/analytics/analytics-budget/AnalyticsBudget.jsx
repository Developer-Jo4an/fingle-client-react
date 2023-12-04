import React from 'react'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useAnalyticsContext} from '../AnalyticsProvider'

import './analytics-budget.css'

const AnalyticsBudget = () => {

    const { createBudgetMWS } = useAnalyticsContext()

    return (
        <div className={'analytics-budget'}>
            <div className={'analytics-budget-header'}>
                <h2>Budget</h2>
                <div
                    className={'analytics-create-budget-btn'}
                    onClick={() => createBudgetMWS[1](true)}
                >
                    <div className={'analytics-create-budget-btn__label'}>Create budget</div>
                    <FontAwesomeIcon icon='fa-solid fa-plus'/>
                </div>
            </div>
        </div>
    )
}

export default AnalyticsBudget