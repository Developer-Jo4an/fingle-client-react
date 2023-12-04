import React, {useContext, useRef, useState} from 'react'

const AnalyticsContext = React.createContext()
export const useAnalyticsContext = () => useContext(AnalyticsContext)

const AnalyticsProvider = ({ children }) => {

    const [activeTotal, setActiveTotal] = useState('expense')
    const [statistic, setStatistic] = useState({
        expense: {},
        income: {}
    })
    const [activeCategory, setActiveCategory] = useState({})
    // for report diagram
    const [diagramType, setDiagramType] = useState('expense')
    const [diagramInterval, setDiagramInterval] = useState('W')
    const [histograms, setHistograms] = useState({obj: {}, arr: []})
    // for report diagram

    // modal window
    const [categoryMWS, setCategoryMWS] = useState(false)
    // modal window
    const [createBudgetMWS, setCreateBudgetMWS] = useState(false)
    // refs
    const refs = {histograms: useRef()}
    // refs

    return (
        <AnalyticsContext.Provider value={{
            activeTotal: [activeTotal, setActiveTotal],
            statistic: [statistic, setStatistic],
            categoryMWS: [categoryMWS, setCategoryMWS],
            createBudgetMWS: [createBudgetMWS, setCreateBudgetMWS],
            activeCategory: [activeCategory, setActiveCategory],
            diagramType: [diagramType, setDiagramType],
            diagramInterval: [diagramInterval, setDiagramInterval],
            histograms: [histograms, setHistograms],
            refs
        }}>{ children }
        </AnalyticsContext.Provider>
    )
}

export default AnalyticsProvider