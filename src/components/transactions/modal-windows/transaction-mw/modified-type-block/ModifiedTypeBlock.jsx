import React from 'react'

import './modified-type-block.css'

const ModifiedTypeBlock = ({transactionObject}) => {
    return (
        <div className={'transaction-info-chunk'}>
            <div className={'transaction-info-chunk-info'}>
                <div className={'transaction-info-chunk-header'}>Type</div>
                <div className={'transaction-info-chunk-value'}>{transactionObject.transactionType}</div>
            </div>
        </div>
    )
}

export default ModifiedTypeBlock