import React, {useRef} from 'react'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import SwiperEl from '../../../swiper/SwiperEl'
import {useContextApp} from '../../../../AppProvider'
import {useTransactionsContext} from '../../transactions/TransactionsProvider'

import './options-transaction-filter.css'

const OptionsTransactionFilter = () => {
    const {user} = useContextApp()
    const {allCards, transactionCategories} = user[0]
    const {filter, filterEls} = useTransactionsContext()

    const refs = {
        type: useRef(),
        card: useRef(),
        expense: useRef(),
        income: useRef(),
    }

    const typeArray = [
        {_id: 'expense', label: 'Expense', icon: 'fa-solid fa-arrow-down', color: '#ee3a3a'},
        {_id: 'income', label: 'Income', icon: 'fa-solid fa-arrow-up', color: '#24e597'},
        {_id: 'transfer', label: 'Transfer', icon: 'fa-solid fa-repeat', color: '#f5d544'},
    ]

    const elementActive = (key, value, el) => {
        filter[1](prev => {
            const filterArr = prev[key]
            let futureFilterArr = []
            if (filterArr.includes(value)) futureFilterArr = filterArr.filter(item => item !== value)
            else futureFilterArr = [...filterArr, value]
            return {...prev, [key]: futureFilterArr}
        })
        filterEls[1](prev => {
            const filterElLogic = {
                type: () => ({...el, id: el._id}),
                category: () => ({id: el.name, label: el.name, icon: el.sign, color: el.color}),
                card: () => ({id: el._id, label: el.cardName, icon: 'fa-solid fa-credit-card', color: '#24e597'}),
            }
            const newEl = el.cardName ? filterElLogic.card() : el.label ? filterElLogic.type() : filterElLogic.category()
            if (prev.find(el => el.id === newEl.id)) return prev.filter(el => el.id !== newEl.id)
            else return [...prev, newEl]
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
                                class={`transaction-chunk-element ${filter[0].transactionType.includes(type._id) && 'transaction-chunk-element-active'} `}
                                style={{'--filter-color': type.color}}
                                onClick={() => elementActive('transactionType', type._id, type)}
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
                                class={`transaction-chunk-element ${filter[0].card.includes(card._id) && 'transaction-chunk-element-active'}`}
                                style={{'--filter-color': '#24e597'}}
                                onClick={() => elementActive('card', card._id, card)}
                            ><FontAwesomeIcon icon='fa-solid fa-credit-card'/>{card.cardName}
                            </swiper-slide>
                        ))}
                    </SwiperEl>
                </div>
            </div>
            <div className={'filter-chunk'}>
                <div className={'filter-chunk-header'}>Expense</div>
                <div className={'filter-chunk-options'}>
                    <SwiperEl Ref={refs.expense}>
                        {Object.values(transactionCategories.expense).map(category => (
                            <swiper-slide
                                key={category.name}
                                class={`transaction-chunk-element ${filter[0].category.includes(category.name) && 'transaction-chunk-element-active'}`}
                                style={{'--filter-color': category.color}}
                                onClick={() => elementActive('category', category.name, category)}
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
                        {Object.values(transactionCategories.income).map(category => (
                            <swiper-slide
                                key={category.name}
                                class={`transaction-chunk-element ${filter[0].category.includes(category.name) && 'transaction-chunk-element-active'}`}
                                style={{'--filter-color': category.color}}
                                onClick={() => elementActive('category', category.name, category)}
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