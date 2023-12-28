import React from 'react'
import BasicProvider, { useBasicContext } from './BasicProvider'
import BasicHeader from '../header/BasicHeader'
import Stories from '../stories/Stories'
import Accounts from '../accounts/Accounts'
import ModalWindow from '../../../components/modal-window/ModalWindow'
import Total from '../total/Total'
import CreateAccountModalWindow from '../modal-windows/create-account-mw/CreateAccountModalWindow'
import AccountModalWindow from '../modal-windows/account-mw/AccountModalWindow'

import './basic.css'

const Basic = () => {
    return (
        <BasicProvider>
            <section className={'basic-page'}>
                <BasicHeader/>
                <Stories/>
                <Total/>
                <Accounts/>
                <ModalWindow position={'center'} nav={'createAccountMWS'} context={ useBasicContext }><CreateAccountModalWindow/></ModalWindow>
                <ModalWindow position={'center'} nav={'accountMWS'} context={ useBasicContext }><AccountModalWindow/></ModalWindow>
            </section>
        </BasicProvider>
    )
}

export default Basic