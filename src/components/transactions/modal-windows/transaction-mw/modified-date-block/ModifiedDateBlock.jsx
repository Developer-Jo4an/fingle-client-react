import React, {useCallback, useRef} from 'react'
import Datepicker from '../../../../datepicker/Datepicker'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import AirDatepicker from 'air-datepicker'
import moment from 'moment/moment'

import './modified-date-block.css'
import {dateRefactor, timeRefactor} from '../../../../../my-functions/my-functions';

const ModifiedDateBlock = ({modifiedMode, transactionObject, setTransactionObject, getHeight}) => {

    const dateRef = useRef()
    const datepickerRef = useRef()

    const modifiedDatepicker = useCallback(() => {
        return new AirDatepicker(datepickerRef.current, {
            isMobile: true,
            timepicker: true,
            toggleSelected: false,
            onSelect: ({date}) => setTransactionObject(prev => ({...prev, date: date}))
        })
    }, [datepickerRef])

    const modifiedArrowClick = action => {
        setTransactionObject(prev => {
            const nowDate = prev.date
            const futureDate = moment(nowDate)[action](1, 'days')._d
            return {...prev, date: futureDate}
        })
    }

    return (
        <div className={`transaction-info-chunk ${modifiedMode ? 'get-gap' : ''}`}>
            <div className='transaction-info-chunk-info'>
                <div className={'transaction-info-chunk-header'}>Date</div>
                <div className={'transaction-info-chunk-value'}>{dateRefactor(transactionObject.date)} {timeRefactor(transactionObject.date)}</div>
            </div>
            <div
                className={`modified-transaction-block ${modifiedMode ? 'modified-block-on' : ''}`}
                style={{'--modified-height': `${modifiedMode ? getHeight(dateRef) : '0px'} `}}
                ref={dateRef}
            ><div className={'modified-datepicker-wrapper'}>
                    <div
                        className={'modified-datepicker-arrow'}
                        onClick={() => modifiedArrowClick('subtract')}
                    ><FontAwesomeIcon icon="fa-solid fa-chevron-left"/></div>
                    <Datepicker datepicker={modifiedDatepicker} Ref={datepickerRef} datepickerClasses={{
                        input: 'modified-datepicker-input',
                        label: 'modified-datepicker-label'
                    }}><div className={'modified-date-btn'}>Change Date</div>
                    </Datepicker>
                    <div
                        className={'modified-datepicker-arrow'}
                        onClick={() => modifiedArrowClick('add')}
                    ><FontAwesomeIcon icon="fa-solid fa-chevron-right"/></div>
                </div>
            </div>
        </div>
    )
}

export default ModifiedDateBlock