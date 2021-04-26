import React, {useEffect} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';

const Logout = () => {
    const router = useRouter();

    useEffect( async () => {
        try{
            const res = await axios.get('/api/logout');
            console.log(res);
            if(res.data.status){
                router.push('/');
            }
        } catch(err){
            console.log(err.message);
        }
    },[]);
    return(
        <></>
    )
}

export default Logout;