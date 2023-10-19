import React, {useContext, useEffect, useState} from 'react'

import axios from 'axios'
import {errorUser, userId} from './my-functions/my-functions'

const AppContext = React.createContext()
export const useAppContext = () => useContext(AppContext)

const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null) // userInfoState
    const [page, setPage] = useState('home') // activePageState

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userObj = await axios.get(`/get-user-info${userId}`)
                setUser(userObj.data)
            } catch (e) {
                console.error('Error 500, not answer from server')
                setUser(errorUser)
            }
        }
        getUserData()
    }, [])

    return (user && <AppContext.Provider value={{
        user: [user, setUser],
        page: [page, setPage]
    }}>{ children }</AppContext.Provider>)
}

export default AppProvider