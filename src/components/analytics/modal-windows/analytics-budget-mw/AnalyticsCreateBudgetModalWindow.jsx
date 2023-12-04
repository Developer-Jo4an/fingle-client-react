import React from 'react'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useAnalyticsContext} from '../../AnalyticsProvider'

import './analytics-budget-modal-window.css'

const AnalyticsCreateBudgetModalWindow = () => {

    const { createBudgetMWS } = useAnalyticsContext()

    return (
        <div className={'analytics-create-budget-modal-window'}>
            <div
                className={'analytics-create-budget-header'}
                onClick={() => createBudgetMWS[1](false)}
            >
                <h3>Create budget</h3>
                <div className={'analytics-create-budget-close-modal-window-btn'}><FontAwesomeIcon icon='fa-solid fa-xmark'/></div>
            </div>
            <div className={'analytics-create-budget-section'}>
                <div className={'analytics-create-budget-btns'}>
                    <div className={'analytics-create-budget-modal-window-btn create-budget-modal-window-btn-create'}>Create</div>
                    <div className={'analytics-create-budget-modal-window-btn create-budget-modal-window-btn-reset'}>Reset</div>
                </div>
            </div>
        </div>
    )
}

export default AnalyticsCreateBudgetModalWindow