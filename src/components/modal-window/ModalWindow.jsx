import React, { useEffect } from 'react'

import './modal-window.css'

const ModalWindow = ({ position, nav, context, children }) => {

    const [visible, setVisible] = context()[nav]


    const getPosition = () => {
        const positionLogic = {
            bottom: `modal-window-content-bottom ${visible ? 'modal-window-content-bottom-appearance' : ''}`,
            center: 'modal-window-content-center',
        }
        return positionLogic[position]
    }

    useEffect(() => { document.body.style.overflow = visible ? 'hidden' : 'visible' }, [visible])

    return (
        <div
            className={`modal-window ${visible ? 'modal-window-appearance' : ''}`}
            onClick={() => setVisible(false)}
        ><div
            className={ getPosition() }
            onClick={e => e.stopPropagation()}
        >{ children }</div>
        </div>
    )
}

export default ModalWindow