import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {useRouter} from 'next/router';
import withAuth from '../../components/HOCs/withAuth';
import checkUser from '../../utils/checkUser';

const Dashboard = ({auth}) => {
    const router = useRouter();
    
    useEffect(() => {
        redirect();
    }, [])
    const redirect = () => {
        if(typeof window !== 'undefined'){
            if(!auth.isAuthenticated){
                router.push('/login');
            }
        } 
    }
    return (
        <div>
            {
                !auth.loading && auth.isAuthenticated && (<p>Welcome <strong>{auth.user.name}</strong></p>) 
            }
        </div>
    )
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state =>{
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Dashboard);

// export default Dashboard;
