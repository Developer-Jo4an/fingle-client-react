import React from 'react'
import Transactions from '../transactions/transactions/Transactions'
import Analytics from '../analytics/Analytics'
import ModalWindow from '../modal-window/ModalWindow'
import DateFilterModalWindow from '../filter/date-filter-mw/DateFilterModalWindow'
import OptionsFilterModalWindow from '../filter/options-filter-mw/OptionsFilterModalWindow'

import { useAppContext } from '../../application/AppProvider'

import './main.css'

const Main = () => {
    const {page} = useAppContext()

    return (
        <main>
            {page[0] === 'home' && <div>Home !USE MOBILE VERSION!</div>}
            {page[0] === 'analytics' && <Analytics/>}
            {page[0] === 'transactions' && <Transactions/>}
            <ModalWindow position={'bottom'} nav={'periodMWS'} context={useAppContext}><DateFilterModalWindow/></ModalWindow>
            <ModalWindow position={'bottom'} nav={'filterMWS'} context={useAppContext}><OptionsFilterModalWindow/></ModalWindow>
        </main>
    )
}

export default Main