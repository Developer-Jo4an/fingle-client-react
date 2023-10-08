import React, {useEffect} from 'react'

import {reloadSlider} from '../../../../../my-functions/my-functions'

import './add-transaction-sub-more-info.css'
import SwiperEl from '../../../../swiper/SwiperEl';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const AddTransactionSubMoreInfo = ({Ref, state, setState}) => {

    const selectCategory = category => {
        setState(prev => {
            if (prev.subCategory) {
                if (prev.subCategory._id === category._id) {
                    const futureObject = {}
                    for (const key in prev) if (key !== 'subCategory') futureObject[key] = prev[key]
                    return futureObject
                } else return {...prev, subCategory: category}
            } else return {...prev, subCategory: category}
        })
    }

    useEffect(() => {if (Ref.current) reloadSlider(Ref)}, [state])

    return (
        <div
            className={'add-transaction-sub-more-info'}
        >{state.category && state.category.subCategories && (
            <SwiperEl Ref={Ref}>
                {Object.values(state.category.subCategories).map(category => (
                    <swiper-slide
                        key={category._id}
                        class={`add-transaction-sub-more-info-slide ${state.subCategory ? state.subCategory._id === category._id ?
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