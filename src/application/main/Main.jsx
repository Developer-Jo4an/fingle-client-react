import React from 'react'
import Transactions from '../../pages/transactions/general/Transactions'
import Analytics from '../../components/analytics/Analytics'
import ModalWindow from '../../components/modal-window/ModalWindow'
import DateFilterModalWindow from '../../components/filter/date-filter-mw/DateFilterModalWindow'
import OptionsFilterModalWindow from '../../components/filter/options-filter-mw/OptionsFilterModalWindow'
import Basic from '../../pages/basic/general/Basic'

import { useAppContext } from '../AppProvider'

import './main.css'

const Main = () => {

    const { page } = useAppContext()

    return (
        <main>
            { page[0] === 'home' && <Basic/> }
            { page[0] === 'analytics' && <Analytics/> }
            { page[0] === 'transactions' && <Transactions/> }
            <ModalWindow position={'bottom'} nav={'periodMWS'} context={useAppContext}><DateFilterModalWindow/></ModalWindow>
            <ModalWindow position={'bottom'} nav={'filterMWS'} context={useAppContext}><OptionsFilterModalWindow/></ModalWindow>
        </main>
    )
}

export default Main