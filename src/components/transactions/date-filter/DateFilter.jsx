import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import {useTransactionsContext} from '../transactions/TransactionsProvider'

import './date-filter.css'

const DateFilter = () => {

    const {periodMWS, period} = useTransactionsContext()

    const appearanceModalWindow = () => periodMWS[1](true)

    return (
        <div onClick={appearanceModalWindow} className={'date-interval'}>
            <FontAwesomeIcon icon={faCalendarDays}/><div className={'date-interval-label'}>{period[0]}</div>
        </div>
    )
}

export default DateFilter