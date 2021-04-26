import connectDB from '../../../services/dbService';
import authMiddleware from '../../../middlewares/authMiddleware';
import {validate} from '../../../middlewares/validate';
import { ProfileSchema } from '../../../schemas/userSchema';
import Profile from '../../../models/ProfileModel';

connectDB();
/*
@Route:  /api/profile/create
@Method: POST
@Desc: Authenticate user & get token
@Access: Private
*/
const createProfile = async (req, res) => {
    if(req.method === 'POST') {
        const {company, website, location, bio, status, githubUserName, skills, youtube, facebook,twitter, instagram, linkedin} = req.body;
        const profileObj = {}
        profileObj.user = req.userId;
        if(company){
            profileObj.company = company;
        }
        if(website){
            profileObj.website = website;
        }
        if(location){
            profileObj.location = location;
        }
        if(bio){
            profileObj.bio = bio;
        }
        if(status){
            profileObj.status = status;
        }
        if(githubUserName){
            profileObj.githubUserName = githubUserName;
        }
        if(skills){
            profileObj.skills = skills.split(',').map(skill => skill.trim());
        }

        profileObj.social = {};
        if(youtube){
            profileObj.social.youtube = youtube;
        }
        if(facebook){
            profileObj.social.facebook = facebook;
        }
        if(twitter){
            profileObj.social.twitter = twitter;
        }
        if(instagram){
            profileObj.social.instagram = instagram;
        }
        if(linkedin){
            profileObj.social.linkedin = linkedin;
        }
        try{
            let profile = await Profile.findOne({user: req.userId});
            if(profile){
                profile = await Profile.findOneAndUpdate(
                    {user: req.userId},
                    { $set: profileObj },
                    { new: true }
                );
                return res.json(profile);
            }
            //Create
            profile = new Profile(profileObj);
            await profile.save();
            res.json(profile);
        } catch(err){
            console.log(err);
            res.status(500).send('Server Error');
        }
    } else {
        res.json({status: false, errors: ['Method Not Supported']})
    }
}

export default validate(ProfileSchema, authMiddleware(createProfile));