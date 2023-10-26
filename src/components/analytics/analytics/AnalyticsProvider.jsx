import React, {useContext, useState} from 'react'

const AnalyticsContext = React.createContext()
export const useAnalyticsContext = () => useContext(AnalyticsContext)

const AnalyticsProvider = ({ children }) => {

    const [activeTotal, setActiveTotal] = useState('expense')
    const [statistic, setStatistic] = useState({
        expense: {},
        income: {}
    })
    const [categoryMWS, setCategoryMWS] = useState(false)
    const [activeCategory, setActiveCategory] = useState({})
    return (
        <AnalyticsContext.Provider value={{
            activeTotal: [activeTotal, setActiveTotal],
            statistic: [statistic, setStatistic],
            categoryMWS: [categoryMWS, setCategoryMWS],
            activeCategory: [activeCategory, setActiveCategory]
        }}>{ children }
        </AnalyticsContext.Provider>
    )
}

export default AnalyticsProvider