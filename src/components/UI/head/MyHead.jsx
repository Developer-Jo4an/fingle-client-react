import React from 'react';
import classes from './MyHead.module.css'
const MyHead = (props) => {
    return (
        <h1 className={classes.myHead}>
            {props.children}
        </h1>
    )
}

export default MyHead;