import React, {useCallback, useRef, useState} from 'react'
import Datepicker from '../../../datepicker/Datepicker'

import AirDatepicker from 'air-datepicker'

import 'air-datepicker/air-datepicker.css'
import './date-filter-modal-window.css'

const DateFilterModalWindow = ({interval, setInterval, setDateFilterVisible}) => {

    const dateFilterBtns = [{id: 'Today'}, {id: 'Week'}, {id: 'Month'}, {id: 'Year'}, {id: 'All time'}]

    const inputRef = useRef()

    const datepickerClasses = {
        label: 'date-filter-btn',
        input: 'transactions-datepicker-input'
    }

    const datepicker = useCallback(() => {
        return new AirDatepicker(inputRef.current, {
            isMobile: true,
            autoClose: true,
            range: true,
            toggleSelected: false,
            buttons: ['today', 'clear'],
            onSelect: ({formattedDate}) => {
                if (formattedDate.length === 2) {
                    const checker = formattedDate[0] === formattedDate[1]
                    const label = checker ? formattedDate[0] : formattedDate.join(' - ')
                    setInterval(label)
                    setDateFilterVisible(false)
                }
            }
        })
    }, [setInterval, setDateFilterVisible])

    return (
        <div className={'date-filter-modal-window'}>
            {dateFilterBtns.map(btn => (
                <div
                    key={btn.id}
                    className={'date-filter-btn'}
                    onClick={() => setInterval(btn.id)}
                >{btn.id}<div className={`date-filter-btn-active-checker ${interval === btn.id ? 'date-checker-active' : ''}`}></div></div>
            ))}
            <Datepicker datepicker={datepicker} Ref={inputRef} datepickerClasses={datepickerClasses}>Custom</Datepicker>
        </div>
    )
}

export default DateFilterModalWindow