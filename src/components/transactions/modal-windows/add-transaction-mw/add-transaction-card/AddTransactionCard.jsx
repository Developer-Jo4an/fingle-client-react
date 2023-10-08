import React from 'react'
import SwiperEl from '../../../../swiper/SwiperEl'

import './add-transaction-card.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const AddTransactionCard = ({Ref, allCards, state, setState}) => {

    const selectCard = card => {
        setState(prev => {
            const futureObj = {}
            for (const key in prev) if (key !== 'transferCard') futureObj[key] = prev[key]
            return {...futureObj, card: {_id: card._id, cardName: card.cardName, bankName: card.bankName}}
        })
    }

    return (
        <div className={'slider-wrapper'}>
            <SwiperEl Ref={Ref}>
            {allCards.map(card => (
                <swiper-slide
                    key={card._id}
                    class={`add-transaction-card ${state.card._id === card._id ? 'add-transaction-card-active' : ''}`}
                    onClick={() => selectCard(card)}
                ><FontAwesomeIcon icon="fa-solid fa-credit-card"/>{card.cardName}</swiper-slide>))}
            </SwiperEl>
        </div>
    )
}

export default AddTransactionCard