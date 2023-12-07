import React from 'react'
import Main from './main/Main'
import Footer from './footer/Footer'
import AppProvider from './AppProvider'

import '../styles/zeroing/zeroing.css'

function App() {
    return (
        <AppProvider>
            <Main/>
            <Footer/>
        </AppProvider>
    )
}

export default App
