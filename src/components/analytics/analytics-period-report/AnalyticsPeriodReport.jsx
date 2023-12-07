import React from 'react'
import ReportDiagram from '../analytics-diagrams/report-diagram/ReportDiagram'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useAnalyticsContext} from '../AnalyticsProvider'

import './analytics-period-report.css'

const AnalyticsPeriodReport = () => {

    const { histograms, diagramType, diagramInterval } = useAnalyticsContext()

    const countColor = () => ({ color: diagramType[0] === 'expense' ? '#ee3a3a' : '#24e597' })
    const activePeriod = nav => {
        if (diagramInterval[0] === nav) {
            if (diagramType[0] === 'expense') return { backgroundColor: 'rgb(238, 58, 58, 0.2)', color: '#ee3a3a' }
            if (diagramType[0] === 'income') return { backgroundColor: 'rgb(36, 229, 151, 0.2)', color: '#24e597' }
        }
    }
    const typeToggle = () => diagramType[1](prev => prev === 'expense' ? 'income' : 'expense')
    const formattedType = () => diagramType[0].slice(0, 1).toUpperCase() + diagramType[0].slice(1)
    const toggleClass = () => ({color: diagramType[0] === 'expense' ? '#ee3a3a' : '#24e597', transform: `rotate(${diagramType[0] === 'expense' ? '180deg' : '0'})`})

    const totalCount = () => {
        const { obj } = histograms[0]
        if (Object.values(obj).length) return Object.values(obj).reduce((acc, value) => acc += value)
        else return 0
    }

    return (
        <div className={'analytics-period-report-section'}>
            <h2>Daily Tracker</h2>
            <div className={'analytics-period-report-wrapper'}>
                <div className={'analytics-period-report-header'}>
                    <div className={'analytics-period-report-header__up-level'}>
                        <div style={countColor()} className={'analytics-period-report-header-count'}>{totalCount()} $</div>
                        <div className={'analytics-period-report-header-intervals'}>
                            <div
                                onClick={() => diagramInterval[1]('W')}
                                style={activePeriod('W')}
                                className={'analytics-period-report-header-btn'}
                            >W</div>
                            <div
                                onClick={() => diagramInterval[1]('M')}
                                style={activePeriod('M')}
                                className={'analytics-period-report-header-btn'}
                            >M</div>
                            <div
                                onClick={() => diagramInterval[1]('Y')}
                                style={activePeriod('Y')}
                                className={'analytics-period-report-header-btn'}
                            >Y</div>
                        </div>
                    </div>
                    <div className={'analytics-period-report-header__down-level'}>
                        <div className={'analytics-period-report-header-type-toggle'}>
                            <div className={'analytics-period-report-header-type-toggle-wrapper'} onClick={typeToggle}>
                                <div className={'analytics-period-report-header-type'}>{formattedType()}</div>
                                {<FontAwesomeIcon style={toggleClass()} className={'toggle-icon'} icon='fa-solid fa-angle-up'/>}
                            </div>
                        </div>
                    </div>
                </div>
                <ReportDiagram/>
            </div>
        </div>
    )
}

export default AnalyticsPeriodReport