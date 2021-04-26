import connectDB from '../../../../services/dbService';
import authMiddleware from '../../../../middlewares/authMiddleware';
import {validate} from '../../../../middlewares/validate';
import {ExperienceSchema} from '../../../../schemas/userSchema';
import Profile from '../../../../models/ProfileModel';

connectDB();
/*
@Route:  /api/profile/exp
@Method: PUT
@Desc: Update Profile Experience
@Access: Private
*/
const addExperience = async (req, res) => {
    if(req.method === 'PUT'){
        const {title, company, location, from, to, current, description} = req.body;
        const newExp = {
            title, company, location, from, to, current, description
        };
        try {
            const profile = await Profile.findOne({user: req.userId});
            profile.experience.unshift(newExp);
            await profile.save()
            res.json(profile);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    } else {
        res.json({status: false, message: 'Method Not Supported'})
    }
}

export default validate(ExperienceSchema, authMiddleware(addExperience));