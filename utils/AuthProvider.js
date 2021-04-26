import React, {useEffect} from 'react'
import {connect} from 'react-redux';
import {loadUser} from '../redux/actions/authActions';
import PropTypes from 'prop-types';

const AuthProvider = ({children, loadUser}) => {
    useEffect(() => {
        loadUser();
    }, []);

    return (
        <div>
            {children}
        </div>
    )
}

AuthProvider.propTypes = {
    loadUser: PropTypes.func.isRequired,
}
export default connect(null, {loadUser})(AuthProvider)
