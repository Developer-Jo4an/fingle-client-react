import React, {useEffect, useRef} from 'react'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowDown, faArrowUp, faCreditCard, faRepeat} from '@fortawesome/free-solid-svg-icons'

import './options-transaction-filter.css'

const OptionsTransactionFilter = ({filtered, setFiltered, allCards, categories}) => {

    const {expense, income} = categories

    // refs
    const typeRef = useRef()
    // refs

    const typeArray = [
        {_id: 'expense', label: 'Expense', icon: faArrowUp, color: '#ee3a3a'},
        {_id: 'income', label: 'Income', icon: faArrowDown, color: '#24e597'},
        {_id: 'transfer', label: 'Transfer', icon: faRepeat, color: '#f5d544'},
    ]

    const elementActive = (el, key, option) => {
        setFiltered(prev => {
            let previousArr = prev[key]
            let futureArr = []
            if (previousArr.includes(el[option])) futureArr = previousArr.filter(item => item !== el[option])
            else futureArr = [...previousArr, el[option]]
            return {...prev, [key]: futureArr}
        })
    }

    return (
        <div className={'options-transactions-filter-modal-window'}>
            <div className={'filter-chunk'}>
                <div className={'filter-chunk-header'}>Type</div>
                <div className={'filter-chunk-options'}>
                    <swiper-container
                        ref={typeRef}
                        slides-per-view="auto"
                        free-mode="true"
                        space-between="10"
                        free-mode-momentum="true"
                        freeModeMomentumRatio="0"
                    >{typeArray.map(type => (
                        <swiper-slide
                            key={type._id}
                            class={`transaction-chunk-element ${filtered.transactionType.includes(type._id) ? 'transaction-chunk-element-active' : ''}`}
                            style={{'--filter-color': type.color}}
                            onClick={() => elementActive(type, 'transactionType', '_id')}
                        ><FontAwesomeIcon icon={type.icon}/>{type.label}
                        </swiper-slide>
                    ))}
                    </swiper-container>
                </div>
            </div>
            <div className={'filter-chunk'}>
                <div className={'filter-chunk-header'}>Cards</div>
                <div className={'filter-chunk-options'}>
                    <swiper-container
                        ref={typeRef}
                        slides-per-view="auto"
                        free-mode="true"
                        space-between="10"
                        free-mode-momentum="true"
                        freeModeMomentumRatio="0"
                    >{allCards.map(card => (
                        <swiper-slide
                            key={card._id}
                            class={`transaction-chunk-element ${filtered.card.includes(card._id) ? 'transaction-chunk-element-active' : ''}`}
                            style={{'--filter-color': '#24e597'}}
                            onClick={() => elementActive(card, 'card', '_id')}
                        ><FontAwesomeIcon icon={faCreditCard}/>{card.cardName}
                        </swiper-slide>
                    ))}
                    </swiper-container>
                </div>
            </div>
            <div className={'filter-chunk'}>
                <div className={'filter-chunk-header'}>Expense</div>
                <div className={'filter-chunk-options'}>
                    <swiper-container
                        ref={typeRef}
                        slides-per-view="auto"
                        free-mode="true"
                        space-between="10"
                        free-mode-momentum="true"
                        freeModeMomentumRatio="0"
                    >{Object.values(expense).map(category => (
                        <swiper-slide
                            key={category.name}
                            class={`transaction-chunk-element ${filtered.expense.includes(category.name) ? 'transaction-chunk-element-active' : ''}`}
                            style={{'--filter-color': category.color}}
                            onClick={() => elementActive(category, 'expense', 'name')}
                        >{category.name}
                        </swiper-slide>
                    ))}
                    </swiper-container>
                </div>
            </div>
            <div className={'filter-chunk'}>
                <div className={'filter-chunk-header'}>Income</div>
                <div className={'filter-chunk-options'}>
                    <swiper-container
                        ref={typeRef}
                        slides-per-view="auto"
                        free-mode="true"
                        space-between="10"
                        free-mode-momentum="true"
                        freeModeMomentumRatio="0"
                    >{Object.values(income).map(category => (
                        <swiper-slide
                            key={category.name}
                            class={`transaction-chunk-element ${filtered.income.includes(category.name) ? 'transaction-chunk-element-active' : ''}`}
                            style={{'--filter-color': category.color}}
                            onClick={() => elementActive(category, 'income', 'name')}
                        >{category.name}
                        </swiper-slide>
                    ))}
                    </swiper-container>
                </div>
            </div>
        </div>
    )
}

export default OptionsTransactionFilter