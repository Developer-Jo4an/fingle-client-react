import React from 'react'

import './modal-window-content-center.css'
const ModalWindowContentCenter = ({visible, setVisible, ...props}) => {

    const hideModalWindow = () => setVisible(false)

    return (
        <div
            className={`modal-window-center ${visible ? 'modal-window-center-appearance' : ''}`}
            onClick={() => hideModalWindow()}
        ><div
            className={'modal-window-content-center'}
            onClick={e => e.stopPropagation()}
        >{props.children}</div>
        </div>
    )
}

export default ModalWindowContentCenter