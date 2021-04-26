import connectDB from '../../../services/dbService';
import authMiddleware from '../../../middlewares/authMiddleware';
import Post from '../../../models/Post';
connectDB();
/*
@Route:  /api/post
@Method: GET
@Desc: Get All Posts
@Access: Private
*/
const getAllPost = async (req, res) => {
    if(req.method === 'GET'){
        try {
            const posts = await Post.find().sort({date: -1});
            console.log(posts);
            if(posts && posts.length > 0){
                res.json({status: true, records: posts});
            } else {
                res.json({status: false, message: 'No Post Found'});
            }
        } catch (err) {
            console.log(err.message);
            res.json({status: false, errors: err.message})
        }
    } else {
        res.json({status: false, message: 'Method Not Supported'});
    }
}

export default authMiddleware(getAllPost);