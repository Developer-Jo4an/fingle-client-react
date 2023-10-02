import React, {useEffect} from 'react'

import './add-transaction-income-category.css'
const AddTransactionIncomeCategory = ({Ref, categories, state, setState}) => {

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
        <div className={'slider-wrapper add-transaction-income-category-wrapper'}>
            <swiper-container
                ref={Ref}
                slides-per-view="auto"
                free-mode="true"
                space-between="10"
                free-mode-momentum="true"
                freeModeMomentumRatio="0"
            >{Object.values(categories.income).map(category => (
                <swiper-slide
                    key={category._id}
                    style={{'--category-color': category.color}}
                    class={`add-transaction-income-category ${state.category && state.category._id === category._id ? 'add-transaction-category-income-active' : ''}`}
                    onClick={() => selectCategory(category)}
                >{category.name}</swiper-slide>))}
            </swiper-container>
        </div>
    )
}

export default AddTransactionIncomeCategory