import React, { useEffect, useRef, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppContext } from '../AppProvider'

import './footer.css'

const Footer = () => {
    const { page } = useAppContext()

    const homeRef = useRef()
    const analyticsRef = useRef()
    const transactionsRef = useRef()

    const [width, setWidth] = useState({
        home: 'auto',
        analytics: '0px',
        transactions: '0px'
    })

    useEffect(() => {
        const footerBtnsLogic = {
            home: () => setWidth({ home: `${homeRef.current.scrollWidth}px`, analytics: '0px', transactions: '0px' }),
            analytics: () => setWidth({ analytics: `${analyticsRef.current.scrollWidth}px`, home: '0px', transactions: '0px' }),
            transactions: () => setWidth({ transactions: `${transactionsRef.current.scrollWidth}px`, home: '0px', analytics: '0px' }),
        }
        footerBtnsLogic[page[0]]()
    }, [page[0]])

    return (
        <footer>
            {/* I could have created an array of buttons, but decided to make them separate elements, since there are only three of them */}
            {/* page[0] - state; page[1] - setState */}
            <nav className={'footer-nav'}>
                <div // home btn
                    className={`footer-nav-btn ${page[0] === 'home' ? 'footer-nav-btn-active' : ''}`}
                    onClick={() => page[1]('home')}
                ><FontAwesomeIcon icon='fa-solid fa-home'/>
                    <div
                        ref={ homeRef }
                        style={{ width: width.home }}
                        className={'footer-btn-label'}
                    >Home</div>
                </div>

                <div // analytics btn
                    className={`footer-nav-btn ${page[0] === 'analytics' ? 'footer-nav-btn-active' : ''}`}
                    onClick={() => page[1]('analytics')}
                ><FontAwesomeIcon icon='fa-solid fa-chart-simple'/>
                    <div
                        ref={ analyticsRef }
                        style={{ width: width.analytics }}
                        className={'footer-btn-label'}
                    >Analytics</div>
                </div>

                <div // transactions btn
                    className={`footer-nav-btn ${page[0] === 'transactions' ? 'footer-nav-btn-active' : ''}`}
                    onClick={() => page[1]('transactions')}
                ><FontAwesomeIcon icon='fa-solid fa-bars-staggered'/>
                    <div
                        ref={transactionsRef}
                        style={{ width: width.transactions }}
                        className={'footer-btn-label'}
                    >Transactions</div>
                </div>
            </nav>
        </footer>
    )
}

export default Footer