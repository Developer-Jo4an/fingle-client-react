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

    const selectCategory = category => {
        newTransaction[1](prev => {
            const futureObject = {}
            if (prev.category) {
                if (prev.category._id === category._id) {
                    for (const key in prev) if (key !== 'category' && key !=='subCategory') futureObject[key] = prev[key]
                }
                else {
                    for (const key in prev) if (key !== 'subCategory') futureObject[key] = prev[key]
                    return {...futureObject, category: category}
                }
            } else {
                for (const key in prev) if (key !== 'subCategory') futureObject[key] = prev[key]
                return {...futureObject, category: category}
            }
            return futureObject
        })
    }

    return (
        <div className={'slider-wrapper add-transaction-income-category-wrapper'}>
            <SwiperEl Ref={Ref}>
                {Object.values(transactionCategories.income).map(category => (
                    <swiper-slide
                        key={category._id}
                        style={{'--category-color': category.color}}
                        class={`add-transaction-income-category ${newTransaction[0].category && newTransaction[0].category._id === category._id ? 'add-transaction-category-income-active' : ''}`}
                        onClick={() => selectCategory(category)}
                    ><FontAwesomeIcon icon={category.sign}/>{category.name}</swiper-slide>))}
            </SwiperEl>
        </div>
    )
}

export default AddTransactionIncomeCategory