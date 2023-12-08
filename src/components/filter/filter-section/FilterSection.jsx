import React from 'react'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useAppContext} from '../../../application/AppProvider'

import './filter-section.css'

const FilterSection = () => {

    const {filterEls, filter} = useAppContext()

    const deleteProperty = el => {
        filterEls[1](prev => prev.filter(item => item.id !== el.id))
        filter[1](prev => {
            const newFilter = {}
            for (const key in prev) newFilter[key] = prev[key].filter(item => item !== el.id)
            return newFilter
        })
    }

    return (
        <div className={`transaction-filters-section ${filterEls[0].length ? '' : 'transaction-filters-section-hide'}`}>
            <div className={'filter-elements-wrapper'}>
                {filterEls[0].map(el => (
                    <div
                        key={el.id}
                        className={'filter-element'}
                        style={{'--filter-element-color': el.color}}
                        onClick={() => deleteProperty(el)}
                    ><FontAwesomeIcon icon={el.icon}/>{el.label}<FontAwesomeIcon icon='fa-solid fa-xmark'/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FilterSection