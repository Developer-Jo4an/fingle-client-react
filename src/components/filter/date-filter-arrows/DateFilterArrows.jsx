import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { dateObj } from '../../../my-functions/my-functions'
import moment from 'moment'
import {useAppContext} from '../../../AppProvider'

import './date-filter-arrows.css'

const DateFilterArrows = () => {

    const {period} = useAppContext()

    const arrowClick = dir => {

        if (period[0] === 'All time') return null

        let interval = dateObj(period[0])
        const modifiedDate = interval => {
            const diff = moment(interval[1]).diff(interval[0], 'days') + 1
            interval = interval.map(date => moment(date)[dir](diff, 'days')._d.toLocaleDateString())
            interval = interval[0] === interval[1] ? interval[0] : interval.join(' - ')
            period[1](interval)
        }

        if (interval) modifiedDate(interval)
        else {
            if (period[0].includes(' - ')) modifiedDate(period[0].split(' - ').map(date => moment(date, 'DD.MM.YYYY')._d))
            else modifiedDate([moment(period[0], 'DD.MM.YYYY')._d, moment(period[0], 'DD.MM.YYYY')._d])
        }
    }

     return (
        <div className={'date-interval-arrows'}>
            <div
                className={`date-interval-arrow ${period[0] === 'All time' ? 'date-interval-arrow-block' : ''}`}
                onClick={() => arrowClick('subtract')}
            ><FontAwesomeIcon icon={faAngleLeft}/></div>
            <div
                className={`date-interval-arrow ${period[0] === 'All time' ? 'date-interval-arrow-block' : ''}`}
                onClick={() => arrowClick('add')}
            ><FontAwesomeIcon icon={faAngleRight}/></div>
        </div>
    )
}

export default DateFilterArrows