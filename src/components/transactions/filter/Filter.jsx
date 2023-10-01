import React from 'react'
import DateFilter from '../date-filter/DateFilter'
import DateFilterArrows from '../date-filter-arrows/DateFilterArrows'

import './filter.css'
const Filter = ({interval, setInterval, setDateFilterVisible}) => {

    return (
        <div className={'transactions-filter'}>
            <div className={'date-filter-wrapper'}>
                <DateFilter interval={interval} setDateFilterVisible={setDateFilterVisible}/>
                <DateFilterArrows interval={interval} setInterval={setInterval} setDateFilterVisible={setDateFilterVisible}/>
            </div>
        </div>
    )
}

export default Filter