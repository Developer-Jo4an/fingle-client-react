import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCalendarDays} from "@fortawesome/free-solid-svg-icons";
const DateFilter = ({interval, setDateFilterVisible}) => {

    const appearanceModalWindow = () => setDateFilterVisible(true)

    return (
        <div
            onClick={appearanceModalWindow}
            className={'date-interval'}
        >
            <FontAwesomeIcon icon={faCalendarDays}/><div className={'date-interval-label'}>{interval}</div>
        </div>
    );
};

export default DateFilter;