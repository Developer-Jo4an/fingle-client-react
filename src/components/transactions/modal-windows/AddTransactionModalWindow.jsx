import React, {useCallback, useEffect, useRef, useState} from 'react'
import Datepicker from "../../datepicker/Datepicker"
import { Swiper, SwiperSlide } from 'swiper/react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faClock, faCalendar, faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons"
import AirDatepicker from "air-datepicker"
import moment from "moment"
import {dateRefactor, timeRefactor} from "../../../my-functions/my-functions"

import 'swiper/css'
import './add-transaction-modal-window.css'
import Calculator from "../calculator/Calculator"

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

    // types
    const transactionTypes = [
        {id: 'expense', label: 'Expense'},
        {id: 'income', label: 'Income'},
        {id: 'transfer', label: 'Transfer'},
    ]
    // date
    const inputRef = useRef()

    const datepickerClasses = {
        label: 'add-transaction-date-wrapper',
        input: 'add-transaction-date-input'
    }

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


    useEffect(() => {
        console.log(transactionObj)
    }, [transactionObj])

    return (
        <div
            className={'add-transaction-modal-window'}
            onClick={e => e.stopPropagation()}
        >
            <div className='add-transaction-type'>
                {transactionTypes.map(type => (
                    <div
                        key={type.id}
                        className={`transaction-type ${type.id === transactionObj.type ? 'transaction-type-active' : ''}`}
                        onClick={() => setTransactionObj(prev => {
                            const futureObject = {...prev, type: type.id}
                            type.id === 'expense' && type.id === 'income' ?
                                futureObject.category = {} : futureObject.transferCard = {}
                            return futureObject
                        })}
                    >{type.label}</div>
                ))}
            </div>

            <div className={'add-transaction-date-section'}>
                <FontAwesomeIcon onClick={() => dateToggle('subtract')} className={'add-transaction-date-arrow'} icon={faAngleLeft} />
                <Datepicker datepicker={datepicker} Ref={inputRef} datepickerClasses={datepickerClasses}>
                    <div className={'add-transaction-date'}>
                        <div className={'add-transaction-date-info'}><FontAwesomeIcon icon={faCalendar}/>{dateRefactor(transactionObj.date)}</div>
                        <div className={'add-transaction-date-info'}><FontAwesomeIcon icon={faClock}/>{timeRefactor(transactionObj.date)}</div>
                    </div>
                </Datepicker>
                <FontAwesomeIcon onClick={() => dateToggle('add')} className={'add-transaction-date-arrow'} icon={faAngleRight} />
            </div>


            <div className={'slider-wrapper'}>
                <Swiper
                    spaceBetween={10}
                    slidesPerView={'auto'}
                    freeMode={true}
                >{allCards.map(card => (
                    <SwiperSlide
                        key={card._id}
                        className={`add-transaction-card ${transactionObj.card._id === card._id ? 'add-transaction-card-active': ''}`}
                        onClick={() => setTransactionObj(prev => ({...prev, card: {_id: card._id, cardName: card.cardName, bankName: card.bankName}}))}
                    >{card.cardName}
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>

            <div className={'add-transaction-count'} ref={countRef}>
                <div className={'add-transaction-count-value'}><div className={'add-transaction-count-currency'}>USD</div> {transactionObj.count}</div>
            </div>

            <div
                className={`add-transaction-more-info`}
            >
                <div
                    style={{transform: `${transactionObj.type === 'expense' ? 'translateX(0)' : transactionObj.type === 'income' ? 'translateX(-33.33%)' : 'translateX(-66.66%)'}`}}
                    className={'add-transaction-more-info-wrapper'}
                >
                    <div className={'slider-wrapper add-transaction-category-wrapper'}>
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={'auto'}
                            freeMode={true}
                        >{Object.values(categories.expense).map(category => (
                            <SwiperSlide
                                key={category._id}
                                style={{'--category-color': category.color}}
                                className={`add-transaction-category`}
                            >{category.name}
                            </SwiperSlide>
                        ))}
                        </Swiper>
                    </div>
                    <div className={'slider-wrapper add-transaction-income-category-wrapper'}>
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={'auto'}
                            freeMode={true}
                        >{Object.values(categories.income).map(category => (
                            <SwiperSlide
                                key={category._id}
                                style={{'--category-color': category.color}}
                                className={`add-transaction-income-category`}
                            >{category.name}
                            </SwiperSlide>
                        ))}
                        </Swiper>
                    </div>
                    <div className={'slider-wrapper add-transaction-transfer-card-wrapper'}>
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={'auto'}
                            freeMode={true}
                        >{allCards.map(card => (
                            <SwiperSlide
                                key={card._id}
                                className={'add-transaction-transfer-card'}
                                onClick={() => setTransactionObj(prev => ({...prev, card: {_id: card._id, cardName: card.cardName, bankName: card.bankName}}))}
                            >{card.cardName}
                            </SwiperSlide>
                        ))}
                        </Swiper>
                    </div>
                </div>
            </div>

            <Calculator Ref={countRef} state={transactionObj} setState={setTransactionObj}/>
        </div>
    )
}

export default AddTransactionModalWindow;