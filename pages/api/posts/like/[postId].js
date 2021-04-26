import authMiddleware from '../../../../middlewares/authMiddleware';
import Post from '../../../../models/Post';

/*
@Route:  /api/post/like/:postId
@Method: PUT
@Desc: Like a Post
@Access: Private
*/
const likePost = async (req, res) => {
    if(req.method === 'PUT'){
        try {
            const post = await Post.findById(req.query.postId);
            if(post){
                //check if user has already disliked the post
                if(post.dislikes.filter(dislike => dislike.user.toString() === req.userId).length > 0){
                    post.dislikes = post.dislikes.filter(dislike => dislike.user.toString() !== req.userId);
                    console.log(post.dislikes);
                }
                //check if user has already liked the post
                if(post.likes.filter(like => like.user.toString() === req.userId).length > 0) {
                    return res.status(400).json({status: false, message: 'Post already liked'});
                }
                post.likes.unshift({user: req.userId});
                await post.save();
                res.json({status:true, likes: post.likes});
            } else {
                return res.json({status: false, message: 'No Post Found'});
            }
        } catch (err) {
            console.log(err.message);
            res.json({status: false, message: err.message});
        }
    } else {
        res.json({status: false, message: 'Method Not Suported'});
    }
}

export default authMiddleware(likePost);