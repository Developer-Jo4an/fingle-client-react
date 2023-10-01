import React, {useRef} from 'react'

import './add-transaction-transfer-card.css'
const AddTransactionTransferCard = ({Ref, allCards, state, setState}) => {

    const transferCardsRefs = useRef([])

    const selectTransferCard = (transferCard, i) => {
        setState(prev => {
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
            <swiper-container
                ref={Ref}
                slides-per-view="auto"
                free-mode="true"
                space-between="10"
                free-mode-momentum="true"
                freeModeMomentumRatio="0"
            >{allCards.map((card, i) => (
                <swiper-slide
                    key={card._id}
                    class={`add-transaction-transfer-card ${state.transferCard && state.transferCard._id === card._id ? 'add-transaction-transfer-card-active' : ''}`}
                    ref={el => transferCardsRefs.current[i] = el}
                    onClick={() => selectTransferCard(card, i)}
                >{card.cardName}</swiper-slide>))}
            </swiper-container>
        </div>
    )
}

export default AddTransactionTransferCard