import React from 'react'

import { useAppContext } from '../../../application/AppProvider'
import { getCountStyle, roundUp } from '../../../my-functions/my-functions'

import './total.css'

const Total = () => {

    const { user } = useAppContext()
    const { accounts } = user[0]

    const getFullCount = () => roundUp(accounts.reduce((acc, account) => acc + account.count, 0))


    return (
        <div className={'total-section'}>
            <h2>Total</h2>
            <div className={'total-info-wrapper'}>
                <div style={ getCountStyle(getFullCount()) } className={'total-value'}>{ getFullCount() } $</div>
                <div className={'total-info-label'}>Sum of all cards</div>
            </div>
        </div>
    )
}

export default Total