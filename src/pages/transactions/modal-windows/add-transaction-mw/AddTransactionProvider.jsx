import React, {useContext, useReducer, useRef, useState} from 'react'

const AddTransactionContext = React.createContext()
export const useAddTransactionContext = () => useContext(AddTransactionContext)

const reducer = (state, action) => {
    switch (action.type) {
        case 'type' : {
            const future = {}
            for (const key in state) if (key !== 'category' && key !== 'subCategory' && key !== 'transferAccount') future[key] = state[key]
            future.transactionType = action.trType
            return future
        }
        case 'date' : return { ...state, date: action.date }
        case 'date-arrow' : return { ...state, date: action.callback(state.date) }
        case 'account' : {
            const { account } = action
            if (state.account) {
                if (state.account._id !== account._id) {
                    const future = { ...state, account }
                    delete future.transferAccount
                    return future
                } else return state
            } else return { ...state, account }
        }
        case 'transfer-account' : {
            const { transferAccount, transferAccountsRefs, i } = action
            // functions
            const error = () => {
                transferAccountsRefs.current[i].classList.add('error-animation')
                setTimeout(() => transferAccountsRefs.current[i].classList.remove('error-animation'), 700)
            }

            const equal = () => {
                if (transferAccount._id !== state.account._id) return { ...state, transferAccount }
                else { error(); return state }
            }
            // logic
            if (state.account) {
                if (state.transferAccount) {
                    if (state.transferAccount._id === transferAccount._id) return state
                    return equal()
                } return equal()
            } else { error(); return state }
        }
        case 'category' : {
            const {category} = action
            if (state.category) {
                if (state.category.name === category.name) return state
                else {
                    const future = { ...state, category }
                    delete future.subCategory
                    return future
                }
            } else return { ...state, category }
        }
        case 'sub-category' : {
            const {category} = action
            if (state.subCategory) {
                if (state.subCategory.name === category.name) {
                    const future = { ...state }
                    delete future.subCategory
                    return future
                }
                else return { ...state, subCategory: category }
            } else return { ...state, subCategory: category }
        }
        case 'message' : return { ...state, message: action.message }
        case 'remove-message' : {
            const future = state
            delete future.message
            return future
        }
        case 'count' : return { ...state, count: action.count }
        case 'zeroing' : return { transactionType: 'expense', date: new Date(), count: '0' }
        default : return state
    }
}

const AddTransactionProvider = ({ children }) => {

    const refs = {
        expense: useRef(),
        income: useRef(),
        transfer: useRef(),
        account: useRef(),
        count: useRef(),
    }

    const newTransaction = useReducer(reducer,{
        transactionType: 'expense',
        date: new Date(),
        count: '0',
    })

    return (
        <AddTransactionContext.Provider value={{
            newTransaction: newTransaction,
            refs,
            result: useState('0'),
            messageMWS: useState(false),
            loader: useState(false)
        }}>{ children }
        </AddTransactionContext.Provider>
    )
}

export default AddTransactionProvider