import User from '../../models/UserModel';
import connectDB from '../../services/dbService';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validate } from '../../middlewares/validate';
import { LoginSchema } from '../../schemas/userSchema';

connectDB();

/*
@Route:  /api/login
@Method: POST
@Desc: Authenticate user & get token
@Access: Public
*/
const login = async(req, res) => {
    if(req.method === 'POST'){
        const {email, password} = req.body;
        console.log(req.body);
        const user = await User.findOne({email});
        if(user){
            const auth = await bcrypt.compare(password, user.password);
            if(auth) {
                const token = createToken(user._id);
                res.setHeader('Set-Cookie', cookie.serialize('jwt', token, {
                    httpOnly: true,
                    maxAge: 3600,
                    sameSite: 'strict',
                    path: '/'
                }));
                res.json({token});
            } else {
                res.status(401).json({errors: ['Invalid Credentials']});
            }
        }else{
            res.status(401).json({errors: ['Invalid Credentials']});
        }
    }  
}

const createToken = (id) => {
    const maxAge = 3600;
    return jwt.sign({ id }, 'dev-central', {
        expiresIn : maxAge 
    })
}

export default validate(LoginSchema, login);