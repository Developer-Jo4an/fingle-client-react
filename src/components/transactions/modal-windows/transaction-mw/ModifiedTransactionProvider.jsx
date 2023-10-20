import React, {useContext, useEffect, useRef, useState} from 'react'

import {useTransactionsContext} from '../../transactions/TransactionsProvider'
const ModifiedTransactionContext = React.createContext()
export const useModifiedTransactionContext = () => useContext(ModifiedTransactionContext)

const ModifiedTransactionProvider = ({ children }) => {

    const {transactionMWS} = useTransactionsContext()

    const [modifiedMode, setModifiedMode] = useState(false)

    // refs
    const refs = {
        modifiedCountRef: useRef()
    }

    // modal window
    const [modifiedCountMWS, setModifiedCountMWS] = useState(false)
    const [modifiedMessageMWS, setModifiedMessageMWS] = useState(false)
    // modal window

    useEffect(() => {
        if (!transactionMWS[0]) setTimeout(() => setModifiedMode(false), 300)
    }, [transactionMWS[0]])

    return (
        <ModifiedTransactionContext.Provider value ={{
            modifiedMode: [modifiedMode, setModifiedMode],
            modifiedCountMWS: [modifiedCountMWS, setModifiedCountMWS],
            modifiedMessageMWS: [modifiedMessageMWS, setModifiedMessageMWS],
            refs
        }}
        >{ children }
        </ModifiedTransactionContext.Provider>
    )
}

export default ModifiedTransactionProvider