import React from 'react'
import CircleDiagram from '../analytics-diagrams/circle-daigram/CircleDiagram'
import AnalyticsCategoryStatistic from '../analytics-category-statistic/AnalyticsCategoryStatistic'

import './money-stream-info.css'

const MoneyStreamInfo = () => {
    return (
        <div className={'money-stream-section'}>
            <h2>Overview</h2>
            <CircleDiagram/>
            <AnalyticsCategoryStatistic/>
        </div>
    )
}

export default MoneyStreamInfo