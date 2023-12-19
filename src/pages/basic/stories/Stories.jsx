import React from 'react'
import SwiperEl from '../../../components/swiper/SwiperEl'

import './stories.css'

const Stories = () => {

    const storiesArray = [
        {
            header: 'Иван Золо сдал егэ на 100 баллов'
        },
        {
            header: 'Иван Золо сдал егэ на 100 баллов'
        },
        {
            header: 'Иван Золо сдал егэ на 100 баллов'
        },
        {
            header: 'Иван Золо сдал егэ на 100 баллов'
        },
        {
            header: 'Иван Золо сдал егэ на 100 баллов'
        }
    ]


    return (
        <section className={'stories-section'}>
            <div className={'stories-header-wrapper'}>
                <h2>Actual</h2>
            </div>
            <SwiperEl>
                <swiper-slide class={'swiper-split'}></swiper-slide>
                {storiesArray.map(({ header }, i) => (
                    <swiper-slide
                        class={'story'}
                        key={i}
                    >{ header }</swiper-slide>
                ))}
                <swiper-slide class={'swiper-split'}></swiper-slide>
            </SwiperEl>
        </section>
    )
}

export default Stories