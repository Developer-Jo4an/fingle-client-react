import React from 'react'
import Transactions from '../transactions/transactions/Transactions'

import { useAppContext } from '../../AppProvider'

import './main.css'

const Main = () => {
    const {page} = useAppContext()

    return (
        <main>
            {page[0] === 'home' && <div>Home !USE MOBILE VERSION!</div>}
            {page[0] === 'analytics' && <div>Analytics !USE MOBILE VERSION!</div>}
            {page[0] === 'transactions' && <Transactions/>}
        </main>
    )
}

export default Main