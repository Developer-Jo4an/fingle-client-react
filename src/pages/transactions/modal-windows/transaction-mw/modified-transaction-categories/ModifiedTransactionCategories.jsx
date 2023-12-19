import React, {useEffect, useRef} from 'react'
import SwiperEl from '../../../../../components/swiper/SwiperEl'

import { useAppContext } from '../../../../../application/AppProvider'
import { useModifiedTransactionContext } from '../ModifiedTransactionProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { reloadSlider } from '../../../../../my-functions/my-functions'
import { useTransactionsContext } from '../../../general/TransactionsProvider'

import './modified-transaction-categories.css'

const ModifiedTransactionCategories = () => {

    const { user } = useAppContext()
    const { modifiedTransaction } = useTransactionsContext()
    const { modifiedMode } = useModifiedTransactionContext()
    const [modified, dispatch] = modifiedTransaction

    const nav = modified.transactionType

    const sliderRef = useRef()
    const subSliderRef = useRef()
    if (sliderRef.current) reloadSlider(sliderRef)

    const changeCategory = category => dispatch({type: 'category', category})

    const changeSubCategory = subCategory => {
        const {name} = subCategory
        if (modified.subCategory) {
            if (name === modified.subCategory.name) dispatch({type: 'delete-sub-category'})
            else dispatch({type: 'add-sub-category', subCategory})
        } else dispatch({type: 'add-sub-category', subCategory})
    }

    useEffect(() => {
        if (modified.category.subCategories) reloadSlider(subSliderRef)
    }, [modified.category])

    return (
        <div className={`modified-transaction-category ${modifiedMode[0] ? 'get-gap' : ''}`}>
            <div className={'always-visible-category-section'}>
                <div className={'modified-option-category-name'}>Category</div>
                <div className={'modified-option-category-value'}>{modified.category.name}{modified.subCategory && ` | ${modified.subCategory.name}`}</div>
            </div>
            <div
                className={`invisible-category-section ${modified.category.subCategories ? 'get-gap' : ''}`}
                style={{height: modifiedMode[0] ? 'auto' : '0px'}}
            ><SwiperEl Ref={sliderRef}>
                <swiper-slide class={'swiper-split'}></swiper-slide>
                {Object.values(user[0].transactionCategories[nav]).map(category => (
                    <swiper-slide
                        key={category.name}
                        class={`modified-transaction-category-slide ${category.name === modified.category.name ? 'modified-category-active' : ''}`}
                        style={{'--slide-color': category.color}}
                        onClick={() => changeCategory(category)}
                    ><FontAwesomeIcon icon={category.sign}/>{category.name}
                    </swiper-slide>
                ))}
                <swiper-slide class={'swiper-split'}></swiper-slide>
            </SwiperEl>
                { modified.category.subCategories &&
                <SwiperEl Ref={subSliderRef}>
                    <swiper-slide class={'swiper-split'}></swiper-slide>
                    {Object.values(modified.category.subCategories).map(subCategory => (
                        <swiper-slide
                            key={subCategory.name}
                            class={`modified-transaction-sub-category-slide ${modified.subCategory ? subCategory.name === modified.subCategory.name ? 'modified-sub-category-active' : '' : ''}`}
                            style={{'--slide-color': subCategory.color}}
                            onClick={() => changeSubCategory(subCategory)}
                        ><FontAwesomeIcon icon={subCategory.sign}/>{subCategory.name}
                        </swiper-slide>
                    )) }
                <swiper-slide class={'swiper-split'}></swiper-slide>
                </SwiperEl>
                }
            </div>
        </div>
    )
}

export default ModifiedTransactionCategories