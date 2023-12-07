import React from 'react'
import BasicProvider from './BasicProvider'
import BasicHeader from '../header/BasicHeader'

const Basic = () => {
    return (
        <BasicProvider>
            <section className={'basic-page'}>
                <BasicHeader/>
            </section>
        </BasicProvider>
    )
}

export default Basic