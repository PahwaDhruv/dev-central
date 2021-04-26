import connectDB from '../../../../services/dbService'
import authMiddleware from '../../../../middlewares/authMiddleware';
import Profile from '../../../../models/ProfileModel'

/*
@Route:  /api/profile/exp/expId
@Method: DELETE
@Desc: DELTE Profile Experience
@Access: Private
*/
const deleteEdu = async (req, res) => {
    if(req.method === 'DELETE'){
        try {
            const profile = await Profile.findOne({user: req.userId});
            const idx = profile.education.map(edu => edu._id).indexOf(req.query.eduId);
            profile.education.splice(idx, 1);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.log(err.message);
        }
    } else {
        res.json({status: false, message: 'Method Not Supported'})
    }
}

export default authMiddleware(deleteEdu);
