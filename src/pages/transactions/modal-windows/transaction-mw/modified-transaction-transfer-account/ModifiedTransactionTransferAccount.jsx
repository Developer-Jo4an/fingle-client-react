import React, { useRef } from 'react'
import SwiperEl from '../../../../../components/swiper/SwiperEl'

import { useTransactionsContext } from '../../../general/TransactionsProvider'
import { useModifiedTransactionContext } from '../ModifiedTransactionProvider'
import { useAppContext } from '../../../../../application/AppProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './modified-transaction-transfer-account.css'

const ModifiedTransactionTransferAccount = () => {

    const { user } = useAppContext()
    const { modifiedMode } = useModifiedTransactionContext()
    const { modifiedTransaction } = useTransactionsContext()
    const [modified, dispatch] = modifiedTransaction

    const sliderRef = useRef()
    const accountRefs = useRef([])

    const modifiedTransferAccount = (transferAccount, i) => {
        if (transferAccount._id === modified.account._id) {
            accountRefs.current[i].classList.add('error-animation')
            setTimeout(() => accountRefs.current[i].classList.remove('error-animation'), 700)
        } else dispatch({ type: 'transfer-account', transferAccount })
    }

    const getAccountSign = ({ accountType }) => accountType === 'cash' ? 'fa-solid fa-money-bill' : 'fa-solid fa-credit-card'

    return (
        <div className={`modified-transaction-transfer-account ${modifiedMode[0] ? 'get-gap' : ''}`}>
            <div className={'always-visible-transfer-account-section'}>
                <div className={'modified-option-transfer-account-name'}>Transfer account</div>
                <div className={'modified-option-transfer-account-value'}>{ modified.transferAccount ? modified.transferAccount.accountName : '' }</div>
            </div>
            <div
                className={'invisible-transfer-account-section'}
                style={{ height: modifiedMode[0] ? 'auto' : '0px' }}
            ><SwiperEl Ref={ sliderRef }>
                <swiper-slide class={'swiper-split'}></swiper-slide>
                { user[0].accounts.map((transferAccount, i) => (
                    <swiper-slide
                        key={transferAccount._id}
                        ref={el => accountRefs.current[i] = el}
                        class={`modified-transaction-transfer-account-slide ${modified.transferAccount ? modified.transferAccount._id === transferAccount._id ? 'modified-transfer-account-active' : '' : ''}`}
                        onClick={() => modifiedTransferAccount(transferAccount, i)}
                    ><FontAwesomeIcon icon={ getAccountSign(transferAccount) }/>{ transferAccount.accountName }
                    </swiper-slide>
                )) }
                <swiper-slide class={'swiper-split'}></swiper-slide>
            </SwiperEl>
            </div>
        </div>
    )
}

export default ModifiedTransactionTransferAccount