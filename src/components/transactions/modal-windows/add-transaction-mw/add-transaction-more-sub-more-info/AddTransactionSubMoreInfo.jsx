import React, {useEffect, useRef} from 'react'

import {reloadSlider} from '../../../../../my-functions/my-functions'

import './add-transaction-sub-more-info.css'
import SwiperEl from '../../../../swiper/SwiperEl'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useAddTransactionContext} from '../AddTransactionProvider'


const AddTransactionSubMoreInfo = () => {

    const transferRef = useRef()

    const {newTransaction} = useAddTransactionContext()
    const [futureTransaction, dispatch] = newTransaction

    const selectCategory = category => dispatch({type: 'sub-category', category})

    useEffect(() => {if (transferRef.current) reloadSlider(transferRef)}, [futureTransaction])

    return (
        <div
            className={'add-transaction-sub-more-info'}
        >{futureTransaction.category && futureTransaction.category.subCategories && (
            <SwiperEl Ref={transferRef}>
                {Object.values(futureTransaction.category.subCategories).map(category => (
                    <swiper-slide
                        key={category._id}
                        class={`add-transaction-sub-more-info-slide ${futureTransaction.subCategory ? futureTransaction.subCategory._id === category._id ?
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