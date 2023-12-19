import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './close-modal-window-btn.css'

const CloseCenterModalWindowXmark = ({ setVision }) => {

    return (
        <div
            className={'close-modal-window-center-btn'}
            onClick={() => setVision(false)}
        >
            <FontAwesomeIcon icon='fa-solid fa-xmark'/>
        </div>
    )
}

export default CloseCenterModalWindowXmark