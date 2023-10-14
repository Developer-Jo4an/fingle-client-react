import React, {useEffect, useRef} from 'react'
import SwiperEl from '../../../../swiper/SwiperEl'

import {reloadSlider} from '../../../../../my-functions/my-functions'

import './modified-expense-categories.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const ModifiedExpenseCategories = ({transactionObject, setTransactionObject, getHeight, modifiedMode, expense}) => {

    const expenseRef = useRef()
    const swiperRef = useRef()
    const secondSwiperRef = useRef()

    const setNewExpenseCategory = category => {
        setTransactionObject(prev => {
            const futureObject = {}
            for (const key in prev) if (key !== 'subCategory') futureObject[key] = prev[key]
            return {...futureObject, category: category}
        })
        if (secondSwiperRef.current) reloadSlider(secondSwiperRef)
    }
    const setNewExpenseSubCategory = category => {
        setTransactionObject(prev => {
            if (prev.subCategory && prev.subCategory.name === category.name) {
                const futureObject = {}
                for (const key in prev) if (key !== 'subCategory') futureObject[key] = prev[key]
                return futureObject
            } else return {...prev, subCategory: category}
        })
    }


    const condition = {
        true: () => (
            <SwiperEl Ref={secondSwiperRef}>
            {Object.values(transactionObject.category.subCategories).map(category => (
                <swiper-slide
                    key={category._id}
                    class={`modified-expense-sub-category ${transactionObject.subCategory ? transactionObject.subCategory.name === category.name ? 'modified-expense-sub-category-active' : '' : ''}`}
                    style={{'--modified-category-color': category.color}}
                    onClick={() => setNewExpenseSubCategory(category)}
                ><FontAwesomeIcon icon={category.sign}/>{category.name}</swiper-slide>
            ))}
            </SwiperEl>
        ),
        false: () => ''
    }

    useEffect(() => {
        if (expenseRef.current) {
            expenseRef.current.style.setProperty('--modified-height', '0px')
            expenseRef.current.style.removeProperty('--modified-height')
        }
    }, [transactionObject.category])

    return (
        <div>
            <div className={`transaction-info-chunk ${modifiedMode ? 'get-gap' : ''}`}>
                <div className='transaction-info-chunk-info'>
                    <div className={'transaction-info-chunk-header'}>Category</div>
                    <div className={'transaction-info-chunk-value'}>
                        {`${transactionObject.category.name} 
                        ${transactionObject.subCategory ? `| ${transactionObject.subCategory.name}` : ''}`}
                    </div>
                </div>

                <div
                    className={`modified-transaction-block ${modifiedMode ? 'modified-block-on' : ''} ${transactionObject.category.subCategories ? 'modified-transaction-block-active' : ''}`}
                    ref={expenseRef}
                    style={{'--modified-height': `${modifiedMode ? getHeight(expenseRef) : '0px'} `}}
                ><SwiperEl Ref={swiperRef}>
                    {Object.values(expense).map(category => (
                        <swiper-slide
                            key={category._id}
                            class={`modified-expense-category ${transactionObject.category.name === category.name ? 
                                'modified-expense-category-active' : ''}`}
                            style={{'--modified-category-color': category.color}}
                            onClick={() => setNewExpenseCategory(category)}
                        ><FontAwesomeIcon icon={category.sign}/>{category.name}</swiper-slide>
                    ))}
                </SwiperEl>
                    {condition[transactionObject.category.subCategories ? 'true' : 'false']()}
                </div>
            </div>
        </div>
    )
}

export default ModifiedExpenseCategories