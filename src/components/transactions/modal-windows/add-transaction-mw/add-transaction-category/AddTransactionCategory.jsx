import React from 'react'

import './add-transaction-category.css'

import SwiperEl from '../../../../swiper/SwiperEl'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useAppContext} from '../../../../../AppProvider'
import {useAddTransactionContext} from '../AddTransactionProvider'

const AddTransactionCategory = ({Ref}) => {

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
        <div className={'slider-wrapper add-transaction-category-wrapper'}>
            <SwiperEl Ref={Ref}>
                {Object.values(transactionCategories.expense).map(category => (
                <swiper-slide
                    key={category._id}
                    class={`add-transaction-category ${newTransaction[0].category && newTransaction[0].category._id === category._id ? 'add-transaction-category-active' : ''}`}
                    style={{'--category-color': category.color}}
                    onClick={() => selectCategory(category)}
                ><FontAwesomeIcon icon={category.sign}/>{category.name}</swiper-slide>))}
            </SwiperEl>
        </div>
    )
}

export default AddTransactionCategory