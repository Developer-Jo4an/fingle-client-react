import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons"
const AddTransaction = ({setVisible}) => {
    return (
        <div
            className={'add-transaction-btn'}
            onClick={() => setVisible(true)}
        >
            <div className={'pulse-animation'}></div>
            <FontAwesomeIcon icon={faPlus}/>
        </div>
    )
}

export default AddTransaction;