import React from 'react'

import { Buffer } from 'buffer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContextApp } from '../../AppProvider'

import './header.css'

const Header = () => {
    const {user, page} = useContextApp()

    const {avatar, nickname} = user[0]

    if (page[0] !== 'home') return null

    return (
        <header>
            <div className='header-user-main-info'>
                <img src={`data:image/jpeg;base64,${Buffer.from(avatar).toString('base64')}`} alt='header-avatar' className={'header-avatar'}/>
                <div className={'header-user-nickname'}>@{nickname}</div>
            </div>
            <div className={'header-buttons'}>
                <button className={'header-button'}><FontAwesomeIcon icon='fa-solid fa-bell'/></button>
                <button className={'header-button'}><FontAwesomeIcon icon='fa-solid fa-gear'/></button>
            </div>
        </header>
    )
}

export default Header