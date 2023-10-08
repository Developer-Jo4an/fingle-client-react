import React from 'react'

import './add-transaction-category.css'
import SwiperEl from '../../../../swiper/SwiperEl';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const AddTransactionCategory = ({Ref, categories, state, setState}) => {

    const selectCategory = category => {

        setState(prev => {
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
                {Object.values(categories.expense).map(category => (
                <swiper-slide
                    key={category._id}
                    class={`add-transaction-category ${state.category && state.category._id === category._id ? 'add-transaction-category-active' : ''}`}
                    style={{'--category-color': category.color}}
                    onClick={() => selectCategory(category)}
                ><FontAwesomeIcon icon={category.sign}/>{category.name}</swiper-slide>))}
            </SwiperEl>
        </div>
    )
}

export default AddTransactionCategory