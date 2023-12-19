import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './add-btn.css'

const AddBtn = ({ context, nav, bottom }) => {

    const [_, setState] = context()[nav]

    return (
        <div
            className={'add-btn'}
            style={{ '--bottom-px': `${bottom}px` }}
            onClick={() => setState(true)}
        >
            <div className={'pulse-animation'}></div>
            <FontAwesomeIcon icon='fa-solid fa-plus'/>
        </div>
    )
}

export default AddBtn