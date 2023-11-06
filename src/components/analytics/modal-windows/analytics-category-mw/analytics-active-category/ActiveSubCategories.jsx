import React from 'react'

import {useAnalyticsContext} from '../../../AnalyticsProvider'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import './active-sub-categories.css'

const ActiveSubCategories = () => {

    const {activeCategory, activeTotal} = useAnalyticsContext()

    if (!Object.keys(activeCategory[0]).length) return null

    const {obj} = activeCategory[0]

    const categoryPercent = count => count.getPercent(obj.count)
    const categoryColor = () => ({color: activeTotal[0] === 'expense' ? '#ee3a3a' : '#24e597'})
    const barSettings = ({color, count}) => ({backgroundColor: color, width: `${categoryPercent(count)}%`})

    let subCategoriesArray = [];

    (() => {for (const key in obj) if (key !== 'color' && key !== 'count' && key !== 'sign') subCategoriesArray.push([key, obj[key]])})()

    return (
        <div className={`analytics-sub-categories-info-wrapper ${subCategoriesArray.length ? '' : 'none-sub-categories'}`}>
            {subCategoriesArray.length &&
                subCategoriesArray.map(([categoryName, object]) => (
                    <div key={categoryName} className={'category-statistic category-no-click'}>
                        <div className={'category-statistic__sign'}>
                            <div style={{'--sign-color': object.color}}>
                                <FontAwesomeIcon icon={object.sign}/>
                            </div>
                        </div>
                        <div className={'category-statistic__name'}><div>{categoryName}</div></div>
                        <div className={'category-statistic__count'} style={categoryColor()}>{object.count} $</div>
                        <div className={'category-statistic__bar'}>
                            <div className={'category-statistic__progress-bar'}><div style={barSettings(object)}></div></div>
                        </div>
                        <div className={'category-statistic__percent'}>{categoryPercent(object.count)} %</div>
                    </div>
                ))
            }
        </div>
    )
}

export default ActiveSubCategories