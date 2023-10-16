import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useTransactionsContext} from '../transactions/TransactionsProvider'

import './options-filter.css'

const OptionsFilter = () => {

    const {filterMWS} = useTransactionsContext()

    return (
        <div className={'options-filter'}>
            <div className={'options-filer-wrapper'} onClick={() => filterMWS[1](true)}>
                <FontAwesomeIcon icon='fa-solid fa-sliders'/>
            </div>
        </div>
    )
}

export default OptionsFilter