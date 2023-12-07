import React, { useCallback, useRef } from 'react'
import Datepicker from '../../../../../components/datepicker/Datepicker'

import { useTransactionsContext } from '../../../general/TransactionsProvider'
import { useModifiedTransactionContext } from '../ModifiedTransactionProvider'
import { dateRefactor, timeRefactor } from '../../../../../my-functions/my-functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AirDatepicker from 'air-datepicker'
import moment from 'moment'

import './modified-transaction-date.css'

const ModifiedTransactionDate = () => {

    const {modifiedTransaction} = useTransactionsContext()
    const [modified, dispatch] = modifiedTransaction
    const {modifiedMode} = useModifiedTransactionContext()

    const getValue = () => ({
        date: dateRefactor(modified.date),
        time: timeRefactor(modified.date)
    })

    const modifiedDate = action => {
        dispatch({type: 'date-arrow', callback: state => moment(state.date)[action]('1', 'days')._d})
    }

    const datepickerRef = useRef()
    const datepickerClasses = {label: 'modified-date-label', input: 'modified-date-input'}
    const datepicker = useCallback(() => {
        return new AirDatepicker(datepickerRef.current, {
            isMobile: true,
            timepicker: true,
            toggleSelected: false,
            onSelect: ({date}) => dispatch({type: 'date', date})
        })
    }, [datepickerRef])

    return (
        <div className={`modified-transaction-date ${modifiedMode[0] ? 'get-gap' : ''}`}>
            <div className={'always-visible-date-section'}>
                <div className={'modified-option-date-name'}>Date</div>
                <div className={'modified-option-date-value'}>
                    <div className={'modified-option-date-date'}>{ getValue().date }</div>
                    <div className={'modified-transaction-date-info__between-line'}>|</div>
                    <div className={'modified-option-date-time'}>{ getValue().time }</div>
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