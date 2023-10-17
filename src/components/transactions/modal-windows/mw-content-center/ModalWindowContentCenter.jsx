import React from 'react'
import {useAddTransactionContext} from '../add-transaction-mw/AddTransactionProvider'

import './modal-window-content-center.css'

const ModalWindowContentCenter = ({nav, children}) => {

    const hideModalWindow = () => setVisible(false)

    const [visible, setVisible] = useAddTransactionContext()[nav]

    return (
        <div
            className={`modal-window-center ${visible ? 'modal-window-center-appearance' : ''}`}
            onClick={() => hideModalWindow()}
        ><div
            className={'modal-window-content-center'}
            onClick={e => e.stopPropagation()}
        >{ children }</div>
        </div>
    )
}

export default ModalWindowContentCenter