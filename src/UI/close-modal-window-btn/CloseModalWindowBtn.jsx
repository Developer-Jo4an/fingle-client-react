import React from 'react'

import './close-modal-window-btn.css'

const CloseModalWindowBtn = ({ setVision }) => {
    return (
        <div
            className={'modal-window-close-btn'}
            onClick={() => setVision(false)}
        ><div className={'modal-window-close-btn-square'}></div>
        </div>
    )
}

export default CloseModalWindowBtn