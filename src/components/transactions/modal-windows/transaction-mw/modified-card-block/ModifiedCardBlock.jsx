import React, {useRef} from 'react'

import './modified-card-block.css'

const ModifiedCardBlock = ({modifiedMode, transactionObject, setTransactionObject, getHeight, allCards}) => {

    const cardRef = useRef()
    const swiperRef = useRef()

    const setNewCard = card => {
        setTransactionObject(prev => {
            const newCard = {_id: card._id, cardName: card.cardName, bankName: card.bankName}
            return {...prev, card: newCard}
        })
    }

    return (
        <div className={`transaction-info-chunk ${modifiedMode ? 'get-gap' : ''}`}>
            <div className='transaction-info-chunk-info'>
                <div className={'transaction-info-chunk-header'}>Card</div>
                <div className={'transaction-info-chunk-value'}>{transactionObject.card.cardName}</div>
            </div>

            <div
                className={`modified-transaction-block ${modifiedMode ? 'modified-block-on' : ''}`}
                style={{'--modified-height': `${modifiedMode ? getHeight(cardRef) : '0px'} `}}
                ref={cardRef}
            ><swiper-container
                    ref={swiperRef}
                    slides-per-view="auto"
                    free-mode="true"
                    space-between="10"
                    free-mode-momentum="true"
                    freeModeMomentumRatio="0"
                >{allCards.map(card => (
                    <swiper-slide
                        key={card._id}
                        class={`modified-card ${transactionObject.card._id === card._id ? 'modified-card-active' : ''}`}
                        onClick={() => setNewCard(card)}
                    >{card.cardName}</swiper-slide>
                ))}
                </swiper-container>
            </div>
        </div>
    )
}

export default ModifiedCardBlock