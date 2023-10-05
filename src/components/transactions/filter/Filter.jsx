import React from 'react'
import DateFilter from '../date-filter/DateFilter'
import DateFilterArrows from '../date-filter-arrows/DateFilterArrows'
import OptionsFilter from '../options-filter/OptionsFilter'

import './filter.css'

const Filter = ({interval, setInterval, setDateFilterVisible, setOptionsFilter}) => {

    return (
        <div className={'transactions-filter'}>
            <div className={'date-filter-wrapper'}>
                <DateFilter interval={interval} setDateFilterVisible={setDateFilterVisible}/>
                <DateFilterArrows interval={interval} setInterval={setInterval} setDateFilterVisible={setDateFilterVisible}/>
                <OptionsFilter setOptionsFilter={setOptionsFilter}/>
            </div>
        </div>
    )
}

export default Filter