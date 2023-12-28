import React, { useEffect, useRef, useState } from 'react'
import ApplyBtn from '../../../../UI/apply-btn/ApplyBtn'
import CancelBtn from '../../../../UI/cancel-btn/CancelBtn'
import CloseCenterModalWindowXmark from '../../../../UI/close-modal-window-btn/CloseCenterModalWindowXmark'
import Loader from '../../../../components/loader/Loader'
import DeleteBtn from '../../../../UI/delete-btn/DeleteBtn'

import axios from 'axios'
import { useBasicContext } from '../../general/BasicProvider'
import { getCountStyle, roundUp, userId } from '../../../../my-functions/my-functions'
import { useAppContext } from '../../../../application/AppProvider'

import './account-modal-window.css'

const AccountModalWindow = () => {

    const { user } = useAppContext()
    const { accountMWS, activeAccount, activeAccountCopy } = useBasicContext()
    const [activeAccountState, dispatch] = activeAccount
    const loader = useState(false)

    const modifiedInputNameRef = useRef()
    const modifiedInputCountRef = useRef()
    const modifiedTypeRef = useRef()

    const switchNewAccountType = type => {
        if (!activeAccountState.deleted) { alert('This card cannot be changed in type!'); return null }
        dispatch({ type: 'type', accountType: type })
    }

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
        return signLogic[activeAccountState.accountType]
    }

    const cancelClick = () => {
        dispatch({ type: 'set', account: activeAccountCopy[0] })
        modifiedInputCountRef.current.value = modifiedInputNameRef.current.value = ''
    }

    const applyClick = async () => {
        let differenceCount = 0
        for (const key in activeAccountState) if (activeAccountState[key] !== activeAccountCopy[0][key]) differenceCount++
        if (differenceCount) {
            try {
                loader[1](true)
                const userData = await axios.put(`${userId}/modified-account`, { account: activeAccountState })
                const { data } = userData

                if (data.status) user[1](prev => ({ ...prev, accounts: data.accounts }))
                else throw new Error(data.message)
            } catch (e) { alert(e.message) }
            finally {
                loader[1](false)
                accountMWS[1](false)
                dispatch({type: 'reset'})
                activeAccountCopy[1]({})
            }
        } else alert('Make changes!')
    }

    const deleteClick = async function () {
        const result = window.confirm('Are you sure you want to delete the account?')
        if (!activeAccountState.deleted) alert('This account cannot be deleted!')
        if (!result || !activeAccountState.deleted) return null
        try {
            loader[1](true)
            const userData = await axios.delete(`${userId}/delete-account/${activeAccountState._id}`)
            const { data } = userData

            if (data.status) user[1](prev => ({ ...prev, accounts: data.accounts }))
            else throw new Error(data.message)
        }
        catch (e) { alert(e.message) }
        finally {
            loader[1](false)
            accountMWS[1](false)
            dispatch({ type: 'reset' })
            activeAccountCopy[1]({})
        }
    }

    useEffect(() => { if (!accountMWS[0]) {
        if (modifiedInputCountRef.current && modifiedInputNameRef.current) modifiedInputCountRef.current.value = modifiedInputNameRef.current.value = ''
    } }, [accountMWS[0]])

    if (!activeAccountState._id) return null

    return (
        <div className={'create-account-modal-window'}>
            <CloseCenterModalWindowXmark setVision={accountMWS[1]}/>
            <h4>Account</h4>
            <div className={'create-card-form'}>
                <label htmlFor='accountName'>
                    <input
                        ref={ modifiedInputNameRef }
                        type='text'
                        id={'accountName'}
                        className={'create-account-name-input'}
                        maxLength={30} minLength={1}
                        name={'accountName'}
                        placeholder={ activeAccountState.accountName }
                        onChange={ current => dispatch({ type: 'name', accountName: current.target.value }) }
                    />
                </label>
                <label htmlFor='count'>
                    <input
                        ref={ modifiedInputCountRef }
                        type='number'
                        id={'count'}
                        className={'create-account-name-input'}
                        maxLength={15} minLength={1}
                        name={'count'}
                        placeholder={ roundUp(activeAccountState.count) }
                        onChange={ current => dispatch({ type: 'count', count: (+current.target.value).toFixed(2) }) }
                    />
                </label>
                <div className={'create-account-type-toggle-wrapper'}>
                    <div ref={ modifiedTypeRef } className={`create-account-type-toggle ${ activeAccountState.deleted ? '' : 'disable-delete-account-btn' }`}>
                        <div
                            className={`create-account-type-toggle-btn ${activeAccountState.accountType === 'card' ? 'create-account-active-type' : ''}`}
                            onClick={() => switchNewAccountType('card')}
                        >CARD</div>
                        <div
                            className={`create-account-type-toggle-btn ${ activeAccountState.accountType === 'cash' ? 'create-account-active-type' : '' }`}
                            onClick={() => switchNewAccountType('cash')}
                        >CASH</div>
                        <div className={`create-account-type-focus ${ activeAccountState.accountType === 'card' ? '' : 'create-account-card-focus' }`}></div>
                    </div>
                </div>
                <div className={'create-account-preview'}>
                    <div className={'create-account-sign-wrapper'}>{ newAccountPreviewSign() }</div>
                    <div className={'create-account-name-wrapper'}><div className={'create-account-name-value'}>{ activeAccountState.accountName ? activeAccountState.accountName : 'empty' }</div></div>
                    <div style={ getCountStyle(activeAccountState.count) } className={'create-account-count-wrapper'}><div className={'create-account-count-value'}>{ roundUp(activeAccountState.count) } $</div></div>
                </div>
            </div>
            <div className={'create-account-btns'}>
                <ApplyBtn click={applyClick}/>
                <CancelBtn click={cancelClick}/>
                <div className={`account-delete-btn-wrapper ${ activeAccountState.deleted ? '' : 'disable-delete-account-btn' }`}><DeleteBtn click={deleteClick}/></div>
            </div>
            <Loader visible={loader}/>
        </div>
    )
}

export default AccountModalWindow