import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Alert from '../components/Alert';
const Layout = ({ children }) => {
    return(
        <>
        <Navbar />
        <div className="container">
            <Alert />
            { children }
        </div>
        {/* <Footer /> */}
        </>
    )
}

export default Layout;