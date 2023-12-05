import React from 'react'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import './apply-btn.css'

const ApplyBtn = ({ click }) => {
    return (
        <button
            className={'apply-btn'}
            onClick={click}
        ><FontAwesomeIcon icon='fa-solid fa-check'/>
        </button>
    )
}

export default ApplyBtn