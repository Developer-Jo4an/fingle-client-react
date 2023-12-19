import React from 'react'
import SwiperVerticalEl from '../../../components/swiper/SwiperVerticalEl'

import { useAppContext } from '../../../application/AppProvider'
import { useBasicContext } from '../general/BasicProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getAccountSign, getCountStyle, roundUp } from '../../../my-functions/my-functions'

import './accounts.css'

const Accounts = () => {

    const { user } = useAppContext()
    const { refs, accountsMWS } = useBasicContext()
    const { accounts } = user[0]

    const getToTotalInfo = toTotal => toTotal ? 'Yes' : 'No'

    return (
        <section className={'accounts-section'}>
            <div className={'accounts-section-header'}>
                <h2>Accounts</h2>
                <div
                    className={'accounts-section-settings'}
                    onClick={() => accountsMWS[1](true)}
                >
                    <FontAwesomeIcon icon='fa-solid fa-gear'/>
                </div>
            </div>
            <div className={'accounts-wrapper'}>
                <SwiperVerticalEl Ref={ refs.accounts }>
                    <swiper-slide class={'swiper-split-vertical'}></swiper-slide>
                    { accounts.map(account => (
                        <swiper-slide key={ account._id } class={'account-tile'}>
                            <div className={'account-sign-wrapper'}>{ getAccountSign(account.accountType) }</div>
                            <div className={'account-name-wrapper'}><div className={'account-name-value'}>{ account.accountName }</div></div>
                            <div className={'account-count-wrapper'}><div style={ getCountStyle(account.count) } className={'account-count-value'}>{ roundUp(account.count) } $</div></div>
                        </swiper-slide>
                    ))}
                    <swiper-slide class={'swiper-split-vertical'}></swiper-slide>
                </SwiperVerticalEl>
            </div>
        </section>
    )
}

export default Accounts