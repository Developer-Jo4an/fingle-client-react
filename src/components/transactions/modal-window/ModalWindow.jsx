import React, {useState} from 'react';
import './modal-window.css'
const ModalWindow = ({visible, setVisible, ...props}) => {

    const hideModalWindow = () => setVisible(false)

    return (
        <div
            className={`modal-window ${visible ? 'modal-window-appearance' : ''}`}
            onClick={hideModalWindow}
        ><div className={`modal-window-content ${visible ? 'modal-window-content-appearance' : ''}`}>{props.children}</div>
        </div>
    )
}

export default ModalWindow;