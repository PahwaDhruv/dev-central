import authMiddleware from '../../../../middlewares/authMiddleware';
import Post from '../../../../models/Post';

/*
@Route:  /api/post/removeLike/:postId
@Method: PUT
@Desc: Unlike a Post
@Access: Private
*/
const unlikePost = async (req, res) => {
    if(req.method === 'PUT'){
        try {
            const post = await Post.findById(req.query.postId);
            if(post){
                if(post.likes.filter(like => like.user.toString() === req.userId).length === 0) {
                    return res.status(400).json({status: false, message: 'Post not liked yet'});
                }
                const idx = post.likes.map(like => like.user.toString()).indexOf(req.userId);
                post.likes.splice(idx,1);
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

export default authMiddleware(unlikePost);