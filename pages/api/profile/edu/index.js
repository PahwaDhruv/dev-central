import connectDB from '../../../../services/dbService';
import authMiddleware from '../../../../middlewares/authMiddleware';
import {validate} from '../../../../middlewares/validate';
import {EducationSchema} from '../../../../schemas/userSchema';
import Profile from '../../../../models/ProfileModel';

connectDB();
/*
@Route:  /api/profile/exp
@Method: PUT
@Desc: Update Profile Experience
@Access: Private
*/
const addEducation = async (req, res) => {
    if(req.method === 'PUT'){
        const {school, degree, fieldOfStudy, from, to, current, description} = req.body;
        const newEdu = {
            school, degree, fieldOfStudy, from, to, current, description
        };
        try {
            const profile = await Profile.findOne({user: req.userId});
            profile.education.unshift(newEdu);
            await profile.save()
            res.json(profile);
        } catch (err) {
            console.log(err.message);
            res.status(500).json({status: false, errors: err.message});
        }
    } else {
        res.json({status: false, message: 'Method Not Supported'})
    }
}

export default validate(EducationSchema, authMiddleware(addEducation));