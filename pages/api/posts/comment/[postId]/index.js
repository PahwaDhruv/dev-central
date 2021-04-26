import authMiddleware from '../../../../../middlewares/authMiddleware';
import {validate} from '../../../../../middlewares/validate';
import {PostSchema} from '../../../../../schemas/userSchema';
import User from '../../../../../models/UserModel';
import Post from '../../../../../models/Post';
/*
@Route:  /api/post/create
@Method: POST
@Desc: Create a Post
@Access: Private
*/
const addComment = async (req, res) => {
    if(req.method === 'POST'){
        try{
            //Fetching User without Password
            const user = await User.findById(req.userId).select('-password');
            console.log(user);
            const post = await Post.findById(req.query.postId);
            console.log(post);
            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: '',
                user: req.userId
            };

            post.comments.unshift(newComment);
            await post.save();
            console.log(post.comments);
            res.json({status: true, comments: post.comments})
        } catch(err) {
            console.log(err);
            res.status(500).send('Some Error Occured');
        }
    } else {
        res.json({status: false, message: 'Method Not Supported'})
    }
    
}

export default validate(PostSchema,authMiddleware(addComment));