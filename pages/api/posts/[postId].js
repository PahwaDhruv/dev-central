import authMiddleware from '../../../middlewares/authMiddleware';
import Post from '../../../models/Post';

/*
@Route:  /api/post/:postId
@Method: GET
@Desc: Get Post by Id
@Access: Private
*/
const getPostById = async (req, res) => {
    if(req.method === 'GET') {
        try {
            const post = await Post.findById(req.query.postId);
            if(post){
                res.json({status: true, record: post });
            } else {
                res.json({status: false, message: 'No Post Exists'});
            }
        } catch (err) {
            console.log(err.message);
            if(err.kind === 'ObjectId'){
                return res.status(400).json({errors : ['No Post Exists']});
            }
        }
    } else if(req.method === 'DELETE'){
        try {
            const post = await Post.findById(req.query.postId);
            if(post){
                //check if user is authorized to remove the post
                if(post.user.toString() !== req.userId){
                    return res.status(401).json({status:false, message: 'User Not Authorized'})
                }   
                await post.remove();
                res.json({status: true, message: 'Post Deleted Successfully'});
            } else {
                return res.status(404).json({status:false, message: 'Post Not Found'});
            }
        } catch (err) {
            console.log(err.message);
            if(err.kind === 'ObjectId'){
                return res.status(400).json({errors : ['No Post Exists']});
            }
            res.status(500).json({status: false, message: 'Some Error Occured'});
        }
    } else {
        res.json({status: false, message: 'Method Not Supported'})
    }
}

export default authMiddleware(getPostById);
