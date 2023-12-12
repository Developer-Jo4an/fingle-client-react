import React from 'react'

import { useAppContext } from '../../../application/AppProvider'

import './accounts.css'

const Accounts = () => {

    const { user } = useAppContext()
    const { accounts } = user[0]

    return (
        <section className={'accounts-section'}>

        </section>
    )
}

export default Accounts