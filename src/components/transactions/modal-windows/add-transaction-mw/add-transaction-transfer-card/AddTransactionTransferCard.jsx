import React, {useRef} from 'react'
import SwiperEl from '../../../../swiper/SwiperEl'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useAppContext} from '../../../../../AppProvider'
import {useAddTransactionContext} from '../AddTransactionProvider'

import './add-transaction-transfer-card.css'

const AddTransactionTransferCard = ({Ref}) => {

    const {user} = useAppContext()
    const {allCards} = user[0]
    const {newTransaction} = useAddTransactionContext()
    const [futureTransaction, dispatch] = newTransaction

    const transferCardsRefs = useRef([])

    const selectTransferCard = (transferCard, i) => dispatch({type: 'transfer-card', transferCard, transferCardsRefs, i})

    return (
        <div className={'slider-wrapper add-transaction-transfer-card-wrapper'}>
            <SwiperEl Ref={Ref}>
                {allCards.map((card, i) => (
                    <swiper-slide
                        key={card._id}
                        class={`add-transaction-transfer-card ${futureTransaction.transferCard && futureTransaction.transferCard._id === card._id ? 'add-transaction-transfer-card-active' : ''}`}
                        ref={el => transferCardsRefs.current[i] = el}
                        onClick={() => selectTransferCard(card, i)}
                    ><FontAwesomeIcon icon="fa-solid fa-credit-card"/>{card.cardName}</swiper-slide>))}
            </SwiperEl>
        </div>
    )
}

export default AddTransactionTransferCard