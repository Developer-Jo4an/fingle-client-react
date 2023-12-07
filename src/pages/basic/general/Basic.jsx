import React from 'react'
import BasicProvider from './BasicProvider'
import BasicHeader from '../header/BasicHeader'

const Basic = () => {
    return (
        <BasicProvider>
            <BasicHeader/>
        </BasicProvider>
    )
}

export default Basic