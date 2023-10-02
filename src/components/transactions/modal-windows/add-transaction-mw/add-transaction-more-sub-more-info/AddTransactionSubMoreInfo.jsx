import React, {useEffect} from 'react'

import './add-transaction-sub-more-info.css'

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

    useEffect(() => {
        if (Ref.current) {
            Ref.current.setAttribute('ref', Ref)
            Ref.current.setAttribute('slides-per-view', 'auto')
            Ref.current.setAttribute('free-mode', 'true')
            Ref.current.setAttribute('space-between', '10')
            Ref.current.setAttribute('freeModeMomentumRatio', '0')
        }
    }, [state])

    return (
        <div
            className={'add-transaction-sub-more-info'}
        >{state.category && state.category.subCategories && (
            <swiper-container
                ref={Ref}
                slides-per-view="auto"
                free-mode="true"
                space-between="10"
                free-mode-momentum="true"
                freeModeMomentumRatio="0"
            >
                {Object.values(state.category.subCategories).map(category => (
                    <swiper-slide
                        key={category._id}
                        class={`add-transaction-sub-more-info-slide ${state.subCategory ? state.subCategory._id === category._id ?
                            'add-transaction-sub-more-info-slide-active' : '' : ''}`}
                        style={{'--category-color': category.color}}
                        onClick={() => selectCategory(category)}
                    >{category.name}
                    </swiper-slide>
                ))}
            </swiper-container>
        )}
        </div>
    )
}

export default AddTransactionSubMoreInfo