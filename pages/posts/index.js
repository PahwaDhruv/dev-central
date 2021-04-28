import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Post = () => {
    const[isLogged, setIsLogged] = useState(false);
    const[user, setUser] = useState('Guest');

    useEffect(async () => {
        try {
            const res = await axios.get('/api/posts');
            console.log(res.data);
            if(res.data){
                setIsLogged(res.data.status);
                setUser(res.data.user.name);
            }
        } catch (err) {
            console.log(err)
        }
        
    }, []);

    return(
        <div>
            {
                isLogged ? (
                    <h1>Welcome {user}</h1>
                ) : (
                    <h1>Please Login</h1>
                )
            }
        </div>
    )
}

export default Post;