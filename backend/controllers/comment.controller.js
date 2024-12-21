import Comment from "../model/comment.model.js";
import Post from "../model/post.model.js"; // Assuming there's a Post model
import User from "../model/user.model.js"; // Assuming there's a User model
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
    try {
        const { content, postId, userId } = req.body;

        // Check if the userId matches the authenticated user
        if (userId !== req.user.id) {
            return next(errorHandler(403, "You are not allowed to comment!"));
        }

        // Check if the postId exists in the database
        const post = await Post.findById(postId);
        if (!post) {
            return next(errorHandler(404, "Post not found!"));
        }

        // Check if the userId exists in the database
        const user = await User.findById(userId);
        if (!user) {
            return next(errorHandler(404, "User not found!"));
        }

        // Create and save the new comment
        const newComment = new Comment({
            content,
            postId,
            userId,
        });

        await newComment.save();

        res.status(200).json(newComment);
    } catch (error) {
        next(error);
    }
};
