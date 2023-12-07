import React, { useContext, useEffect, useRef, useState } from 'react'
import { useTransactionsContext } from '../../general/TransactionsProvider'

const ModifiedTransactionContext = React.createContext()
export const useModifiedTransactionContext = () => useContext(ModifiedTransactionContext)

const ModifiedTransactionProvider = ({ children }) => {

    const { transactionMWS } = useTransactionsContext()

    const modifiedMode = useState(false)

    // refs
    const refs = { modifiedCountRef: useRef() }

    useEffect(() => {
        if (!transactionMWS[0]) setTimeout(() => modifiedMode[1](false), 300)
    }, [transactionMWS[0]])

    return (
        <ModifiedTransactionContext.Provider value ={{
            modifiedMode: modifiedMode,
            modifiedCountMWS: useState(false),
            modifiedMessageMWS: useState(false),
            refs
        }}
        >{ children }
        </ModifiedTransactionContext.Provider>
    )
}

export default ModifiedTransactionProvider