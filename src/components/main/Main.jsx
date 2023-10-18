import React from 'react'
import Transactions from '../transactions/transactions/Transactions'

import { useContextApp } from '../../AppProvider'

import './main.css'

const Main = () => {
    const {page} = useContextApp()

    return (
        <main>
            {page[0] === 'home' && <div>Home !USE MOBILE VERSION!</div>}
            {page[0] === 'analytics' && <div>Analytics !USE MOBILE VERSION!</div>}
            {page[0] === 'transactions' && <Transactions/>}
        </main>
    )
}

export default Main