import User from '../../models/UserModel';
import connectDB from '../../services/dbService';
import bcrypt from 'bcrypt';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { validate } from '../../middlewares/validate';
import { userSchema } from '../../schemas/userSchema';

connectDB();

/*
@Route:  /api/register
@Method: POST
@Desc: Register User
@Access: Public
*/
const register = async(req, res) => {
    if(req.method === 'POST'){
        console.log(req.body);
        const { name, email, password } = req.body;
        
        try{
            //Check for existing user
            let user = await User.findOne({ email });
            if(user){
                res.status(400).json({errors : ['Email already Exists']});
            } else {
                user = new User({name, email, password });
                //Encrypt Password
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
                //Save user to DB
                const newUser = await user.save();
                //Generate JWT
                const token = createToken(newUser._id);
                //Set JWT in Cookie
                res.setHeader('Set-Cookie', cookie.serialize('jwt', token, {
                    httpOnly: true,
                    maxAge: 3600,
                    sameSite: 'strict',
                    path: '/'
                }));
                res.status(201).json({token});
            }
        } catch(err) {
            console.log(err);
            res.status(500).send('Some Error Occurred');
        }
    }  
}

const createToken = (id) => {
    const maxAge = 3600;
    return jwt.sign({ id }, 'dev-central', {
        expiresIn : maxAge 
    })
}

export default validate(userSchema, register);