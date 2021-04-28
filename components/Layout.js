import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import Alert from '../components/Alert';
const Layout = ({ children }) => {
    return(
        <>
        <Head>
            <title>DevCentral</title>
        </Head>
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