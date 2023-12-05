import React from 'react'
import AnalyticsProvider, {useAnalyticsContext} from './AnalyticsProvider'
import MyHead from '../../UI/head/MyHead'
import Filter from '../filter/Filter'
import CircleDiagram from './analytics-diagrams/circle-daigram/CircleDiagram'
import FilterSection from '../filter/filter-section/FilterSection'
import AnalyticsCategoryStatistic from './analytics-category-statistic/AnalyticsCategoryStatistic'
import ModalWindow from '../modal-window/ModalWindow'
import AnalyticsCategoryModalWindow from './modal-windows/analytics-category-mw/AnalyticsCategoryModalWindow'
import AnalyticsPeriodReport from './analytics-period-report/AnalyticsPeriodReport'
import AnalyticsBudget from './analytics-budget/AnalyticsBudget'
import AnalyticsBudgetModalWindow from './modal-windows/analytics-budget-mw/AnalyticsCreateBudgetModalWindow'

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
                <AnalyticsBudget/>
                <ModalWindow position={'bottom'} nav={'categoryMWS'} context={useAnalyticsContext}><AnalyticsCategoryModalWindow/></ModalWindow>
                <ModalWindow position={'bottom'} nav={'createBudgetMWS'} context={useAnalyticsContext}><AnalyticsBudgetModalWindow/></ModalWindow>
            </section>
        </AnalyticsProvider>
    )
}

export default Analytics