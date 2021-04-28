import React from 'react';
import {useState} from 'react'
import {useRouter} from 'next/router';
import Link from 'next/link';
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/authActions';
import {setAlert} from '../redux/actions/alertActions';
import PropTypes from 'prop-types';

const Login = ({loginUser, auth}) => {
    const[user, setUser] = useState({
        email: '',
        password: ''
    });
    const router = useRouter();

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        loginUser(user);
    }

    if(auth.isAuthenticated && auth.user){
        // props.setAlert('Login Success. Redirecting to Homepage', 'success', 3000);
        // setTimeout(() => {
            router.push('/dashboard')
        // }, 3000)
    }

    return(
        <section>
        <h1 className="large text-primary">Login</h1>
        <p className="lead"><i className="fas fa-user"></i> Login to Your Account</p>
        <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
                <input type="text" 
                    name="email" value={user.email} placeholder="Email Address" onChange={handleChange} 
                    // required 
                />
            </div>
            <div className="form-group">
                <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" minLength="6" 
                // required 
                />
            </div>
            <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
            Don't have an Account? <Link href="/register"><a>Register</a></Link>
        </p>
    </section>
    )
}

Login.propTypes = {
    loginUser : PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps, {loginUser, setAlert})(Login);