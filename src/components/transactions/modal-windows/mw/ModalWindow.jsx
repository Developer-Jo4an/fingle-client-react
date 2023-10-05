import React from 'react'

import './modal-window.css'
const ModalWindow = ({visible, setVisible, ...props}) => {

    const hideModalWindow = () => setVisible(false)

    return (
        <div
            className={`modal-window ${visible ? 'modal-window-appearance' : ''}`}
            onClick={hideModalWindow}
        ><div
            className={`modal-window-content ${visible ? 'modal-window-content-appearance' : ''}`}
            onClick={e => e.stopPropagation()}
        >{props.children}</div>
        </div>
    )
}

export default ModalWindow