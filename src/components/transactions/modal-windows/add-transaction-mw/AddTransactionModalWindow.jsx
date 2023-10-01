import React, {useCallback, useEffect, useRef, useState} from 'react'
import Datepicker from '../../../datepicker/Datepicker'
import Calculator from '../../calculator/Calculator'
import AddTransactionType from './add-transaction-type/add-transaction-type'
import AddTransactionCard from './add-transaction-card/add-transaction-card'
import AddTransactionCategory from './add-transaction-category/AddTransactionCategory'
import AddTransactionIncomeCategory from './add-transaction-income/AddTransactionIncomeCategory'
import AddTransactionTransferCard from './add-transaction-transfer-card/AddTransactionTransferCard'

import { faClock, faCalendar, faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons'
import AirDatepicker from 'air-datepicker'
import moment from 'moment'
import { dateRefactor, timeRefactor } from '../../../../my-functions/my-functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import 'swiper/css'
import './add-transaction-modal-window.css'

import { register } from 'swiper/element/bundle'
register()

const AddTransactionModalWindow = ({allCards, categories}) => {
    const [transactionObj, setTransactionObj] = useState({
        type: 'expense',
        date: new Date(),
        card: {
            _id: allCards[0]._id,
            cardName: allCards[0].cardName,
            bankName: allCards[0].bankName
        },
        count: '0'
    })

    // date
    const inputRef = useRef()

    const dateToggle = action => {
        setTransactionObj(prev => {
            const previousDate = prev.date
            const newDate = moment(previousDate)[action](1, 'days')._d
            return {...prev, date: newDate}
        })
    }

    const datepicker = useCallback(() => {
        return new AirDatepicker(inputRef.current, {
            isMobile: true,
            timepicker: true,
            toggleSelected: false,
            onSelect: ({date}) => {
                if (!Array.isArray(date)) setTransactionObj(prev => ({...prev, date: date}))
            }
        })
    }, [setTransactionObj, inputRef])

    // count
    const countRef = useRef()

    // more info
    const categoriesSelectRef = useRef()
    const incomeCategoriesSelect = useRef()
    const transferCardSelect = useRef()
    // more info

    // listener
    useEffect(() => {
        console.log(transactionObj)
    }, [transactionObj])
    // listener


    return (
        <div
            className={'add-transaction-modal-window'}
            onClick={e => e.stopPropagation()}
        >
            {/*type*/}
            <AddTransactionType transactionObj={transactionObj} setTransactionObj={setTransactionObj}/>
            {/*date*/}
            <div className={'add-transaction-date-section'}>
                <FontAwesomeIcon onClick={() => dateToggle('subtract')} className={'add-transaction-date-arrow'} icon={faAngleLeft} />
                <Datepicker datepicker={datepicker} Ref={inputRef} datepickerClasses={{
                    label: 'add-transaction-date-wrapper',
                    input: 'add-transaction-date-input'
                }}>
                    <div className={'add-transaction-date'}>
                        <div className={'add-transaction-date-info'}><FontAwesomeIcon icon={faCalendar}/>{dateRefactor(transactionObj.date)}</div>
                        <div className={'add-transaction-date-info'}><FontAwesomeIcon icon={faClock}/>{timeRefactor(transactionObj.date)}</div>
                    </div>
                </Datepicker>
                <FontAwesomeIcon onClick={() => dateToggle('add')} className={'add-transaction-date-arrow'} icon={faAngleRight} />
            </div>

            {/*card*/}
            <AddTransactionCard Ref={categoriesSelectRef} allCards={allCards} state={transactionObj} setState={setTransactionObj}/>
            {/*count*/}
            <div className={'add-transaction-count'} ref={countRef}>
                <div className={'add-transaction-count-value'}><div className={'add-transaction-count-currency'}>USD</div> {transactionObj.count}</div>
            </div>
            {/*moore info*/}
            <div className={`add-transaction-more-info`}>
                <div className={`add-transaction-more-info-wrapper ${transactionObj.type === 'expense' ? 
                    'start' : transactionObj.type === 'income' ? 'middle' : 'end'}`}>
                    <AddTransactionCategory Ref={categoriesSelectRef} categories={categories} state={transactionObj} setState={setTransactionObj}/>
                    <AddTransactionIncomeCategory Ref={incomeCategoriesSelect} categories={categories} state={transactionObj} setState={setTransactionObj}/>
                    <AddTransactionTransferCard Ref={transferCardSelect} allCards={allCards} state={transactionObj} setState={setTransactionObj}/>
                </div>
            </div>
            {/*calculator*/}
            <Calculator Ref={countRef} state={transactionObj} setState={setTransactionObj}/>
        </div>
    )
}

export default AddTransactionModalWindow