import React, {useCallback, useEffect, useRef, useState} from 'react'

import {useTransactionsContext} from '../../../transactions/TransactionsProvider'
import {useModifiedTransactionContext} from '../ModifiedTransactionProvider'
import {dateRefactor, timeRefactor} from '../../../../../my-functions/my-functions'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import AirDatepicker from 'air-datepicker'

import './modified-transaction-date.css'
import Datepicker from '../../../../datepicker/Datepicker'
import moment from 'moment';

const ModifiedTransactionDate = () => {

    const {modifiedTransaction} = useTransactionsContext()
    const {modifiedMode} = useModifiedTransactionContext()

    const getValue = () => ({
        date: dateRefactor(modifiedTransaction[0].date),
        time: timeRefactor(modifiedTransaction[0].date)
    })

    const modifiedDate = action => modifiedTransaction[1](prev => ({...prev, date: moment(prev.date)[action]('1', 'days')._d}))

    const datepickerRef = useRef()
    const datepickerClasses = {label: 'modified-date-label', input: 'modified-date-input'}
    const datepicker = useCallback(() => {
        return new AirDatepicker(datepickerRef.current, {
            isMobile: true,
            timepicker: true,
            toggleSelected: false,
            onSelect: ({date}) => modifiedTransaction[1](prev => ({...prev, date: date}))
        })
    }, [datepickerRef])

    if (!modifiedTransaction[0]) return null

    return (
        <div className={`modified-transaction-date ${modifiedMode[0] ? 'get-gap' : ''}`}>
            <div className={'always-visible-date-section'}>
                <div className={'modified-option-date-name'}>Date</div>
                <div className={'modified-option-date-value'}>
                    <div className={'modified-option-date-date'}><FontAwesomeIcon icon='fa-solid fa-calendar'/>{getValue().date}</div>
                    <div className={'modified-option-date-time'}><FontAwesomeIcon icon='fa-solid fa-clock'/>{getValue().time}</div>
                </div>
            </div>
            <div
                className={`invisible-date-section`}
                style={{height: modifiedMode[0] ? 'auto' : '0px'}}
            ><div className={'modified-datepicker-block'}>
                <div
                    className={'modified-datepicker-arrow'}
                    onClick={() => modifiedDate('subtract')}
                ><FontAwesomeIcon icon='fa-solid fa-angle-left'/></div>
                <Datepicker datepicker={datepicker} datepickerClasses={datepickerClasses} Ref={datepickerRef}>
                    <div className={'modified-datepicker-btn'}>Change date</div>
                </Datepicker>
                <div
                    className={'modified-datepicker-arrow'}
                    onClick={() => modifiedDate('add')}
                ><FontAwesomeIcon icon='fa-solid fa-angle-right'/></div>
                </div>
            </div>
        </div>
    )
}

export default ModifiedTransactionDate