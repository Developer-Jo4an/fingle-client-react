import React, {useContext, useRef, useState} from 'react'

const ModifiedTransactionContext = React.createContext()
export const useModifiedTransactionContext = () => useContext(ModifiedTransactionContext)

const ModifiedTransactionProvider = ({ children }) => {

    const [modifiedMode, setModifiedMode] = useState(false)

    const refs = {
        date: useRef()
    }

    return (
        <ModifiedTransactionContext.Provider value ={{
            modifiedMode: [modifiedMode, setModifiedMode],
            refs
        }}
        >{ children }
        </ModifiedTransactionContext.Provider>
    )
}

export default ModifiedTransactionProvider;