import connectDB from '../../../services/dbService';
import authMiddleware from '../../../middlewares/authMiddleware';
import Profile from '../../../models/ProfileModel';

connectDB();

const myProfile = async (req, res) => {

    switch(req.method){
        /*
        @Route: /api/profile/me
        @Method: GET
        @Desc: Get Current User's Profile
        @Access: Public
        */
        case 'GET':
            try{
                console.log('userID', req.userId);
                const profile = await Profile.findOne({user: req.userId}).populate('user',['name']);
                console.log(profile);
                if(profile){
                    res.json(profile);
                } else {
                    res.json({status: false, message: 'No Profile Found'})
                }
            } catch(err){
                console.log(err.message);
                res.json({error: 'Server Error'});
            }
            break;
        default:
            res.json({status: false, message: 'Method Not Supported'})
            
    }
}

export default authMiddleware(myProfile);