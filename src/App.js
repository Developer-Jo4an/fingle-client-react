import React, {useEffect, useState} from "react"
import Header from "./components/header/Header"
import Main from "./components/main/Main"
import Footer from "./components/footer/Footer"

import axios from "axios"
import {userId, errorUser} from "./my-functions/my-functions"

import './styles/zeroing/zeroing.css'
function App() {

    const [userData, setUserData] = useState(null)
    const [activePage, setActivePage] = useState('home')

    useEffect(() => {
        try {
            const getUserData = async () => {
                const userObj = await axios.get(`/get-user-info${userId}`)
                setUserData(userObj.data)
            }
            getUserData()
        } catch (e) {
            console.error('Error 500, not answer from server')
            setUserData(errorUser)
        }
    }, [])

    const pageNav = (page) => setActivePage(page)

    return (
        userData ?
        <section className={'fingle-application'}>
            {activePage === 'home' && <Header activePage={activePage} avatar={userData.avatar} nickname={userData.nickname}/>}
            <Main
                activePage={activePage}
                transactions={userData.transactions}
                allCards={userData.allCards}
                transactionCategories={userData.transactionCategories}/>
            <Footer pageNav={pageNav} activePage={activePage}/>
        </section>
        : <div className={'fingle-loader'}></div>
    )
}

export default App;
