import React from 'react'


import SwiperEl from '../../../../../components/swiper/SwiperEl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppContext } from '../../../../../application/AppProvider'
import { useAddTransactionContext } from '../AddTransactionProvider'

import './add-transaction-category.css'

const AddTransactionCategory = ({Ref}) => {

    const { user } = useAppContext()
    const { transactionCategories } = user[0]
    const { newTransaction } = useAddTransactionContext()
    const [futureTransaction, dispatch] = newTransaction

    const selectCategory = category => dispatch({type: 'category', category})

    return (
        <div className={'slider-wrapper add-transaction-category-wrapper'}>
            <SwiperEl Ref={Ref}>
                {Object.values(transactionCategories.expense).map(category => (
                <swiper-slide
                    key={category._id}
                    class={`add-transaction-category ${futureTransaction.category && futureTransaction.category._id === category._id ? 'add-transaction-category-active' : ''}`}
                    style={{'--category-color': category.color}}
                    onClick={() => selectCategory(category)}
                ><div className={'add-transaction-category__sign'}><FontAwesomeIcon icon={ category.sign }/></div>
                    <div className={'add-transaction-category__name'}>{ category.name }</div>
                </swiper-slide>))}
            </SwiperEl>
        </div>
    )
}

export default AddTransactionCategory