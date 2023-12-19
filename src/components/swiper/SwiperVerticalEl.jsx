import React from 'react'

import { register } from 'swiper/element/bundle'
register()

const SwiperVerticalEl = ({ Ref, ...props }) => {

    return (
        <swiper-container
            ref={ Ref }
            direction='vertical'
            slides-per-view='auto'
            free-mode='true'
            space-between='10'
            free-mode-momentum='true'
            freeModeMomentumRatio='0'
        >{ props.children }</swiper-container>
    )

}

export default SwiperVerticalEl