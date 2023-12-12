import React from 'react'
import BasicProvider from './BasicProvider'
import BasicHeader from '../header/BasicHeader'
import Stories from '../stories/Stories'
import Accounts from '../accounts/Accounts'

import './basic.css'

const Basic = () => {
    return (
        <BasicProvider>
            <section className={'basic-page'}>
                <BasicHeader/>
                <Stories/>
                <Accounts/>
            </section>
        </BasicProvider>
    )
}

export default Basic