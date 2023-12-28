import React, { useContext, useReducer, useRef, useState } from 'react'

const BasicContext = React.createContext()
export const useBasicContext = () => useContext(BasicContext)

const accountReducerLogic = (state, action) => {
    switch (action.type) {
        case 'name': return { ...state, accountName: action.accountName }
        case 'count': return { ...state, count: +action.count }
        case 'type': return { ...state, accountType: action.accountType }
        case 'set': return action.account
        case 'reset': return { accountName: '', count: 0, accountType: 'card' }
        default: return state
    }
}

export const newAccountReducer = (state, action) => accountReducerLogic(state, action)
export const modifiedAccountReducer = (state, action) => accountReducerLogic(state, action)

const BasicProvider = ({ children }) => {

    const refs = {
        accounts: useRef(),
    }

    return (
        <BasicContext.Provider value={{
            accountMWS: useState(false),
            activeAccount: useReducer(modifiedAccountReducer, {}),
            activeAccountCopy: useState({}),
            createAccountMWS: useState(false),
            newAccount: useReducer(newAccountReducer, { accountName: '', count: 0, accountType: 'card' }),
            refs,
        }}>{ children }</BasicContext.Provider>
    )
}

export default BasicProvider