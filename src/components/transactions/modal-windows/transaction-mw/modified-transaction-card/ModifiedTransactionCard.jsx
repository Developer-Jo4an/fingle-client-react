import React, {useRef} from 'react'

import {useAppContext} from '../../../../../AppProvider'
import {useModifiedTransactionContext} from '../ModifiedTransactionProvider'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useTransactionsContext} from '../../../transactions/TransactionsProvider'
import SwiperEl from '../../../../swiper/SwiperEl'

import './modified-transaction-card.css'

const ModifiedTransactionCard = () => {

    const {user} = useAppContext()
    const {modifiedMode} = useModifiedTransactionContext()
    const {modifiedTransaction} = useTransactionsContext()
    const [modified, dispatch] = modifiedTransaction
    const sliderRef = useRef()

    const modifiedCard = card => dispatch({type: 'card', card: card})

    return (
        <div className={`modified-transaction-card ${modifiedMode[0] ? 'get-gap' : ''}`}>
            <div className={'always-visible-card-section'}>
                <div className={'modified-option-card-name'}>Card</div>
                <div className={'modified-option-card-value'}>{modified.card.cardName}</div>
            </div>
            <div
                className={`invisible-card-section`}
                style={{height: modifiedMode[0] ? 'auto' : '0px'}}
            ><SwiperEl Ref={sliderRef}>
                {user[0].allCards.map(card => (
                    <swiper-slide
                        key={card._id}
                        class={`modified-transaction-card-slide ${modified.card._id === card._id ? 'modified-card-active' : ''}`}
                        onClick={() => modifiedCard(card)}
                    ><FontAwesomeIcon icon='fa-solid fa-credit-card'/>{card.cardName}
                    </swiper-slide>
                ))}
            </SwiperEl>
            </div>
        </div>
    )
}

export default ModifiedTransactionCard