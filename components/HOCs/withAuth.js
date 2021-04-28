import {useRouter} from 'next/router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const withAuth = (WrapperComponent) => {
    return (props) => {
        if(typeof window !== 'undefined') {
            const router = useRouter();
            // if(!auth.isAuthenticated){
            //     router.push('/login');
            //     return null;
            // }
            // console.log(props);
            return <WrapperComponent {...props} />
        }
        return null;
    } 
}

// withAuth.PropTypes = {
//     auth: PropTypes.object.isRequired,
// }

const mapStateToProps = state => {
    return {
        auth : state.auth
    }
}

export default withAuth;
// export default connect(mapStateToProps)(withAuth);