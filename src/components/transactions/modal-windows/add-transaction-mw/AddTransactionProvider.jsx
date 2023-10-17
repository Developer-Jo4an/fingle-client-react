import React, {useContext, useEffect, useRef, useState} from 'react'

const AddTransactionContext = React.createContext()
export const useAddTransactionContext = () => useContext(AddTransactionContext)

const AddTransactionProvider = ({ children }) => {

    const [newTransaction, setNewTransaction] = useState({
        transactionType: 'expense',
        date: new Date(),
        count: '0',
    })
    const [loader, setLoader] = useState(false)
    const [messageMWS, setMessageMWS] = useState(false)
    const refs = {
        expense: useRef(),
        income: useRef(),
        transfer: useRef(),
        card: useRef(),
        count: useRef()
    }

    useEffect(() => {
        console.log(newTransaction)
    }, [newTransaction])

    return (
        <AddTransactionContext.Provider value={{
            newTransaction: [newTransaction, setNewTransaction],
            refs,
            messageMWS: [messageMWS, setMessageMWS],
            loader: [loader, setLoader]
        }}>{ children }
        </AddTransactionContext.Provider>

    )
}

export default AddTransactionProvider