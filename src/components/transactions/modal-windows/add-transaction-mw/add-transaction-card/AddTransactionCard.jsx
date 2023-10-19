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

    const selectCard = card => {
        newTransaction[1](prev => {
            const futureObj = {}
            for (const key in prev) if (key !== 'transferCard') futureObj[key] = prev[key]
            return {...futureObj, card: {_id: card._id, cardName: card.cardName, bankName: card.bankName}}
        })
    }

    return (
        <div className={'slider-wrapper'}>
            <SwiperEl Ref={refs.card}>
            {allCards.map(card => (
                <swiper-slide
                    key={card._id}
                    class={`add-transaction-card ${newTransaction[0].card && newTransaction[0].card._id === card._id ? 'add-transaction-card-active' : ''}`}
                    onClick={() => selectCard(card)}
                ><FontAwesomeIcon icon="fa-solid fa-credit-card"/>{card.cardName}</swiper-slide>))}
            </SwiperEl>
        </div>
    )
}

export default AddTransactionCard