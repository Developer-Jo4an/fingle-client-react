import React, {useRef} from 'react'

import './add-transaction-transfer-card.css'
import SwiperEl from '../../../../swiper/SwiperEl';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useAppContext} from '../../../../../AppProvider'
import {useAddTransactionContext} from '../AddTransactionProvider'

const AddTransactionTransferCard = ({Ref}) => {

    const {user} = useAppContext()
    const {allCards} = user[0]
    const {newTransaction} = useAddTransactionContext()
    const {refs} = useAddTransactionContext()
    const transferCardsRefs = useRef([])

    const selectTransferCard = (transferCard, i) => {
        newTransaction[1](prev => {
            if (!prev.card) {
                refs.card.current.classList.add('error-animation')
                setTimeout(() => refs.card.current.classList.remove('error-animation'), 700)
                return prev
            }
            if (prev.transferCard) {
                if (prev.transferCard._id === transferCard._id) {
                    const futureObject = {}
                    for (const key in prev) if (key !== 'transferCard') futureObject[key] = prev[key]
                    return futureObject
                } else if (prev.card._id === transferCard._id) {
                    const thisDomEl = transferCardsRefs.current[i]
                    thisDomEl.classList.add('error-animation')
                    setTimeout(() => thisDomEl.classList.remove('error-animation'), 700)
                    return prev
                } else return {...prev, transferCard: {_id: transferCard._id, cardName: transferCard.cardName, bankName: transferCard.bankName}}
            } else {
                if (prev.card._id === transferCard._id) {
                    const thisDomEl = transferCardsRefs.current[i]
                    thisDomEl.classList.add('error-animation')
                    setTimeout(() => thisDomEl.classList.remove('error-animation'), 700)
                    return prev
                } else return {...prev, transferCard: {_id: transferCard._id, cardName: transferCard.cardName, bankName: transferCard.bankName}}
            }
        })
    }

    return (
        <div className={'slider-wrapper add-transaction-transfer-card-wrapper'}>
            <SwiperEl Ref={Ref}>
                {allCards.map((card, i) => (
                    <swiper-slide
                        key={card._id}
                        class={`add-transaction-transfer-card ${newTransaction[0].transferCard && newTransaction[0].transferCard._id === card._id ? 'add-transaction-transfer-card-active' : ''}`}
                        ref={el => transferCardsRefs.current[i] = el}
                        onClick={() => selectTransferCard(card, i)}
                    ><FontAwesomeIcon icon="fa-solid fa-credit-card"/>{card.cardName}</swiper-slide>))}
            </SwiperEl>
        </div>
    )
}

export default AddTransactionTransferCard