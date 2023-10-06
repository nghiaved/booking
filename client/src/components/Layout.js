import React from 'react'
import Header from './Header'

export default function Layout({ children }) {
    return (
        <React.Fragment>
            <Header />
            <div className='app-wrapper'>
                {children}
            </div>
        </React.Fragment>
    )
}
