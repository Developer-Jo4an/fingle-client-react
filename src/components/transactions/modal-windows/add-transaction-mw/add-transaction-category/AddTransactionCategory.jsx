import React from 'react'

import './add-transaction-category.css'
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
            <swiper-container
                ref={Ref}
                slides-per-view="auto"
                free-mode="true"
                space-between="10"
                free-mode-momentum="true"
                freeModeMomentumRatio="0"
            >{Object.values(categories.expense).map(category => (
                <swiper-slide
                    key={category._id}
                    class={`add-transaction-category ${state.category && state.category._id === category._id ? 'add-transaction-category-active' : ''}`}
                    style={{'--category-color': category.color}}
                    onClick={() => selectCategory(category)}
                >{category.name}</swiper-slide>))}
            </swiper-container>
        </div>
    )
}

export default AddTransactionCategory