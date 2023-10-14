import React from 'react'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import './transaction-filter-section.css'

const TransactionFilterSection = ({filterElements, deleteFilterEl}) => {
    return (
        <div className={'transaction-filters-section'}>
            <div className={'filter-elements-wrapper'}>
                {filterElements.map(({id, obj}) => (
                    <div
                        key={id}
                        className={'filter-element'}
                        style={{'--filter-element-color': obj.color}}
                        onClick={() => deleteFilterEl(id)}
                    >
                        <FontAwesomeIcon icon={obj.icon}/>
                        {obj.label}
                        <FontAwesomeIcon icon='fa-solid fa-xmark'/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TransactionFilterSection