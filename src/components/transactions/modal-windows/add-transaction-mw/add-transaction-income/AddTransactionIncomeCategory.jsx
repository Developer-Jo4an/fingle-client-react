import React from 'react'

import './add-transaction-income-category.css'
import SwiperEl from '../../../../swiper/SwiperEl'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useAppContext} from '../../../../../AppProvider'
import {useAddTransactionContext} from '../AddTransactionProvider'

const AddTransactionIncomeCategory = ({Ref}) => {

    const {user} = useAppContext()
    const {transactionCategories} = user[0]
    const {newTransaction} = useAddTransactionContext()
    const [futureTransaction, dispatch] = newTransaction

    const selectCategory = category => dispatch({type: 'category', category})

    return (
        <div className={'slider-wrapper add-transaction-income-category-wrapper'}>
            <SwiperEl Ref={Ref}>
                {Object.values(transactionCategories.income).map(category => (
                    <swiper-slide
                        key={category._id}
                        style={{'--category-color': category.color}}
                        class={`add-transaction-income-category ${futureTransaction.category && futureTransaction.category._id === category._id ? 'add-transaction-category-income-active' : ''}`}
                        onClick={() => selectCategory(category)}
                    ><div className={'add-transaction-income-category__sign'}><FontAwesomeIcon icon={category.sign}/></div>
                    <div className={'add-transaction-income-category__name'}>{category.name}</div>
                    </swiper-slide>))}
            </SwiperEl>
        </div>
    )
}

export default AddTransactionIncomeCategory