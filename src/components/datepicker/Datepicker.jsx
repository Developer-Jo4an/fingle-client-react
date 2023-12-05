import React, { useEffect } from 'react'

import './datepicker.css'

const Datepicker = ({datepicker, Ref, datepickerClasses, ...props}) => {

    useEffect(() => {
        const newDatepicker = datepicker()
        return () => newDatepicker.destroy()
    }, [])

    return (
        <label
            htmlFor={datepickerClasses.input}
            className={datepickerClasses.label}
            onClick={e => e.stopPropagation()}
        >{props.children}
            <input
                className={datepickerClasses.input}
                id={datepickerClasses.input}
                ref={Ref}/>
        </label>
    )
}

export default Datepicker
