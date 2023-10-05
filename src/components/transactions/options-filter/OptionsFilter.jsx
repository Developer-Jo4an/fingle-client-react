import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders } from '@fortawesome/free-solid-svg-icons'

import './options-filter.css'


const OptionsFilter = ({setOptionsFilter}) => {
    return (
        <div className={'options-filter'}>
            <div
                className={'options-filer-wrapper'}
                onClick={() => setOptionsFilter(true)}
            ><FontAwesomeIcon icon={faSliders}/></div>
        </div>
    )
}

export default OptionsFilter