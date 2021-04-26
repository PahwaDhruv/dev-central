import connectDB from '../../../../services/dbService';
import Profile from '../../../../models/ProfileModel';
connectDB();

/*
@Route:  /api/profile/user/:id
@Method: GET
@Desc: Get Profile by id
@Access: Public
*/
export default async (req, res) => {
    if(req.method === 'GET'){
        try {
            const profile = await Profile.findOne({ user: req.query.id}).populate('user', 'name');
            console.log(profile);
            if(profile){
                res.json(profile);
            } else {
                return res.status(400).json({errors : ['No Profile Found']});
            }
        } catch (err) {
            console.log(err.message);
            if(err.kind === 'ObjectId'){
                return res.status(400).json({errors : ['No Profile Found']});
            }
            res.status(500).send('Server Error');
        }
    } else {
        res.json({status: false, message: 'Method Not Supported'})
    }
}