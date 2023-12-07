import React from 'react'

import { useAppContext } from '../../../application/AppProvider'
import { Buffer } from 'buffer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './basic-header.css'

const BasicHeader = () => {

    const { user } = useAppContext()
    let { avatar, nickname, subscriptionLevel } = user[0]


    return (
        <header>
            <div className={'basic-header-info-fraction'}>
                <div className={'basic-header-img-wrapper'}>
                    <img src={`data:image/jpeg;base64,${Buffer.from(avatar).toString('base64')}`} alt={'basic-header-img'} className={'basic-header-img'}/>
                </div>
                <div className={'basic-header-nickname-wrapper'}>
                    <div className={'basic-header-nickname'}>@{ nickname }</div>
                </div>
                <div className={'basic-header-subscription-level-wrapper'}>
                    <div className={`basic-header-subscription-level ${ subscriptionLevel === 'Professional' ? 'subscription-pro-level' : ''}`}>{ subscriptionLevel.toUpperCase() }</div>
                </div>
            </div>
            <div className={'basic-header-info-buttons'}>
                <div className={'basic-header-info-button-wrapper'}>
                    <div className='basic-header-info-button'><FontAwesomeIcon icon='fa-solid fa-bell' /></div>
                </div>
                <div className={'basic-header-info-button-wrapper'}>
                    <div className='basic-header-info-button'><FontAwesomeIcon icon='fa-solid fa-gear' /></div>
                </div>
            </div>
        </header>
    )
}

export default BasicHeader