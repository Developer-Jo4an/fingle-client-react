import React, {useRef} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import './modified-card-block.css'
import SwiperEl from '../../../../swiper/SwiperEl';

const ModifiedCardBlock = ({modifiedMode, transactionObject, setTransactionObject, getHeight, allCards}) => {

    const cardRef = useRef()
    const swiperRef = useRef()

    const setNewCard = card => {
        setTransactionObject(prev => {
            const newCard = {_id: card._id, cardName: card.cardName, bankName: card.bankName}
            if (transactionObject.transactionType !== 'transfer') return {...prev, card: newCard}
            else {
                const futureObject = {}
                for (const key in prev) if (key !== 'transferCard') key === 'card' ?
                    futureObject[key] = newCard : futureObject[key] = prev[key]
                return futureObject
            }
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
                ref={cardRef}
                style={{'--modified-height': `${modifiedMode ? getHeight(cardRef) : '0px'} `}}>
                <SwiperEl Ref={swiperRef}>
                    {allCards.map(card => (
                        <swiper-slide
                            key={card._id}
                            class={`modified-card ${transactionObject.card._id === card._id ? 'modified-card-active' : ''}`}
                            onClick={() => setNewCard(card)}
                        ><FontAwesomeIcon icon="fa-solid fa-credit-card"/>{card.cardName}</swiper-slide>
                    ))}
                </SwiperEl>
            </div>
        </div>
    )
}

export default ModifiedCardBlock