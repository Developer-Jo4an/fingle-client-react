import React from 'react'
import DateFilter from './date-filter/DateFilter'
import DateFilterArrows from './date-filter-arrows/DateFilterArrows'
import OptionsFilterBtn from './options-filter-btn/OptionsFilterBtn'

import './filter.css'

const Filter = () => {
    return (
        <div className={'transactions-filter'}>
            <div className={'date-filter-wrapper'}>
                <DateFilter/>
                <DateFilterArrows/>
                <OptionsFilterBtn/>
            </div>
        </div>
    )
}

export default Filter