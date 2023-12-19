import React from 'react'
import CloseModalWindowBtn from '../../../../UI/close-modal-window-btn/CloseModalWindowBtn'
import AddBtn from '../../../../UI/add-btn/AddBtn'

import { useAppContext } from '../../../../application/AppProvider'
import { useBasicContext } from '../../general/BasicProvider'
import { getAccountSign } from '../../../../my-functions/my-functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './accounts-modal-window.css'

const AccountsModalWindow = () => {

    const { accountsMWS } = useBasicContext()

    const { user } = useAppContext()
    const { accounts } = user[0]

    return (
        <div className={'accounts-modal-window'}>
            <CloseModalWindowBtn setVision={accountsMWS[1]}/>
            <AddBtn context={ useBasicContext } nav={'createAccountMWS'} bottom={ 25 }/>
            <div className={'accounts-modal-window-info'}>
                <h3 className={'accounts-modal-window-header'}>Accounts</h3>
                <div className={'accounts-modal-window-wrapper'}>
                    { accounts.map(account => (
                        <div key={ account._id } className={'account-modal-window-tile'}>
                            <div className={'account-modal-window-tile-sign'}>{ getAccountSign(account.accountType) }</div>
                            <div className={'account-modal-window-name-wrapper'}><div className={'account-modal-window-name-value'}>{ account.accountName }</div></div>
                            <div className={'account-modal-window-btns-wrapper'}>
                                <button className={'account-modal-window-btn account-btn-pen'}><FontAwesomeIcon icon='fa-solid fa-pen'/></button>
                                <button className={'account-modal-window-btn account-btn-xmark'}><FontAwesomeIcon icon='fa-solid fa-xmark'/></button>
                            </div>
                        </div>
                    )) }
                </div>
            </div>
        </div>
    )
}

export default AccountsModalWindow