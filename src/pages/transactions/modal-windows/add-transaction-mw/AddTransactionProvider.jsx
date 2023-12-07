import React, {useContext, useReducer, useRef, useState} from 'react'

const AddTransactionContext = React.createContext()
export const useAddTransactionContext = () => useContext(AddTransactionContext)

const reducer = (state, action) => {
    switch (action.type) {
        case 'type' : {
            const future = {}
            for (const key in state) if (key !== 'category' && key !== 'subCategory' && key !== 'transferCard') future[key] = state[key]
            future.transactionType = action.trType
            return future
        }
        case 'date' : return {...state, date: action.date}
        case 'date-arrow' : return {...state, date: action.callback(state.date)}
        case 'card' : {
            const {card} = action
            if (state.card) {
                if (state.card._id !== card._id) {
                    const future = {...state, card}
                    delete future.transferCard
                    return future
                } else return state
            } else return {...state, card}
        }
        case 'transfer-card' : {
            const {transferCard, transferCardsRefs, i} = action
            // functions
            const error = () => {
                transferCardsRefs.current[i].classList.add('error-animation')
                setTimeout(() => transferCardsRefs.current[i].classList.remove('error-animation'), 700)
            }

            const equal = () => {
                if (transferCard._id !== state.card._id) return { ...state, transferCard }
                else { error(); return state }
            }
            // logic
            if (state.card) {
                if (state.transferCard) {
                    if (state.transferCard._id === transferCard._id) return state
                    return equal()
                } return equal()
            } else { error(); return state}
        }
        case 'category' : {
            const {category} = action
            if (state.category) {
                if (state.category.name === category.name) return state
                else {
                    const future = {...state, category}
                    delete future.subCategory
                    return future
                }
            } else return {...state, category}
        }
        case 'sub-category' : {
            const {category} = action
            if (state.subCategory) {
                if (state.subCategory.name === category.name) {
                    const future = {...state}
                    delete future.subCategory
                    return future
                }
                else return {...state, subCategory: category}
            } else return {...state, subCategory: category}
        }
        case 'message' : return {...state, message: action.message}
        case 'remove-message' : {
            const future = state
            delete future.message
            return future
        }
        case 'count' : return {...state, count: action.count}
        case 'zeroing' : return {transactionType: 'expense', date: new Date(), count: '0'}
        default : return state
    }
}

const AddTransactionProvider = ({ children }) => {

    const refs = {
        expense: useRef(),
        income: useRef(),
        transfer: useRef(),
        card: useRef(),
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