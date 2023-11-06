import React from 'react'

import {useAnalyticsContext} from '../../../AnalyticsProvider'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useAppContext} from '../../../../../AppProvider'
import {dateObj, dateRefactor} from '../../../../../my-functions/my-functions'

import './analytics-active-category.css'

const AnalyticsActiveCategory = () => {

    const {activeCategory, activeTotal} = useAnalyticsContext()
    const {total, period} = useAppContext()
    const {categoryName, obj} = activeCategory[0]

    if (!Object.keys(activeCategory[0]).length) return null

    const categoryPercent = () => obj.count.getPercent(total[0][activeTotal[0]])
    const barSettings = () => ({width: `${categoryPercent()}%`, backgroundColor: obj.color})
    const categoryCountColor = () => ({color: activeTotal[0] === 'expense' ? '#ee3a3a' : '#24e597'})
    const categoryPeriod = () => {
        const [interval] = period

        const intervalObject = {
            word: () => {
                if (interval === 'All time') return 'All time'
                const formattedDate = dateObj(interval).map(date => dateRefactor(date)).join(' - ')
                return interval === 'Today' ? formattedDate.split(' - ')[0] : formattedDate
            },
            oneDate: () => {
                const [day, month, year] = interval.split('.')
                return dateRefactor(`${month}.${day}.${year}`)
            },
            intervalDate: () => {
                let [start, stop] = interval.split(' - ')
                start = start.split('.')
                stop = stop.split('.')
                return `${dateRefactor(`${start[1]}.${start[0]}.${start[2]}`)} - ${dateRefactor(`${stop[1]}.${stop[0]}.${stop[2]}`)}`
            }
        }
        if (interval.includes(' - ')) return intervalObject.intervalDate()
        if (interval.includes('.')) return intervalObject.oneDate()
        return intervalObject.word()
    }


    return (
        <div className={'analytics-active-category-info'}>
            <div style={{'--active-category-color': obj.color}} className={'analytics-active-category-info__sign'}><div>{<FontAwesomeIcon icon={obj.sign}/>}</div></div>
            <div className={'analytics-active-category-info__name'}><div>{categoryName}</div></div>
            <div className={'analytics-active-category-info__period'}><div>{categoryPeriod()}</div></div>
            <div className={'analytics-active-category-info__count'} style={categoryCountColor()}>{obj.count} $</div>
            <div className={'analytics-active-category-info__bar'}>
                <div className={'analytics-active-category-info__progress-bar'}><div style={barSettings()}></div></div>
            </div>
            <div className={'analytics-active-category-info__percent'}>{categoryPercent()} %</div>
        </div>
    )
}

export default AnalyticsActiveCategory