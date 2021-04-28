import {connect} from 'react-redux';
import {useRouter} from 'next/router';

const checkUser = ({auth}) => {
    const router = useRouter();
    if(typeof window !== 'undefined') {
        if(!auth.isAuthenticated){
            router.push('/login')
        }
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps)(checkUser);