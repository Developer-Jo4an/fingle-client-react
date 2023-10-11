import React, {useRef} from 'react'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowDown, faArrowUp, faCreditCard, faRepeat} from '@fortawesome/free-solid-svg-icons'

import './options-transaction-filter.css'
import SwiperEl from '../../../swiper/SwiperEl';

const OptionsTransactionFilter = ({filtered, setFiltered, allCards, categories, setFilterElements}) => {

    const {expense, income} = categories

    const refs = {
        type: useRef(),
        card: useRef(),
        expense: useRef(),
        income: useRef(),
    }

    const typeArray = [
        {_id: 'expense', label: 'Expense', icon: faArrowDown, color: '#ee3a3a'},
        {_id: 'income', label: 'Income', icon: faArrowUp, color: '#24e597'},
        {_id: 'transfer', label: 'Transfer', icon: faRepeat, color: '#f5d544'},
    ]

    const elementActive = (el, key, option) => {
        setFiltered(prev => {
            let previousArr = prev[key]
            let futureArr = []
            if (previousArr.find(item => el[option] === item.label)) futureArr = previousArr.filter(item => item.label !== el[option])
            else futureArr = [...previousArr, {label: el[option], obj: el}]
            return {...prev, [key]: futureArr}
        })
    }

    return (
        <div className={'options-transactions-filter-modal-window'}>
            <div className={'filter-chunk'}>
                <div className={'filter-chunk-header'}>Type</div>
                <div className={'filter-chunk-options'}>
                    <SwiperEl Ref={refs.type}>
                        {typeArray.map(type => (
                            <swiper-slide
                                key={type._id}
                                class={`transaction-chunk-element ${filtered.transactionType.includes(type._id) ? 'transaction-chunk-element-active' : ''}`}
                                style={{'--filter-color': type.color}}
                                onClick={() => elementActive(type, 'transactionType', '_id')}
                            ><FontAwesomeIcon icon={type.icon}/>{type.label}
                            </swiper-slide>
                        ))}
                    </SwiperEl>
                </div>
            </div>
            <div className={'filter-chunk'}>
                <div className={'filter-chunk-header'}>Cards</div>
                <div className={'filter-chunk-options'}>
                    <SwiperEl Ref={refs.card}>
                        {allCards.map(card => (
                            <swiper-slide
                                key={card._id}
                                class={`transaction-chunk-element ${filtered.card.includes(card._id) ? 'transaction-chunk-element-active' : ''}`}
                                style={{'--filter-color': '#24e597'}}
                                onClick={() => elementActive(card, 'card', '_id')}
                            ><FontAwesomeIcon icon={faCreditCard}/>{card.cardName}
                            </swiper-slide>
                        ))}
                    </SwiperEl>
                </div>
            </div>
            <div className={'filter-chunk'}>
                <div className={'filter-chunk-header'}>Expense</div>
                <div className={'filter-chunk-options'}>
                    <SwiperEl Ref={refs.expense}>
                        {Object.values(expense).map(category => (
                            <swiper-slide
                                key={category.name}
                                class={`transaction-chunk-element ${filtered.expense.includes(category.name) ? 'transaction-chunk-element-active' : ''}`}
                                style={{'--filter-color': category.color}}
                                onClick={() => elementActive(category, 'expense', 'name')}
                            ><FontAwesomeIcon icon={category.sign}/>{category.name}
                            </swiper-slide>
                        ))}
                    </SwiperEl>
                </div>
            </div>
            <div className={'filter-chunk'}>
                <div className={'filter-chunk-header'}>Income</div>
                <div className={'filter-chunk-options'}>
                    <SwiperEl Ref={refs.income}>
                        {Object.values(income).map(category => (
                            <swiper-slide
                                key={category.name}
                                class={`transaction-chunk-element ${filtered.income.includes(category.name) ? 'transaction-chunk-element-active' : ''}`}
                                style={{'--filter-color': category.color}}
                                onClick={() => elementActive(category, 'income', 'name')}
                            ><FontAwesomeIcon icon={category.sign}/>{category.name}
                            </swiper-slide>
                        ))}
                    </SwiperEl>
                </div>
            </div>
        </div>
    )
}

export default OptionsTransactionFilter