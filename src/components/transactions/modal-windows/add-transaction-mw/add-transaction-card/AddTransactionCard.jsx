import React from 'react'
import SwiperEl from '../../../../swiper/SwiperEl'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useAppContext} from '../../../../../AppProvider'
import {useAddTransactionContext} from '../AddTransactionProvider'

import './add-transaction-card.css'

const AddTransactionCard = () => {
    const {user} = useAppContext()
    const {allCards} = user[0]
    const {newTransaction, refs} = useAddTransactionContext()
    const [futureTransaction, dispatch] = newTransaction

    const selectCard = card => dispatch({type: 'card', card: card})

    return (
        <div className={'slider-wrapper'}>
            <SwiperEl Ref={refs.card}>
            {allCards.map(card => (
                <swiper-slide
                    key={card._id}
                    class={`add-transaction-card ${futureTransaction.card && futureTransaction.card._id === card._id ? 'add-transaction-card-active' : ''}`}
                    onClick={() => selectCard(card)}
                ><FontAwesomeIcon icon="fa-solid fa-credit-card"/>{card.cardName}</swiper-slide>))}
            </SwiperEl>
        </div>
    )
}

export default AddTransactionCard