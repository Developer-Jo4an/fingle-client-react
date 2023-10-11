import React, {useRef} from 'react'

import './modified-transfer-card.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const ModifiedTransferCard = ({transferCardRef, modifiedMode, transactionObject, setTransactionObject, getHeight, allCards}) => {

    const swiperRef = useRef()

    const setNewTransferCard = (card, i, e) => {
        setTransactionObject(prev => {
            if (prev.card._id === card._id) {
                e.target.classList.add('error-animation')
                setTimeout(() => e.target.classList.remove('error-animation'), 700)
                return prev
            } else return {...prev, transferCard: {_id: card._id, cardName: card.cardName, bankName: card.bankName}}
        })
    }

    return (
        <div className={`transaction-info-chunk ${modifiedMode ? 'get-gap' : ''}`}>
            <div className='transaction-info-chunk-info'>
                <div className={'transaction-info-chunk-header'}>Transfer Card</div>
                <div className={'transaction-info-chunk-value'}>{transactionObject.transferCard ? transactionObject.transferCard.cardName : 'Choice transfer card'}</div>
            </div>

            <div
                className={`modified-transaction-block ${modifiedMode ? 'modified-block-on' : ''}`}
                ref={transferCardRef}
                style={{'--modified-height': `${modifiedMode ? getHeight(transferCardRef) : '0px'} `}}
                >
                <swiper-container
                    ref={swiperRef}
                    slides-per-view="auto"
                    free-mode="true"
                    space-between="10"
                    free-mode-momentum="true"
                    freeModeMomentumRatio="0"
                >{allCards.map((card, i) => (
                    <swiper-slide
                        key={card._id}
                        class={`modified-transfer-card ${transactionObject.transferCard ? transactionObject.transferCard._id === card._id ? 'modified-transfer-card-active' : '' : ''}`}
                        onClick={e => setNewTransferCard(card, i, e)}
                    ><FontAwesomeIcon icon="fa-solid fa-credit-card"/>{card.cardName}</swiper-slide>
                ))}
                </swiper-container>
            </div>
        </div>
    )
}

export default ModifiedTransferCard