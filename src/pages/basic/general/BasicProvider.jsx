import React, { useContext, useReducer, useRef, useState } from 'react'

const BasicContext = React.createContext()
export const useBasicContext = () => useContext(BasicContext)

export const newAccountReducer = (state, action) => {
    switch (action.type) {
        case 'name': return { ...state, accountName: action.accountName }
        case 'count': return { ...state, count: +action.count }
        case 'type': return { ...state, accountType: action.accountType }
        case 'reset': return { accountName: '', count: 0, accountType: 'card' }
        default: return state
    }
}

const BasicProvider = ({ children }) => {

    const refs = {
        accounts: useRef(),
    }

    return (
        <BasicContext.Provider value={{
            accountsMWS: useState(false),
            createAccountMWS: useState(false),
            newAccount: useReducer(newAccountReducer, { accountName: '', count: 0, accountType: 'card' }),
            refs,
        }}>{ children }</BasicContext.Provider>
    )
}

export default BasicProvider