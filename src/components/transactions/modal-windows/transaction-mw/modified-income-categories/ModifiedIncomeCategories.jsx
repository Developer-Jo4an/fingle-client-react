import React, {useEffect, useRef} from 'react'
import SwiperEl from '../../../../swiper/SwiperEl'

import {reloadSlider} from '../../../../../my-functions/my-functions'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import './modified-income-categories.css'

const ModifiedIncomeCategories = ({transactionObject, setTransactionObject, getHeight, modifiedMode, income}) => {

    const incomeRef = useRef()
    const swiperRef = useRef()
    const secondSwiperRef = useRef()

    const setNewIncomeCategory = category => {
        setTransactionObject(prev => {
            const futureObject = {}
            for (const key in prev) if (key !== 'subCategory') futureObject[key] = prev[key]
            return {...futureObject, category: category}
        })
        if (secondSwiperRef.current) reloadSlider(secondSwiperRef)
    }

    const setNewIncomeSubCategory = category => {
        setTransactionObject(prev => {
            if (prev.subCategory && prev.subCategory.name === category.name) {
                const futureObject = {}
                for (const key in prev) if (key !== 'subCategory') futureObject[key] = prev[key]
                return futureObject
            } else return {...prev, subCategory: category}
        })
    }

    useEffect(() => {
        if (incomeRef.current) {
            incomeRef.current.style.setProperty('--modified-height', '0px')
            incomeRef.current.style.removeProperty('--modified-height')
        }
    }, [transactionObject.category])

    const condition = {
        true: () => (
            <SwiperEl Ref={secondSwiperRef}>
                {Object.values(transactionObject.category.subCategories).map(category => (
                    <swiper-slide
                        key={category._id}
                        class={`modified-income-sub-category ${transactionObject.subCategory ? transactionObject.subCategory.name === category.name ? 'modified-income-sub-category-active' : '' : ''}`}
                        style={{'--modified-category-color': category.color}}
                        onClick={() => setNewIncomeSubCategory(category)}
                    ><FontAwesomeIcon icon={category.sign} />{category.name}</swiper-slide>
                ))}
            </SwiperEl>
        ),
        false: () => ''
    }

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
                    className={`modified-transaction-block ${modifiedMode ? 'modified-block-on' : ''}`}
                    ref={incomeRef}
                    style={{'--modified-height': `${modifiedMode ? getHeight(incomeRef) : '0px'} `}}
                ><SwiperEl Ref={swiperRef}>
                    {Object.values(income).map(category => (
                        <swiper-slide
                            key={category._id}
                            class={`modified-income-category ${transactionObject.category.name === category.name ? 'modified-income-category-active' : ''}`}
                            style={{'--modified-category-color': category.color}}
                            onClick={() => setNewIncomeCategory(category)}
                        ><FontAwesomeIcon icon={category.sign}/>{category.name}</swiper-slide>
                    ))}
                </SwiperEl>
                    {condition[transactionObject.category.subCategories ? 'true' : 'false']()}
                </div>
            </div>
        </div>
    )
}

export default ModifiedIncomeCategories