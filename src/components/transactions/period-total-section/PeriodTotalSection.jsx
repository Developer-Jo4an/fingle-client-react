import React from 'react'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import './period-total-section.css'

const PeriodTotalSection = ({total}) => {
    return (
        <div className={'period-total-section'}>
            <div className={'period-total-wrapper'}>
                <div className={'period-total'}>
                    <div className={'period-total-header'}>Expense <FontAwesomeIcon icon='fa-solid fa-arrow-down'/></div>
                    <div className={'total-period-value total-period-value-expense'}>{total.expense} $</div>
                </div>
                <div className={'period-total'}>
                    <div className={'period-total-header'}>Income <FontAwesomeIcon icon='fa-solid fa-arrow-up'/></div>
                    <div className={'total-period-value total-period-value-income'}>{total.income} $</div></div>
                <div className={'between-line'}></div>
                <div className={'period-total'}>
                    <div className={'period-header total-for-the-period'}>Total</div>
                    <div className={'total-period-value total-for-the-period'}>{total.total} $</div>
                </div>
            </div>
        </div>
    )
}

export default PeriodTotalSection