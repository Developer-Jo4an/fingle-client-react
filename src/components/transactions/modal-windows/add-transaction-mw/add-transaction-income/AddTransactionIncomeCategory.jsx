import React from 'react'

import './add-transaction-income-category.css'
const AddTransactionIncomeCategory = ({Ref, categories, state, setState}) => {

    const selectCategory = category => {
        setState(prev => {
            if (prev.category) {
                const futureObject = {}
                if (prev.category._id === category._id) {
                    for (const key in prev) if (key !== 'category') futureObject[key] = prev[key]
                }
                else return {...prev, category: category}
                return futureObject
            } else return {...prev, category: category}
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