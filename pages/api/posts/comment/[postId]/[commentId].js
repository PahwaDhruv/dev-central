import authMiddleware from '../../../../../middlewares/authMiddleware';
import Post from '../../../../../models/Post';
/*
@Route:  /api/post/comment/:postId/:commentId
@Method: DELETE
@Desc: DELETE a comment
@Access: Private
*/
const deleteComment = async (req, res) => {
    if(req.method === 'DELETE') {
        console.log(req.query);
        try {
            const post = await Post.findById(req.query.postId);
            console.log(post);
            //Pull out comments
            const comment = post.comments.find(comment => comment._id.toString() === req.query.commentId);
            console.log('comment -->',comment);
            if(comment){
                if(comment.user.toString() !== req.userId){
                    return res.status(401).json({status: false, message: 'User Not Authorized'});
                }
                const idx = post.comments.map(comment => comment.user.toString()).indexOf(req.userId);
                post.comments.splice(idx, 1);
                await post.save();
                res.json({status: true, comments: post.comments});
            } else {
                return res.status(404).json({status: false, message: 'No Comment Exists'});
            }
        } catch (err) {
            console.log(err.message);
            return res.status(500).json({status:false, message: err.message});
        }
    } else {
        res.json({status: false, message: 'Method Not Allowed'})
    }
}

export default authMiddleware(deleteComment);