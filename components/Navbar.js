import React from 'react';
import Link from 'next/link';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../redux/actions/authActions';

const Navbar = ({auth: {isAuthenticated, loading}, logout}) => {

    const authLinks = (
        <ul>
            <li>
                <Link href="/logout"><a><i className="fas fa-sign-out-alt"></i>{' '}<span className="hide-sm">Logout</span></a></Link>
            </li>
        </ul>
    )

    const guestLinks = (
        <ul>
            <li><Link href="/dashboard"><a>Dashboard</a></Link></li>
            <li><Link href="/register"><a>Register</a></Link></li>
            <li><Link href="/login"><a>Login</a></Link></li>
        </ul>
    )
    return(
        <nav className="navbar bg-dark">
        <h1>
            <Link href="/"><a><i className="fas fa-code"></i> DevCentral</a></Link>
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
    // logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = state =>{
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps)(Navbar);