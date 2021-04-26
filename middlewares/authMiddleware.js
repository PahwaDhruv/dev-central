import jwt from 'jsonwebtoken';

const requireUser = (handler) => {
    return async function(req, res){    
    if(req.cookies && req.cookies.jwt){
        //Get Token
        const token = req.cookies.jwt;
        console.log(token);
        //Verify Token
        jwt.verify(token, 'dev-central', (err, decodedToken) => {
            if(err){
                req.userId = 0;
                res.status(401).json({status: false, message : 'Invalid Token'});
            }else{
                console.log(decodedToken);
                req.userId = decodedToken.id;
                return handler(req, res);
            }
        });
    } else {
        req.userId = 0;
        res.status(401).json({errors : ['Token not present']});
    }
    }
}

export default requireUser;