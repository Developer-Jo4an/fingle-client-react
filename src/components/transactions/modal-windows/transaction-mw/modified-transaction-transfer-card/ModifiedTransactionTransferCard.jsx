import React, {useRef} from 'react'
import SwiperEl from '../../../../swiper/SwiperEl'

import {useModifiedTransactionContext} from '../ModifiedTransactionProvider'
import {useTransactionsContext} from '../../../transactions/TransactionsProvider'
import {useAppContext} from '../../../../../AppProvider'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import './modified-transaction-transfer-card.css'

const ModifiedTransactionTransferCard = () => {

    const {user} = useAppContext()
    const {modifiedMode} = useModifiedTransactionContext()
    const {modifiedTransaction} = useTransactionsContext()
    const [modified, dispatch] = modifiedTransaction

    const sliderRef = useRef()
    const cardRefs = useRef([])

    const modifiedTransferCard = (transferCard, i) => {
        if (transferCard._id === modified.card._id) {
            cardRefs.current[i].classList.add('error-animation')
            setTimeout(() => cardRefs.current[i].classList.remove('error-animation'), 700)
        } else dispatch({type: 'transfer-card', transferCard})
    }

    return (
        <div className={`modified-transaction-transfer-card ${modifiedMode[0] ? 'get-gap' : ''}`}>
            <div className={'always-visible-transfer-card-section'}>
                <div className={'modified-option-transfer-card-name'}>Transfer card</div>
                <div className={'modified-option-transfer-card-value'}>{modified.transferCard ? modified.transferCard.cardName : ''}</div>
            </div>
            <div
                className={'invisible-transfer-card-section'}
                style={{height: modifiedMode[0] ? 'auto' : '0px'}}
            ><SwiperEl Ref={sliderRef}>
                {user[0].allCards.map((transferCard, i) => (
                    <swiper-slide
                        key={transferCard._id}
                        ref={el => cardRefs.current[i] = el}
                        class={`modified-transaction-transfer-card-slide ${modified.transferCard ? modified.transferCard._id === transferCard._id ? 'modified-transfer-card-active' : '' : ''}`}
                        onClick={() => modifiedTransferCard(transferCard, i)}
                    ><FontAwesomeIcon icon='fa-solid fa-credit-card'/>{transferCard.cardName}
                    </swiper-slide>
                ))}
            </SwiperEl>
            </div>
        </div>
    )
}

export default ModifiedTransactionTransferCard