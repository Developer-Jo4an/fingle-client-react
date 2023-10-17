import React, {useEffect, useRef} from 'react'

import {reloadSlider} from '../../../../../my-functions/my-functions'

import './add-transaction-sub-more-info.css'
import SwiperEl from '../../../../swiper/SwiperEl';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useAddTransactionContext} from '../AddTransactionProvider'

const AddTransactionSubMoreInfo = () => {

    const transferRef = useRef()

    const {newTransaction} = useAddTransactionContext()

    const selectCategory = category => {
        newTransaction[1](prev => {
            if (prev.subCategory) {
                if (prev.subCategory._id === category._id) {
                    const futureObject = {}
                    for (const key in prev) if (key !== 'subCategory') futureObject[key] = prev[key]
                    return futureObject
                } else return {...prev, subCategory: category}
            } else return {...prev, subCategory: category}
        })
    }

    useEffect(() => {if (transferRef.current) reloadSlider(transferRef)}, [newTransaction[0]])

    return (
        <div
            className={'add-transaction-sub-more-info'}
        >{newTransaction[0].category && newTransaction[0].category.subCategories && (
            <SwiperEl Ref={transferRef}>
                {Object.values(newTransaction[0].category.subCategories).map(category => (
                    <swiper-slide
                        key={category._id}
                        class={`add-transaction-sub-more-info-slide ${newTransaction[0].subCategory ? newTransaction[0].subCategory._id === category._id ?
                            'add-transaction-sub-more-info-slide-active' : '' : ''}`}
                        style={{'--category-color': category.color}}
                        onClick={() => selectCategory(category)}
                    ><FontAwesomeIcon icon={category.sign}/>{category.name}
                    </swiper-slide>
                ))}
            </SwiperEl>
        )}
        </div>
    )
}

export default AddTransactionSubMoreInfo