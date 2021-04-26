import connectDB from '../../services/dbService';
import authMiddleware from '../../middlewares/authMiddleware';
import User from '../../models/UserModel';

connectDB();

//Send User data when authenticated
const auth = async (req, res) => {
    if(req.method === 'GET') {
        try {
            const user = await User.findById(req.userId).select('-password');
            res.json({user: user, token: req.cookies.jwt});
        } catch (err) {
            console.log(err.message);
            res.json({errors: [err.message]})
        }
    } else {
        res.json({message: 'Method Not Supported'})
    }
}

export default authMiddleware(auth);