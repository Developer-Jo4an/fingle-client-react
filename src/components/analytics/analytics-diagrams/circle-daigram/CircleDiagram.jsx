import React, {useEffect, useState} from 'react'
import {ArcElement, Chart as ChartJS} from 'chart.js'

import {Doughnut} from 'react-chartjs-2'
import {useAppContext} from '../../../../application/AppProvider'
import {useAnalyticsContext} from '../../AnalyticsProvider'

import './circle-diagram.css'
import MyHead from '../../../../UI/head/MyHead';

ChartJS.register(ArcElement)

const CircleDiagram = () => {
    const {activeTotal, statistic} = useAnalyticsContext()
    const {total} = useAppContext()
    const [statisticArray, setStatisticArray] = useState([])

    useEffect(() => {
        setStatisticArray(Object.entries(statistic[0][activeTotal[0]]))
    }, [activeTotal[0], statistic[0]])

    const totalToggle = () => {
        const active = activeTotal[0] === 'expense' ? 'income' : 'expense'
        activeTotal[1](active)
    }

    const dataArrays = property => {
        if (statisticArray.length) return statisticArray.map(([, obj]) => obj[property])
        else return property === 'count' ? [1, 1, 1, 1, 1] : ['#e5e3e3', '#e5e3e3', '#e5e3e3', '#e5e3e3', '#e5e3e3']
    }

    const doughnutChartData = {
        datasets: [{
            data: dataArrays('count'),
            backgroundColor: dataArrays('color'),
            borderWidth: !statisticArray.length ? 2 : 0
        }]
    }

    return (
        <div className={'analytics-circle-diagram-section'}>
            <h2>Categories info</h2>
            <div className={'circle-diagram'}>
                <div className={'circle-diagram-wrapper'}>
                    <Doughnut data={doughnutChartData}/>
                    <div className={'circle-diagram-total-wrapper'}>
                        <div
                            onClick={totalToggle}
                            className={`circle-diagram-total ${activeTotal[0] === 'expense' ? 'circle-diagram-total-active' : ''}`}
                            style={{'--total-color': '#ee3a3a'}}
                        >{total[0].expense} USD</div>
                        <div
                            onClick={totalToggle}
                            className={`circle-diagram-total ${activeTotal[0] === 'income' ? 'circle-diagram-total-active' : ''}`}
                            style={{'--total-color': '#24e597'}}
                        >{total[0].income} USD</div>
                    </div>
                </div>
                <div className={'circle-diagram-info-wrapper'}>
                    {statisticArray.length ? statisticArray.map(([name, obj]) =>
                            (
                                <div key={name} className={'circle-diagram-info'}>
                                    <div style={{'--square-color': obj.color}} className={'circle-diagram-info-square'}></div>
                                    <div className={'circle-diagram-info-name'}>{name}</div>
                                </div>
                            ))
                        :
                        <div className={'analytics-statistic-no-transactions-message'}>{`No ${activeTotal[0]} transactions found in this options`}</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default CircleDiagram