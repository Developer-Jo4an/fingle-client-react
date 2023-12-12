import React, { useContext, useRef } from 'react'

const BasicContext = React.createContext()
export const useBasicContext = () => useContext(BasicContext)

const BasicProvider = ({ children }) => {

    const refs = {
        accounts: useRef()
    }

    return (
        <BasicContext.Provider value={{
            refs,
        }}>{ children }</BasicContext.Provider>
    )
}

export default BasicProvider