import React, {useEffect} from 'react'

import {useTransactionsContext} from '../../transactions/TransactionsProvider'

import './modal-window.css'

const ModalWindow = ({ nav, children }) => {

    const [visible, setVisible] = useTransactionsContext()[nav]

    useEffect(() => {
        visible ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'visible'
    }, [visible])

    const hideModalWindow = () => setVisible(false)

    return (
        <div
            className={`modal-window ${visible ? 'modal-window-appearance' : ''}`}
            onClick={hideModalWindow}
        ><div
            className={`modal-window-content ${visible ? 'modal-window-content-appearance' : ''}`}
            onClick={e => e.stopPropagation()}
        >{children}</div>
        </div>
    )
}

export default ModalWindow