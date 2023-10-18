import React, {useCallback, useRef} from 'react'
import Datepicker from '../../../../datepicker/Datepicker'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import AirDatepicker from 'air-datepicker'
import moment from 'moment/moment';
import {useAddTransactionContext} from '../AddTransactionProvider'
import {dateRefactor, timeRefactor} from '../../../../../my-functions/my-functions'

import './add-transaction-date.css'

const AddTransactionDate = () => {

    const {newTransaction} = useAddTransactionContext()

    const datePickerRef = useRef()

    const datepickerClasses = {
        label: 'add-transaction-date-wrapper',
        input: 'add-transaction-date-input'
    }

    const datepicker = useCallback(() => {
        return new AirDatepicker(datePickerRef.current, {
            isMobile: true,
            timepicker: true,
            toggleSelected: false,
            onSelect: ({date}) => {
                if (!Array.isArray(date)) newTransaction[1](prev => ({...prev, date: date}))
            }
        })
    }, [datePickerRef])

    const dateToggle =action => {
        newTransaction[1](prev => {
            const previousDate = prev.date
            const newDate = moment(previousDate)[action](1, 'days')._d
            return {...prev, date: newDate}
        })
    }

    return (
        <div className={'add-transaction-date-section'}>
            <FontAwesomeIcon
                className={'add-transaction-date-arrow'}
                onClick={() => dateToggle('subtract')}
                icon='fa-solid fa-angle-left' />
            <Datepicker datepicker={datepicker} Ref={datePickerRef} datepickerClasses={datepickerClasses}>
                <div className={'add-transaction-date'}>
                    <div className={'add-transaction-date-info'}>
                        <FontAwesomeIcon icon='fa-solid fa-calendar'/>
                        {dateRefactor(newTransaction[0].date)}
                    </div>
                    <div className={'add-transaction-date-info'}>
                        <FontAwesomeIcon icon='fa-solid fa-clock'/>
                        {timeRefactor(newTransaction[0].date)}
                    </div>
                </div>
            </Datepicker>
            <FontAwesomeIcon onClick={() => dateToggle('add')} className={'add-transaction-date-arrow'} icon='fa-solid fa-angle-right' />
        </div>
    )
}

export default AddTransactionDate