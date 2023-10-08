import React, {useRef} from 'react'

import './modified-count-block.css'

const ModifiedCountBlock = ({modifiedMode, transactionObject, getHeight, setCalcVisible}) => {

    const countRef = useRef()

    const getCount = () => {
        const settings = {
            expense: -transactionObject.count,
            income: transactionObject.count,
            transfer: transactionObject.count
        }
        return `${settings[transactionObject.transactionType]} $`
    }

    const calcAppearance = () => setCalcVisible(true)


    return (
        <div className={`transaction-info-chunk ${modifiedMode ? 'get-gap' : ''}`}>
            <div className='transaction-info-chunk-info'>
                <div className={'transaction-info-chunk-header'}>Count</div>
                <div className={'transaction-info-chunk-value'}>{getCount()}</div>
            </div>

            <div
                className={`modified-transaction-block ${modifiedMode ? 'modified-block-on' : ''}`}
                ref={countRef}
                style={{'--modified-height': `${modifiedMode ? getHeight(countRef) : '0px'} `}}
            ><div className={'modified-count'}>
                <div
                    className={'modified-count-wrapper'}
                    onClick={() => calcAppearance()}
                >
                    <div className={'modified-count-currency'}>USD</div>
                    <div className={'modified-count-value'}>{transactionObject.count}</div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ModifiedCountBlock