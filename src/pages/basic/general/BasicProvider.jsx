import React, {useContext} from 'react'

const BasicContext = React.createContext()
const useBasicContext = () => useContext(BasicContext)

const BasicProvider = ({ children }) => {
    return (
        <BasicContext.Provider value={{
            a: 1
        }}>{ children }</BasicContext.Provider>
    )
}

export default BasicProvider