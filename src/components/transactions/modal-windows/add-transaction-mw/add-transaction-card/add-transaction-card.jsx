import React from 'react'

import './add-transaction-card.css'
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
            <swiper-container
                ref={Ref}
                slides-per-view="auto"
                free-mode="true"
                space-between="10"
                free-mode-momentum="true"
                freeModeMomentumRatio="0"
                class={'a'}
            >{allCards.map(card => (
                <swiper-slide
                    key={card._id}
                    class={`add-transaction-card ${state.card._id === card._id ? 'add-transaction-card-active' : ''}`}
                    onClick={() => selectCard(card)}
                >{card.cardName}</swiper-slide>))}
            </swiper-container>
        </div>
    )
}

export default AddTransactionCard