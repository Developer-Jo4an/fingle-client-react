import React from 'react'
import SwiperEl from '../../../../../components/swiper/SwiperEl'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppContext } from '../../../../../application/AppProvider'
import { useAddTransactionContext } from '../AddTransactionProvider'
import { roundUp } from '../../../../../my-functions/my-functions'

import './add-transaction-account.css'

const AddTransactionAccount = () => {
    const { user } = useAppContext()
    const { accounts } = user[0]
    const { newTransaction, refs } = useAddTransactionContext()
    const [ futureTransaction, dispatch ] = newTransaction

    const selectAccount = account => dispatch({ type: 'account', account: account })

    const getAccountSign = ({ accountType }) => accountType === 'cash' ? 'fa-solid fa-money-bill' : 'fa-solid fa-credit-card'

    return (
        <div className={'slider-wrapper'}>
            <SwiperEl Ref={refs.account}>
                <swiper-slide class={'swiper-split'}></swiper-slide>
                { accounts.map(account => (
                    <swiper-slide
                        key={account._id}
                        class={`add-transaction-account ${futureTransaction.account && futureTransaction.account._id === account._id ? 'add-transaction-account-active' : ''}`}
                        onClick={() => selectAccount(account)}
                    >
                        <div className={'add-transaction-account-info'}>
                            <div className={'add-transaction-account-info__sign'}>
                                <div className={'add-transaction-account-info__sign-wrapper'}>
                                    <FontAwesomeIcon icon={getAccountSign(account)}/>
                                </div>
                            </div>
                            <div className={'add-transaction-account-info__name'}>{account.accountName}</div>
                            <div className={'add-transaction-account-info__count'}>{roundUp(account.count)} $</div>
                        </div>
                    </swiper-slide>)) }
                <swiper-slide class={'swiper-split'}></swiper-slide>
            </SwiperEl>
        </div>
    )
}

export default AddTransactionAccount