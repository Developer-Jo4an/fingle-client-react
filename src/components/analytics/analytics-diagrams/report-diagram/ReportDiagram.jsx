import React, {useEffect, useState} from 'react'
import SwiperEl from '../../../swiper/SwiperEl'

import {useAppContext} from '../../../../application/AppProvider'
import {useAnalyticsContext} from '../../AnalyticsProvider'
import {dateObj, reloadSlider} from '../../../../my-functions/my-functions'
import moment from 'moment'

import './report-diagram.css'

const ReportDiagram = () => {

    const { user, period, filter, filterEls } = useAppContext()
    const { transactions } = user[0]
    const {
        diagramInterval,
        diagramType,
        histograms,
        refs,
    } = useAnalyticsContext()

    const [maxCount, setMaxCount] = useState(0)

    useEffect(() => {
        const [start, end] = dateObj(diagramInterval[0] === 'W' ? 'Week' : diagramInterval[0] === 'M' ? 'Month' : 'Year')

        let histogramsObject = {}

        const checker = tr => tr.date >= start && tr.date <= end && diagramType[0] === tr.transactionType
        const expand = (count, key) => histogramsObject.hasOwnProperty(key) ? histogramsObject[key] += count : histogramsObject[key] = count

        if (diagramInterval[0] !== 'Y') transactions.forEach(tr => checker(tr) ? expand(tr.count, tr.date.toLocaleDateString()) : null)
        else {
            histogramsObject = transactions.reduce((acc, tr) => {
                if (checker(tr)) {
                    const key = tr.date.toLocaleDateString().split('.').slice(1).join('.')
                    if (acc.hasOwnProperty(key)) acc[key] += tr.count
                    else acc[key] = tr.count
                }
                return acc
            }, {})
        }

        const histogramsArr = () => {
            const settingsFunc = (counter, subtractOpt, dateOption) => {
                const arr = []
                for (let i = 0; i < counter; i++) {
                    const date = moment(new Date()).subtract(i, subtractOpt)._d
                    arr.push({
                        label: date.toLocaleDateString('en-US', dateOption),
                        key: subtractOpt !== 'months' ? date.toLocaleDateString() : date.toLocaleDateString().split('.').slice(1).join('.')
                    })
                } return arr
            }

            const sorter = {
                W: settingsFunc(7, 'days', { weekday: 'short' }),
                M: settingsFunc(30, 'days', { day: 'numeric', month: 'short' }),
                Y: settingsFunc(12, 'months', { month: 'short' })
            }
            return sorter[diagramInterval[0]]
        }

        histograms[1]({ obj: histogramsObject, arr: histogramsArr() })
    }, [diagramInterval[0], diagramType[0]])

    useEffect(() => {
        const { obj } = histograms[0]
        setMaxCount(Object.values(obj).reduce((acc, count) => acc = count > acc ? count : acc, 0))
        reloadSlider(refs.histograms)
    }, [histograms[0]])

    const maxCountFunc = factor => (maxCount * factor).toFixed(0)
    const getPercent = count => `${count.getPercent(maxCount)}%`
    const histogramVisibleStyles = key => ({
        height: getPercent(histograms[0].obj[key]),
        backgroundColor: diagramType[0] === 'expense' ? '#ee3a3a' : '#24e597'
    })

    const histogramClick = key => {
        period[1](prev => {
            const arrDate = key.split('.')
            if (arrDate.length === 2) {
                const [month, year] = arrDate
                const start = new Date(`${month}.01.${year}`)
                const end = moment(start).add(1, 'months')._d
                return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
            }
            else if (arrDate.length === 3) return key
            return prev
        })
        filter[1]({
            transactionType: [diagramType[0]],
            card: [],
            category: [],
        })
        filterEls[1]([{
            id: diagramType[0],
            _id: diagramType[0],
            label: diagramType[0][0].toUpperCase() + diagramType[0].slice(1),
            icon: `fa-solid fa-arrow-${diagramType[0] === 'expense' ? 'down' : 'up'}`,
            color: diagramType[0] === 'expense' ? '#ee3a3a' : '#24e597',
        }])
    }

    return (
        <div className={'report-diagram-wrapper'}>
            <div className={'report-diagram-max-count-info'}>
                <div className={'report-diagram-count-part'}>{maxCount} $</div>
                <div className={'report-diagram-count-part'}>{maxCountFunc(0.8)} $</div>
                <div className={'report-diagram-count-part'}>{maxCountFunc(0.6)} $</div>
                <div className={'report-diagram-count-part'}>{maxCountFunc(0.4)} $</div>
                <div className={'report-diagram-count-part'}>{maxCountFunc(0.2)} $</div>
                <div style={{height: '20px'}} className={'report-diagram-count-part'}>0 $</div>
            </div>
            <div className={'report-diagram-histograms-wrapper'}>
                <SwiperEl Ref={refs.histograms}>
                    {histograms[0].arr.map(({label, key}) => {
                        if (histograms[0].obj.hasOwnProperty(key)) {
                            return <swiper-slide
                                class={'report-diagram-histogram'}
                                key={key}
                                onClick={() => histogramClick(key)}
                            >
                                <div
                                    style={histogramVisibleStyles(key)}
                                    className={'report-diagram-histogram__visible'}
                                ></div>
                                <div className={'report-diagram-histogram__date'}>{label}</div>
                            </swiper-slide>
                        } else {
                            return <swiper-slide
                                class={'report-diagram-histogram'}
                                key={key}
                            >   <div className={'report-diagram-histogram__hidden'}></div>
                                <div className={'report-diagram-histogram__date'}>{label}</div>
                            </swiper-slide>
                        }
                    })}
                </SwiperEl>
            </div>
        </div>
    )
}
export default ReportDiagram