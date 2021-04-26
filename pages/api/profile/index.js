import connectDB from '../../../services/dbService';
import Profile from '../../../models/ProfileModel';

connectDB();

/*
@Route:  /api/profile
@Method: GET
@Desc: Get All Profiles
@Access: Public
*/
export default async (req, res) => {
    if(req.method === 'GET'){
        try {
            const profiles = await Profile.find().populate('user', ['name']);
            // console.log(profiles);
            res.json(profiles);
            // res.send('Hello')
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    }
}