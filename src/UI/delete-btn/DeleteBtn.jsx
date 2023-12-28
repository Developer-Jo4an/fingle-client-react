import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './delete-btn.css'

const DeleteBtn = ({ click }) => {
    return (
        <button
            className={'delete-btn'}
            onClick={click}
        ><FontAwesomeIcon icon='fa-solid fa-trash'/>
        </button>
    )
}

export default DeleteBtn