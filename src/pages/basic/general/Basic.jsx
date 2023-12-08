import React from 'react'
import BasicProvider from './BasicProvider'
import BasicHeader from '../header/BasicHeader'
import Stories from '../stories/Stories'

import './basic.css'

const Basic = () => {
    return (
        <BasicProvider>
            <section className={'basic-page'}>
                <BasicHeader/>
                <Stories/>
            </section>
        </BasicProvider>
    )
}

export default Basic