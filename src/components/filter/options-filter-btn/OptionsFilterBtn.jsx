import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useAppContext} from '../../../application/AppProvider'

import './options-filter-btn.css'

const OptionsFilterBtn = () => {

    const {filterMWS} = useAppContext()

    return (
        <div className={'options-filter'}>
            <div className={'options-filer-wrapper'} onClick={() => filterMWS[1](true)}>
                <FontAwesomeIcon icon='fa-solid fa-sliders'/>
            </div>
        </div>
    )
}

export default OptionsFilterBtn