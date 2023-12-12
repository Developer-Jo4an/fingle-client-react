import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppContext } from '../../../application/AppProvider'
import { roundUp } from '../../../my-functions/my-functions'

import './period-total-section.css'

const PeriodTotalSection = () => {

    const { total } = useAppContext()

    return (
        <div className={'period-total-section'}>
            <div className={'period-total-wrapper'}>
                <div className={'period-total'}>
                    <div className={'period-total-header'}>Expense <FontAwesomeIcon icon='fa-solid fa-arrow-down'/></div>
                    <div className={'total-period-value total-period-value-expense'}>{ roundUp(total[0].expense) } $</div>
                </div>
                <div className={'period-total'}>
                    <div className={'period-total-header'}>Income <FontAwesomeIcon icon='fa-solid fa-arrow-up'/></div>
                    <div className={'total-period-value total-period-value-income'}>{ roundUp(total[0].income) } $</div></div>
                <div className={'between-line'}></div>
                <div className={'period-total'}>
                    <div className={'period-header total-for-the-period'}>Total</div>
                    <div className={'total-period-value total-for-the-period'}>{ roundUp(total[0].total) } $</div>
                </div>
            </div>
        </div>
    )
}

export default PeriodTotalSection