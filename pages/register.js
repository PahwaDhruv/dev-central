import React, { useState } from 'react';
import {connect} from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {setAlert} from '../redux/actions/alertActions';
import PropTypes from 'prop-types';
import {registerUser} from '../redux/actions/authActions';

const Register = ({registerUser, setAlert, auth}) => {
    const initState = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    const [user, setUser] = useState(initState);
    const router = useRouter();

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(user.password !== user.confirmPassword){
            console.log('Password do not match');
            setAlert('Password do not match', 'danger')
        } else {
            console.log(user);
            const newUser = {
                name: user.name,
                email: user.email,
                password: user.password
            }
            registerUser(newUser);
        }
    }
    if(auth.isAuthenticated && auth.user){
        // props.setAlert('Registration Completed. Redirecting to Homepage', 'success', 3000);
        // setTimeout(() => {
            router.push('/dashboard')
        // }, 3000)
    }
    return (
        <section>
            <h1 className="large text-primary">Register</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <input 
                        type="text" 
                        name="name" 
                        value={user.name} 
                        placeholder="Name" 
                        onChange={handleChange} 
                        // required 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="email" name="email" placeholder="Email Address" value={user.email} onChange={handleChange} 
                        // required 
                    />
                    <small className="form-text">Use a Gravatar email to get a profile avatar</small>
                </div>
                <div className="form-group">
                    <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} 
                    // minLength="6" 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" name="confirmPassword" placeholder="Confirm Password" value={user.confirmPassword} onChange={handleChange} 
                        // minLength="6" 
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an Account? <Link href="/login"><a>Login</a></Link>
            </p>
        </section>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps, {setAlert, registerUser})(Register);