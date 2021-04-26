import authMiddleware from '../../../../middlewares/authMiddleware';
import Post from '../../../../models/Post';

/*
@Route:  /api/post/dislike/:postId
@Method: PUT
@Desc: Dislike a Post
@Access: Private
*/
const dislikePost = async (req, res) => {
    if(req.method === 'PUT'){
        try {
            const post = await Post.findById(req.query.postId);
            if(post){
                //check if user has already liked the post
                if(post.likes.filter(like => like.user.toString() === req.userId).length > 0) {
                    post.likes = post.likes.filter(like => like.user.toString() !== req.userId);
                    console.log(post.likes);
                }
                //check if user has already disliked the post
                if(post.dislikes.filter(dislike => dislike.user.toString() === req.userId).length > 0){
                    return res.status(400).json({status: false, message: 'Post already disliked'});
                }
                post.dislikes.unshift({user: req.userId});
                await post.save();
                res.json({status:true, dislikes: post.dislikes});
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

export default authMiddleware(dislikePost);