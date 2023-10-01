import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { dateObj } from '../../../my-functions/my-functions'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'


import './date-filter-arrows.css'
const DateFilterArrows = ({interval, setInterval, setDateFilterVisible}) => {


    const arrowClick = dir => {
        let period = dateObj(interval)

        const modifiedDate = (period) => {
            const diff = moment(period[1]).diff(period[0], 'days') + 1
            period = period.map(date => moment(date)[dir](diff, 'days')._d.toLocaleDateString())
            period = period[0] === period[1] ? period[0] : period.join(' - ')
            setInterval(period)
        }

        if (period) modifiedDate(period)
        else {
            if (interval.includes(' - ')) modifiedDate(interval.split(' - ').map(date => moment(date, 'DD.MM.YYYY')._d))
            else modifiedDate([moment(interval, 'DD.MM.YYYY')._d, moment(interval, 'DD.MM.YYYY')._d])
        }
    }

     return (
        <div className={'date-interval-arrows'}>
            <div
                className={'date-interval-arrow'}
                onClick={() => arrowClick('subtract')}
            ><FontAwesomeIcon icon={faAngleLeft}/></div>
            <div
                className={'date-interval-arrow'}
                onClick={() => arrowClick('add')}
            ><FontAwesomeIcon icon={faAngleRight}/></div>
        </div>
    )
}

export default DateFilterArrows