import React from 'react'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import './cancek-btn.css'

const CancelBtn = ({ click }) => {
    return (
        <button
            className={'cancel-btn'}
            onClick={click}
        ><FontAwesomeIcon icon='fa-solid fa-xmark'/>
        </button>
    )
}

export default CancelBtn