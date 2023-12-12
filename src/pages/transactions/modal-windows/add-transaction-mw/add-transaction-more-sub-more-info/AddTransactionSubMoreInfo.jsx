import React, { useEffect, useRef } from 'react'
import SwiperEl from '../../../../../components/swiper/SwiperEl'

import { reloadSlider } from '../../../../../my-functions/my-functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAddTransactionContext } from '../AddTransactionProvider'

import './add-transaction-sub-more-info.css'

const AddTransactionSubMoreInfo = () => {

    const transferRef = useRef()

    const { newTransaction } = useAddTransactionContext()
    const [futureTransaction, dispatch] = newTransaction

    const selectCategory = category => dispatch({ type: 'sub-category', category })

    useEffect(() => {if (transferRef.current) reloadSlider(transferRef)}, [futureTransaction])

    return (
        <div
            className={'add-transaction-sub-more-info'}
        >{futureTransaction.category && futureTransaction.category.subCategories && (
            <SwiperEl Ref={transferRef}>
                <swiper-slide class={'swiper-split'}></swiper-slide>
                {Object.values(futureTransaction.category.subCategories).map(category => (
                    <swiper-slide
                        key={category._id}
                        class={`add-transaction-sub-more-info-slide ${futureTransaction.subCategory ? futureTransaction.subCategory._id === category._id ?
                            'add-transaction-sub-more-info-slide-active' : '' : ''}`}
                        style={{'--category-color': category.color}}
                        onClick={() => selectCategory(category)}
                    >
                        <div className={'add-transaction-sub-more-info__sign'}><FontAwesomeIcon icon={category.sign}/>
                        </div>
                        <div className={'add-transaction-sub-more-info__name'}>{category.name}</div>
                    </swiper-slide>
                ))}
                <swiper-slide class={'swiper-split'}></swiper-slide>
            </SwiperEl>
        )}
        </div>
    )
}

export default AddTransactionSubMoreInfo