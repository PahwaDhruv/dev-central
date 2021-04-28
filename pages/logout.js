import React, {useEffect} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../redux/actions/authActions';

const Logout = ({auth, logout}) => {
    const router = useRouter();

    // useEffect( async () => {
    //     try{
    //         const res = await axios.get('/api/logout');
    //         console.log(res);
    //         if(res.data.status){
    //             router.push('/');
    //         }
    //     } catch(err){
    //         console.log(err.message);
    //     }
    // },[]);

    useEffect(() => {
        logout();
    }, [])

    if(typeof window !== 'undefined'){
        if(!auth.isAuthenticated) {
            router.push('/')
        }
    }
    
    return null;
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
    return {
        auth : state.auth
    }
}
export default connect(mapStateToProps, {logout})(Logout);