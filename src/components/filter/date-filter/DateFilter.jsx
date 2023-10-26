import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useAppContext} from '../../../AppProvider'

import './date-filter.css'

const DateFilter = () => {

    const {periodMWS, period} = useAppContext()

    const appearanceModalWindow = () => periodMWS[1](true)

    return (
        <div onClick={appearanceModalWindow} className={'date-interval'}>
            <FontAwesomeIcon icon='fa-solid fa-calendar-days'/><div className={'date-interval-label'}>{period[0]}</div>
        </div>
    )
}

export default DateFilter