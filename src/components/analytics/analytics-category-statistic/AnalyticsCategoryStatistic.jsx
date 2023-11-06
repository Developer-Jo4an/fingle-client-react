import React, {useEffect} from 'react'
import CategoryStatistic from './CategoryStatistic'

import {useAppContext} from '../../../AppProvider'
import {useAnalyticsContext} from '../AnalyticsProvider'

import './analytics-category-statistic.css'

const AnalyticsCategoryStatistic = () => {

    const {transactions} = useAppContext()
    const {activeTotal, statistic} = useAnalyticsContext()

    useEffect(() => {
        const statisticObject = {
            expense: {},
            income: {}
        }
        transactions[0].forEach(({transactionType, count, category, subCategory}) => {
            if (transactionType === 'transfer') return
            const {name} = category
            let categoryObj = statisticObject[transactionType][name] ||
                (statisticObject[transactionType][name] = {count: 0, color: category.color, sign: category.sign})
            categoryObj.count += count
            if (subCategory) {
                const subCategoryObj = categoryObj[subCategory.name] ||
                    (categoryObj[subCategory.name] = {count: 0, color: subCategory.color, sign: subCategory.sign})
                subCategoryObj.count += count
            }
        })
        statistic[1](statisticObject)
    }, [transactions[0]])

    return (
        <div className={'analytics-statistic'}>
            {Object.entries(statistic[0][activeTotal[0]]).map(([categoryName, obj]) =>
                <div key={categoryName} className={'category-statistic-wrapper'}>
                    <CategoryStatistic object={{categoryName, obj}}/>
                </div>
            )}
        </div>
    )
}

export default AnalyticsCategoryStatistic