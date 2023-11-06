import React from 'react'
import AnalyticsProvider, {useAnalyticsContext} from './AnalyticsProvider'
import MyHead from '../UI/head/MyHead'
import Filter from '../filter/Filter'
import CircleDiagram from './analytics-diagrams/circle-daigram/CircleDiagram'
import FilterSection from '../filter/filter-section/FilterSection'
import AnalyticsCategoryStatistic from './analytics-category-statistic/AnalyticsCategoryStatistic'
import ModalWindow from '../modal-window/ModalWindow'
import AnalyticsCategoryModalWindow from './modal-windows/analytics-category-mw/AnalyticsCategoryModalWindow'
import AnalyticsPeriodReport from './analytics-period-report/AnalyticsPeriodReport'

import './analytics.css'

const Analytics = () => {
    return (
        <AnalyticsProvider>
            <section className={'analytics-page'}>
                <MyHead>Analytics</MyHead>
                <Filter/>
                <FilterSection/>
                <CircleDiagram/>
                <AnalyticsCategoryStatistic/>
                <AnalyticsPeriodReport/>
                <ModalWindow position={'bottom'} nav={'categoryMWS'} context={useAnalyticsContext}><AnalyticsCategoryModalWindow/></ModalWindow>
            </section>
        </AnalyticsProvider>
    )
}

export default Analytics