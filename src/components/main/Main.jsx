import React from 'react'
import Transactions from '../transactions/transactions/Transactions'
import { useContextApp } from '../../AppProvider'

import './main.css'

const Main = () => {
    const {page} = useContextApp()

    const pageLogic = {
        home: () => 'main-home',
        analytics: () => 'main-analytics',
        transactions: () => 'main-transaction'
    }

    return (
        <main className={pageLogic[page[0]]()}>
            <div style={{width: '33.3333%'}}>Home</div>
            <div style={{width: '33.3333%'}}>Analytics</div>
            <Transactions/>
        </main>
    )
}

export default Main