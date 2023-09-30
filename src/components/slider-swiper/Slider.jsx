import React from 'react';

const Slider = ({Ref, className, ...props}) => {
    return (
        <swiper-container
            class={className}
            ref={Ref}
            slides-per-view="auto"
            space-between="10"
            free-mode-momentum="true"
            free-mode-momentum-deceleration="0.4"
        >{props.children}
        </swiper-container>
    )
}

export default Slider;