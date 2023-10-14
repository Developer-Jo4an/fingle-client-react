import React from 'react'
import Transactions from '../transactions/transactions/Transactions'

import './main.css'

const Main = ({activePage, ...props}) => {
    const {transactions, allCards, transactionCategories} = props

    return (
        <main>
            <div style={{display: activePage === 'home' ? 'flex' : 'none'}} className={'home'}>Home</div>
            <div style={{display: activePage === 'analytics' ? 'flex' : 'none'}} className={'analytics'}>Analytics</div>
            <Transactions
                activePage={activePage}
                transactions={transactions}
                allCards={allCards}
                transactionCategories={transactionCategories}
            />
        </main>
    );
};

export default Main