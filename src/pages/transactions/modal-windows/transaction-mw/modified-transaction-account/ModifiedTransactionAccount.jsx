import React, { useRef } from 'react'
import SwiperEl from '../../../../../components/swiper/SwiperEl'

import { useTransactionsContext } from '../../../general/TransactionsProvider'
import { useAppContext } from '../../../../../application/AppProvider'
import { useModifiedTransactionContext } from '../ModifiedTransactionProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './modified-transaction-account.css'

const ModifiedTransactionAccount = () => {

    const { user } = useAppContext()
    const { modifiedMode } = useModifiedTransactionContext()
    const { modifiedTransaction } = useTransactionsContext()
    const [modified, dispatch] = modifiedTransaction
    const sliderRef = useRef()

    const modifiedAccount = account => dispatch({type: 'account', account: account})

    const getAccountSign = ({ accountType }) => accountType === 'cash' ? 'fa-solid fa-money-bill' : 'fa-solid fa-credit-card'

    return (
        <div className={`modified-transaction-account ${modifiedMode[0] ? 'get-gap' : ''}`}>
            <div className={'always-visible-account-section'}>
                <div className={'modified-option-account-name'}>Account</div>
                <div className={'modified-option-account-value'}>{modified.account.accountName}</div>
            </div>
            <div
                className={'invisible-account-section'}
                style={{height: modifiedMode[0] ? 'auto' : '0px'}}
            ><SwiperEl Ref={ sliderRef }>
                <swiper-slide class={'swiper-split'}></swiper-slide>
                { user[0].accounts.map(account => (
                    <swiper-slide
                        key={ account._id }
                        class={`modified-transaction-account-slide ${modified.account._id === account._id ? 'modified-account-active' : ''}`}
                        onClick={() => modifiedAccount(account)}
                    ><FontAwesomeIcon icon={ getAccountSign(account) }/>{ account.accountName }
                    </swiper-slide>
                )) }
                <swiper-slide class={'swiper-split'}></swiper-slide>
            </SwiperEl>
            </div>
        </div>
    )
}

export default ModifiedTransactionAccount