import React, { useRef, useState } from 'react'
import CloseCenterModalWindowXmark from '../../../../UI/close-modal-window-btn/CloseCenterModalWindowXmark'
import ApplyBtn from '../../../../UI/apply-btn/ApplyBtn'
import CancelBtn from '../../../../UI/cancel-btn/CancelBtn'
import Loader from '../../../../components/loader/Loader'

import axios from 'axios'
import { useAppContext } from '../../../../application/AppProvider'
import { useBasicContext } from '../../general/BasicProvider'
import { getCountStyle, roundUp, userId } from '../../../../my-functions/my-functions'

import './create-account-modal-window.css'

const CreateAccountModalWindow = () => {

    const { user } = useAppContext()
    const { createAccountMWS, newAccount } = useBasicContext()

    const [newAccountState, dispatch] = newAccount

    const loader = useState(false)

    const typeRef = useRef()
    const inputNameRef = useRef()
    const inputCountRef = useRef()

    const switchNewAccountType = type => dispatch({ type: 'type', accountType: type })

    const newAccountPreviewSign = () => {
        const signLogic = {
            card: <div className={'create-account-card-sign'}>
                <div className={'create-account-sign-card__number'}></div>
                <div className={'create-account-sign-card__type'}></div>
                  </div>,
            cash: <div className={'create-account-cash-sign'}>
                <div className={'create-account-sign-cash__sign-wrapper'}>$</div>
                  </div>
        }
        return signLogic[newAccountState.accountType]
    }

    const resetCreateAccount = () => {
        inputNameRef.current.value = inputCountRef.current.value = ''
        dispatch({ type: 'reset' })
    }

    const applyCreateAccount = async () => {
        if (
            typeof newAccountState.accountName === 'string'
            && newAccountState.accountName.length >= 1 && newAccountState.accountName.length <= 30
            && typeof newAccountState.count === 'number'
            && newAccountState.count !== 'NaN'
            && (newAccountState.accountType === 'card' || newAccountState.accountType === 'cash')
        ) {
            try {
                loader[1](true)
                const userData = await axios.post(`${userId}/add-account`, { account: newAccountState })
                const { data } = userData

                if (data.status) user[1](prev => ({ ...prev, accounts: data.accounts }))
                else throw new Error(data.message)
            } catch (e) { alert(e.message) }
            finally {
                loader[1](false);
                createAccountMWS[1](false)
                resetCreateAccount()
            }
        } else alert('Incorrect data!')
    }

    return (
        <div className={'create-account-modal-window'}>
            <CloseCenterModalWindowXmark setVision={createAccountMWS[1]}/>
            <h4>Create account</h4>
            <div className={'create-card-form'}>
                <label htmlFor='accountName'>
                    <input
                        ref={ inputNameRef }
                        type='text'
                        id={'accountName'}
                        className={'create-account-name-input'}
                        maxLength={30} minLength={1}
                        name={'accountName'}
                        placeholder={'name'}
                        onChange={current => dispatch({ type: 'name', accountName: current.target.value })}
                    />
                </label>
                <label htmlFor='count'>
                    <input
                        ref={ inputCountRef }
                        type='number'
                        id={'count'}
                        className={'create-account-name-input'}
                        maxLength={15} minLength={1}
                        name={'count'}
                        placeholder={'count'}
                        onChange={current => dispatch({ type: 'count', count: (+current.target.value).toFixed(2) })}
                    />
                </label>
                <div className={'create-account-type-toggle-wrapper'}>
                    <div ref={ typeRef } className={'create-account-type-toggle'}>
                        <div
                            className={`create-account-type-toggle-btn ${newAccountState.accountType === 'card' ? 'create-account-active-type' : ''}`}
                            onClick={() => switchNewAccountType('card')}
                        >CARD</div>
                        <div
                            className={`create-account-type-toggle-btn ${ newAccountState.accountType === 'cash' ? 'create-account-active-type' : '' }`}
                            onClick={() => switchNewAccountType('cash')}
                        >CASH</div>
                        <div className={`create-account-type-focus ${ newAccountState.accountType === 'card' ? '' : 'create-account-card-focus' }`}></div>
                    </div>
                </div>
                <div className={'create-account-preview'}>
                    <div className={'create-account-sign-wrapper'}>{ newAccountPreviewSign() }</div>
                    <div className={'create-account-name-wrapper'}><div className={'create-account-name-value'}>{ newAccountState.accountName ? newAccountState.accountName : 'empty' }</div></div>
                    <div style={ getCountStyle(newAccountState.count) } className={'create-account-count-wrapper'}><div className={'create-account-count-value'}>{ roundUp(newAccountState.count) } $</div></div>
                </div>
            </div>
            <div className={'create-account-btns'}>
                <ApplyBtn click={applyCreateAccount}/>
                <CancelBtn click={resetCreateAccount}/>
            </div>
            <Loader visible={loader}/>
        </div>
    )
}

export default CreateAccountModalWindow