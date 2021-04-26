import connectDB from '../../../../services/dbService';
import {githubClientId, githubClientSecret} from '../../../../config';
import axios from 'axios';

/*
@Route:  /api/profile/github/:gUser
@Method: GET
@Desc: Get Github Repos
@Access: Public
*/
export default (req, res) => {
    if(req.method === 'GET') {
        const uri = `https://api.github.com/users/${req.query.gUser}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`;
        const headers = {
            'user-agent': 'node.js'
        }
        axios.get(uri, headers)
        .then(result => {
            console.log(result);
            if(result.data && result.data.length > 0){
                res.json({status: true, records: result.data})
            } else {
                res.json({status: false, records: result.data})
            }
            
        })
        .catch(error => {
            // console.log(error);
            res.json({status: false, message: 'No Github Profile Found'})
        })
    } else {
        res.json({status: false, message: 'Method Not Supported'})
    }
}