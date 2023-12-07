import React from 'react'
import SwiperEl from '../../../../../components/swiper/SwiperEl'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useAppContext } from '../../../../../application/AppProvider'
import { useAddTransactionContext } from '../AddTransactionProvider'
import { roundUp } from '../../../../../my-functions/my-functions'

import './add-transaction-card.css'

const AddTransactionCard = () => {
    const { user } = useAppContext()
    const { allCards } = user[0]
    const { newTransaction, refs } = useAddTransactionContext()
    const [futureTransaction, dispatch] = newTransaction

    const selectCard = card => dispatch({type: 'card', card: card})

    return (
        <div className={'slider-wrapper'}>
            <SwiperEl Ref={ refs.card }>
            {allCards.map(card => (
                <swiper-slide
                    key={ card._id }
                    class={`add-transaction-card ${futureTransaction.card && futureTransaction.card._id === card._id ? 'add-transaction-card-active' : ''}`}
                    onClick={() => selectCard(card)}
                ><div className={'add-transaction-card-info'}>
                        <div className={'add-transaction-card-info__sign'}>
                            <div className={'add-transaction-card-info__sign-wrapper'}>
                                <FontAwesomeIcon icon='fa-solid fa-credit-card'/>
                            </div>
                        </div>
                        <div className={'add-transaction-card-info__name'}>{ card.cardName }</div>
                        <div className={'add-transaction-card-info__count'}>{ roundUp(card.count) } $</div>
                    </div>
                </swiper-slide>))}
            </SwiperEl>
        </div>
    )
}

export default AddTransactionCard