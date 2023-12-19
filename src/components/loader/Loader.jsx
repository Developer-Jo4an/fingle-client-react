import React from 'react'

import './loader.css'

const Loader = ({ visible }) => (
    <div className={`loader ${visible[0] ? '' : 'loader-display-none'}`}>
        <div className={'loader-sign'}></div>
    </div>
)


export default Loader