import React from 'react'
import { Buffer } from 'buffer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faGear } from '@fortawesome/free-solid-svg-icons'

import './header.css'

const Header = ({...props}) => {
    const {avatar, nickname} = props
    const avatarBuffer = Buffer.from(avatar).toString('base64')
    return (
        <header>
            <div className="header-user-main-info">
                <img src={`data:image/jpeg;base64,${avatarBuffer}`} alt="header-avatar" className={'header-avatar'}/>
                <div className={'header-user-nickname'}>@{nickname}</div>
            </div>
            <div className={'header-buttons'}>
                <button className={'header-button'}><FontAwesomeIcon icon={faBell}/></button>
                <button className={'header-button'}><FontAwesomeIcon icon={faGear}/></button>
            </div>
        </header>
    );
};

export default Header