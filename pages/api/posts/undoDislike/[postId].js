import authMiddleware from '../../../../middlewares/authMiddleware';
import Post from '../../../../models/Post';

/*
@Route:  /api/post/removeLike/:postId
@Method: PUT
@Desc: Unlike a Post
@Access: Private
*/
const unDislikePost = async (req, res) => {
    if(req.method === 'PUT'){
        try {
            const post = await Post.findById(req.query.postId);
            if(post){
                if(post.dislikes.filter(dislike => dislike.user.toString() === req.userId).length === 0) {
                    return res.status(400).json({status: false, message: 'Post not disliked yet'});
                }
                const idx = post.dislikes.map(dislike => dislike.user.toString()).indexOf(req.userId);
                post.dislikes.splice(idx, 1);
                await post.save();
                res.json({status: true, dislikes: post.dislikes});
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

export default authMiddleware(unDislikePost);