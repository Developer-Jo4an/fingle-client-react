import React, {useEffect, useRef, useState} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faChartSimple, faBarsStaggered } from '@fortawesome/free-solid-svg-icons'

import './footer.css'

const Footer = ({pageNav, activePage}) => {
    const [home, setHome] = useState({id: 'home', label: 'Home', icon: faHouse, width: 'auto', ref: useRef()})
    const [analytics, setAnalytics] = useState({id: 'analytics', label: 'Analytics', icon: faChartSimple, width: '0', ref: useRef()})
    const [transactions, setTransactions] = useState({id: 'transactions', label: 'Transactions', icon: faBarsStaggered, width: '0', ref: useRef()})

    const footerBtns = [home, analytics, transactions]
    const footerBtnsSetters = {home: setHome, analytics: setAnalytics, transactions: setTransactions}
    const checkActivePage = id => id === activePage

    const click = btn => {
        const {id, ref} = btn

        const previousBtn = footerBtns.find(obj => obj.width !== '0')

        if (previousBtn.id === id) return

        const previousSetter = footerBtnsSetters[previousBtn.id]
        previousSetter({...previousBtn, width: '0'})

        const width = `${ref.current.scrollWidth}px`
        const setter = footerBtnsSetters[id]
        setter({...btn, width})

        pageNav(id)
    }

    return (
        <footer>
            <nav className={'footer-nav'}>
                {footerBtns.map(btn => (
                    <div
                        key={btn.id}
                        className={`footer-nav-btn ${checkActivePage(btn.id) ? 'footer-nav-btn-active' : ''}`}
                        onClick={() => click(btn)}
                    ><FontAwesomeIcon icon={btn.icon}/>
                    <div
                        ref={btn.ref}
                        className={'footer-btn-label'}
                        style={{width: btn.width}}
                    >{btn.label}
                    </div>
                    </div>
                ))}
            </nav>
        </footer>
    )
}

export default Footer