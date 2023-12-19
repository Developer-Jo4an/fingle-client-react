import React from 'react'
import AnalyticsProvider, { useAnalyticsContext } from './AnalyticsProvider'
import Head from '../../UI/head/Head'
import Filter from '../filter/Filter'
import FilterSection from '../filter/filter-section/FilterSection'
import ModalWindow from '../modal-window/ModalWindow'
import AnalyticsCategoryModalWindow from './modal-windows/analytics-category-mw/AnalyticsCategoryModalWindow'
import AnalyticsPeriodReport from './analytics-period-report/AnalyticsPeriodReport'
import MoneyStreamInfo from './money-stream-info/MoneyStreamInfo'

import './analytics.css'

const Analytics = () => {
    return (
        <AnalyticsProvider>
            <section className={'analytics-page'}>
                <Head>Analytics</Head>
                <Filter/>
                <FilterSection/>
                <MoneyStreamInfo/>
                <AnalyticsPeriodReport/>
                <ModalWindow position={'bottom'} nav={'categoryMWS'} context={ useAnalyticsContext }><AnalyticsCategoryModalWindow/></ModalWindow>
            </section>
        </AnalyticsProvider>
    )
}

export default Analytics