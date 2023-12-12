import React, { useRef } from 'react'
import SwiperEl from '../../../../../components/swiper/SwiperEl'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppContext } from '../../../../../application/AppProvider'
import { useAddTransactionContext } from '../AddTransactionProvider'
import { roundUp } from '../../../../../my-functions/my-functions'

import './add-transaction-transfer-account.css'

const AddTransactionTransferAccount = ({ Ref }) => {

    const { user } = useAppContext()
    const { accounts } = user[0]
    const { newTransaction } = useAddTransactionContext()
    const [futureTransaction, dispatch] = newTransaction

    const transferAccountsRefs = useRef([])

    const selectTransferAccount = (transferAccount, i) => dispatch({ type: 'transfer-account', transferAccount, transferAccountsRefs, i })

    const getAccountSign = ({ accountType }) => accountType === 'cash' ? 'fa-solid fa-money-bill' : 'fa-solid fa-credit-card'

    return (
        <div className={'slider-wrapper add-transaction-transfer-account-wrapper'}>
            <SwiperEl Ref={ Ref }>
                { accounts.map((transferAccount, i) => (
                    <swiper-slide
                        key={transferAccount._id}
                        class={`add-transaction-transfer-account ${futureTransaction.transferAccount && futureTransaction.transferAccount._id === transferAccount._id ? 'add-transaction-transfer-account-active' : ''}`}
                        ref={el => transferAccountsRefs.current[i] = el}
                        onClick={() => selectTransferAccount(transferAccount, i)}
                    ><div className={'add-transaction-transfer-account-info'}>
                        <div className={'add-transaction-transfer-account-info__sign'}>
                            <div className={'add-transaction-transfer-account-info__sign-wrapper'}>
                                <FontAwesomeIcon icon={ getAccountSign(transferAccount) }/>
                            </div>
                        </div>
                        <div className={'add-transaction-transfer-account-info__name'}>{ transferAccount.accountName }</div>
                        <div className={'add-transaction-transfer-account-info__count'}>{ roundUp(transferAccount.count) }</div>
                    </div></swiper-slide>))}
            </SwiperEl>
        </div>
    )
}

export default AddTransactionTransferAccount