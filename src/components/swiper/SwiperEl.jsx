import React from 'react'

const SwiperEl = ({Ref, ...props}) => {
    return (
        <swiper-container
            ref={Ref}
            slides-per-view="auto"
            free-mode="true"
            space-between="10"
            free-mode-momentum="true"
            freeModeMomentumRatio="0"
        >{props.children}</swiper-container>
    )
}

export default SwiperEl