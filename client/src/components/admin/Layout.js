import React from 'react'
import Header from './Header'

export default function Layout({ children }) {
    return (
        <React.Fragment>
            <Header />
            {children}
        </React.Fragment>
    )
}
