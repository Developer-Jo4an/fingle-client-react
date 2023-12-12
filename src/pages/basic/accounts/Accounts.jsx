import React from 'react'
import SwiperEl from '../../../components/swiper/SwiperEl'

import { useAppContext } from '../../../application/AppProvider'
import { useBasicContext } from '../general/BasicProvider'
import { roundUp } from '../../../my-functions/my-functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './accounts.css'

const Accounts = () => {

    const { user } = useAppContext()
    const { refs } = useBasicContext()
    const { accounts } = user[0]

    const [cash, card] = accounts

    const getTotalSign = bool => bool ? <FontAwesomeIcon icon='fa-solid fa-check'/> : <FontAwesomeIcon icon='fa-solid fa-xmark'/>

    const getAccountTypeSign = type => type === 'cash' ? 'fa-solid fa-money-bill' : 'fa-solid fa-credit-card'

    return (
        <section className={'accounts-section'}>
            <SwiperEl Ref={refs.accounts}>
                <swiper-slide class={'swiper-split'}></swiper-slide>
                {accounts.map(account => (
                    <swiper-slide class={'account'}>
                        <div className={'account-type-sign'}><FontAwesomeIcon
                            icon={ getAccountTypeSign(account.accountType) }/></div>
                        <div className={'account-name'}>
                            <div className={'account-name-wrapper'}>{account.accountName}</div>
                        </div>
                        <div className={'account-count'}>
                            <div className={'account-count-wrapper'}>{roundUp(account.count)} $</div>
                        </div>
                        <div className={'account-keeper-name'}>{account.keeperName}</div>
                        <div className={'account-to-total'}>Total: {getTotalSign(account.toTotal)}</div>
                    </swiper-slide>
                ))}
                <swiper-slide class={'swiper-split'}></swiper-slide>
            </SwiperEl>
        </section>
    )
}

export default Accounts