import React, { useRef } from 'react'
import SwiperEl from '../../../../../components/swiper/SwiperEl'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppContext } from '../../../../../application/AppProvider'
import { useAddTransactionContext } from '../AddTransactionProvider'
import { roundUp } from '../../../../../my-functions/my-functions'

import './add-transaction-transfer-card.css'

const AddTransactionTransferCard = ({Ref}) => {

    const { user } = useAppContext()
    const { allCards } = user[0]
    const { newTransaction } = useAddTransactionContext()
    const [futureTransaction, dispatch] = newTransaction

    const transferCardsRefs = useRef([])

    const selectTransferCard = (transferCard, i) => dispatch({ type: 'transfer-card', transferCard, transferCardsRefs, i })

    return (
        <div className={'slider-wrapper add-transaction-transfer-card-wrapper'}>
            <SwiperEl Ref={Ref}>
                {allCards.map((card, i) => (
                    <swiper-slide
                        key={card._id}
                        class={`add-transaction-transfer-card ${futureTransaction.transferCard && futureTransaction.transferCard._id === card._id ? 'add-transaction-transfer-card-active' : ''}`}
                        ref={el => transferCardsRefs.current[i] = el}
                        onClick={() => selectTransferCard(card, i)}
                    ><div className={'add-transaction-transfer-card-info'}>
                        <div className={'add-transaction-transfer-card-info__sign'}>
                            <div className={'add-transaction-transfer-card-info__sign-wrapper'}>
                                <FontAwesomeIcon icon='fa-solid fa-credit-card'/>
                            </div>
                        </div>
                        <div className={'add-transaction-transfer-card-info__name'}>{ card.cardName }</div>
                        <div className={'add-transaction-transfer-card-info__count'}>{ roundUp(card.count) }</div>
                    </div></swiper-slide>))}
            </SwiperEl>
        </div>
    )
}

export default AddTransactionTransferCard