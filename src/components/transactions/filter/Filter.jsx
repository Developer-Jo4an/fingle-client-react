import React from 'react'
import DateFilter from '../date-filter/DateFilter'
import DateFilterArrows from '../date-filter-arrows/DateFilterArrows'
import OptionsFilter from '../options-filter/OptionsFilter'

import './filter.css'

const Filter = () => {
    return (
        <div className={'transactions-filter'}>
            <div className={'date-filter-wrapper'}>
                <DateFilter/>
                <DateFilterArrows/>
                <OptionsFilter/>
            </div>
        </div>
    )
}

export default Filter