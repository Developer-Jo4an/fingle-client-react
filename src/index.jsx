import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './application/App'

const domNode = document.querySelector('#root')
const root = createRoot(domNode)
root.render(<App/>)
