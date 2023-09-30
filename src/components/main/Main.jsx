import React, {useEffect, useRef, useState} from 'react';
import Transactions from "../transactions/Transactions";

const Main = ({activePage, ...props}) => {
    const {transactions, allCards, transactionCategories} = props



    return (
        <main>
            <div style={{display: activePage === 'home' ? 'flex' : 'none'}} className={'home'}>HOOOMEEEE</div>
            <div style={{display: activePage === 'analytics' ? 'flex' : 'none'}} className={'analytics'}>analytics</div>
            <Transactions activePage={activePage} transactions={transactions} allCards={allCards} transactionCategories={transactionCategories}/>
        </main>
    );
};

export default Main;