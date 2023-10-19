import React, {useEffect} from 'react'

import './modal-window-content-center.css'

const ModalWindowContentCenter = ({nav, context, children}) => {
    const [visible, setVisible] = context()[nav]

    useEffect(() => {
        visible ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'visible'
    }, [visible])

    const hideModalWindow = () => setVisible(false)

    return (
        <div
            className={`modal-window-center ${visible ? 'modal-window-center-appearance' : ''}`}
            onClick={hideModalWindow}
        ><div
            className={'modal-window-content-center'}
            onClick={e => e.stopPropagation()}
        >{children}</div>
        </div>
    )
}

export default ModalWindowContentCenter