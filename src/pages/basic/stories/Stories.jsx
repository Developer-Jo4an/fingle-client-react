import React from 'react'
import SwiperEl from '../../../components/swiper/SwiperEl'

import './stories.css'

const Stories = () => {

    const storiesArray = [
        {
            header: 'Иван Золо сдал егэ на 100 баллов'
        },
        {
            header: 'Алексей Шевцов выебал Карину стримершу, естественно, на стриме'
        },
        {
            header: 'Матвей cмог победить Артема Лобова стал чемпионом DragonCombat'
        },
        {
            header: 'Банан обдрочил и оставил струганину на камере из-зп поста выше'
        },
        {
            header: 'Илон Маск сказал, что его настоящее имя сукадрюкин, что в переводе означает: Я родился от женщины и я дрочу'
        }
    ]


    return (
        <section className={'stories-section'}>
            <SwiperEl>
                {storiesArray.map(({ header }, i) => (
                    <swiper-slide
                        class={'story'}
                        key={i}
                    >{ header }</swiper-slide>
                ))}
            </SwiperEl>
        </section>
    )
}

export default Stories