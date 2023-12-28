import React from 'react'

import { useAppContext } from '../../../application/AppProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAnalyticsContext } from '../AnalyticsProvider'

import './category-statistic.css'

const CategoryStatistic = ({ object }) => {

    const { total } = useAppContext()
    const { activeTotal, categoryMWS, activeCategory } = useAnalyticsContext()

    const { categoryName, obj } = object

    const getProgressBarStyle = ({ color, count }) => ({ backgroundColor: color, width: `${count.getPercent(total[0][activeTotal[0]])}%` })
    const getTypeColorStyle = () => ({ color: activeTotal[0] === 'expense' ? '#ee3a3a' : '#24e597' })
    const getSignColorStyle = color => ({ '--sign-color' : color })

    return (
        <div
            className={'category-statistic'}
            onClick={() => {
                activeCategory[1](object)
                categoryMWS[1](true)
            }}
        >
            <div className={'category-statistic__sign'}><div style={ getSignColorStyle(obj.color) }><FontAwesomeIcon icon={obj.sign}/></div></div>
            <div className={'category-statistic__name'}><div>{ categoryName }</div></div>
            <div className={'category-statistic__count'} style={ getTypeColorStyle() }>{ obj.count } $</div>
            <div className={'category-statistic__bar'}>
                <div className={'category-statistic__progress-bar'}><div style={ getProgressBarStyle(obj) }></div></div>
            </div>
            <div className={'category-statistic__percent'}>{ obj.count.getPercent(total[0][activeTotal[0]]) } %</div>
        </div>
    )
}
export default CategoryStatistic