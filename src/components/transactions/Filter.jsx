import React from 'react';
import DateFilter from "./DateFilter";
import DateFilterArrows from "./DateFilterArrows";

const Filter = ({interval, setInterval, setDateFilterVisible, ...props}) => {
    const {transactions, allCards, transactionCategories} = props

    return (
        <div className={'transactions-filter'}>
            <div className={'date-filter-wrapper'}>
                <DateFilter interval={interval}  setDateFilterVisible={setDateFilterVisible}/>
                <DateFilterArrows interval={interval} setInterval={setInterval} setDateFilterVisible={setDateFilterVisible}/>
            </div>
        </div>
    )
}

export default Filter;