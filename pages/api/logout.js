import cookie from 'cookie';
import authMiddleware from '../../middlewares/authMiddleware';

const handler = (req, res) => {
    if(req.method === 'POST') {
        res.setHeader('Set-Cookie', cookie.serialize('jwt', "", {
            httpOnly: true,
            expires: new Date(0),
            sameSite: 'strict',
            path: '/'
        }));
        res.json({status: true});
    } else {
        return res.send('Method Not Supported');
    }
}


export default authMiddleware(handler);
