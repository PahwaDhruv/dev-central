import connectDB from '../../../services/dbService';
import Profile from '../../../models/ProfileModel';
import User from '../../../models/UserModel';
import authMiddleware from '../../../middlewares/authMiddleware';

connectDB();

/*
@Route:  /api/profile/delete
@Method: DELETE
@Desc: Delete a Profile
@Access: Private
*/
const deleteProfile = async (req, res) => {
    if(req.method === 'DELETE'){
        try {
            //Remove Posts
            //Remove Profile
            await Profile.findOneAndRemove({user: req.userId});
            //Remove User
            await User.findOneAndRemove({_id: req.userId});
            res.json({status: true, message: 'User Deleted Successfully'})
        } catch (err) {
            console.log(err.message);
        }
    } else {
        res.json({status: false, message: 'Method Not Supported'})
    }
}

export default authMiddleware(deleteProfile);