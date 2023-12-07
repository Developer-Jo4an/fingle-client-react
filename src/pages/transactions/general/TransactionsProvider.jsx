import React, {useContext, useReducer, useState} from 'react'

const TransactionsContext = React.createContext()
export const useTransactionsContext = () => useContext(TransactionsContext)

export const modifiedTransactionReducer = (state, action) => {
    switch (action.type) {
        case 'set' : return action.transaction
        case 'date' : return {...state, date: action.date}
        case 'date-arrow': return {...state, date: action.callback(state)}
        case 'card' : {
            const futureObject = {}
            for (const key in state) if (key !== 'transferCard') futureObject[key] = state[key]
            return {...futureObject, card: action.card}
        }
        case 'count' : return {...state, count: action.count}
        case 'add-message' : return {...state, message: action.message}
        case 'remove-message' : {
            const futureObject = {}
            for (const key in state) if (key !== 'message') futureObject[key] = state[key]
            return futureObject
        }
        case 'category' : {
            const futureObject = {}
            for (const key in state) if (key !== 'category' && key !== 'subCategory') futureObject[key] = state[key]
            return {...futureObject, category: action.category}
        }
        case 'delete-sub-category' : {
            const futureObject = {}
            for (const key in state) if (key !== 'subCategory') futureObject[key] = state[key]
            return futureObject
        }
        case 'add-sub-category' : return {...state, subCategory: action.subCategory}
        case 'transfer-card' : return  {...state, transferCard: action.transferCard}
        default: return state
    }
}

const TransactionsProvider = ({ children}) => {
    return (
        <TransactionsContext.Provider value={{
            addMWS: useState(false),
            transactionMWS: useState(false),
            modifiedTransaction: useReducer(modifiedTransactionReducer, {}),
            prevTransaction: useState(false)
        }}>{ children }
        </TransactionsContext.Provider>
    )
}

export default TransactionsProvider