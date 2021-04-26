import React from 'react';
import Link from 'next/link';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../redux/actions/authActions';

const Navbar = ({auth: {isAuthenticated, loading}, logout}) => {

    const authLinks = (
        <ul>
            <li>
                <a href="#" onClick={logout}><i className="fas fa-sign-out-alt"></i>{' '}<span className="hide-sm">Logout</span></a>
            </li>
        </ul>
    )

    const guestLinks = (
        <ul>
            <li><Link href="#"><a href="profiles.html">Developers</a></Link></li>
            <li><Link href="/register"><a href="profiles.html">Register</a></Link></li>
            <li><Link href="/login"><a href="profiles.html">Login</a></Link></li>
        </ul>
    )
    return(
        <nav className="navbar bg-dark">
        <h1>
            <Link href="/"><a href="dashboard.html"><i className="fas fa-code"></i> DevCentral</a></Link>
        </h1>
        {
            !loading && (
                <React.Fragment>
                    {
                        isAuthenticated ? authLinks : guestLinks
                    }
                </React.Fragment>
            )
        }

    </nav>
    )
}

Navbar.prototype = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = state =>{
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps, {logout})(Navbar);