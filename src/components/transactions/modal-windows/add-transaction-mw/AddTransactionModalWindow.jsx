import React from 'react'
import AddTransactionType from './add-transaction-type/add-transaction-type'
import AddTransactionCard from './add-transaction-card/AddTransactionCard'
import AddTransactionCount from './add-transaction-count/AddTransactionCount'
import AddTransactionMoreInfo from './add-transaction-more-info/AddTransactionMoreInfo'
import AddTransactionDate from './add-transaction-date/AddTransactionDate'
import AddTransactionProvider, {useAddTransactionContext} from './AddTransactionProvider'
import AddTransactionMessage from './add-transaction-message/AddTransactionMessage'
import Calculator from './calculator/Calculator'
import ModalWindowContentCenter from '../../../modal-window-content-center/ModalWindowContentCenter'
import MessageModalWindow from '../message-modal-window/MessageModalWindow'

import 'swiper/css'
import './add-transaction-modal-window.css'

import { register } from 'swiper/element/bundle'

register()

const AddTransactionModalWindow = () => {

    return (
        <AddTransactionProvider>
            <div className={'add-transaction-modal-window'}>
                <AddTransactionType/>
                <AddTransactionDate/>
                <AddTransactionMessage/>
                <AddTransactionCard/>
                <AddTransactionCount/>
                <AddTransactionMoreInfo/>
                <Calculator/>
                <ModalWindowContentCenter nav={'messageMWS'} context={useAddTransactionContext}><MessageModalWindow/></ModalWindowContentCenter>
            </div>
        </AddTransactionProvider>
    )
}

export default AddTransactionModalWindow