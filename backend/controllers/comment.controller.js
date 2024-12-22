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
export const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({
      postId: req.params.postId,
    }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found!"));
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};
export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found!"));
    }
    if(comment.userId !== req.user.id && !req.user.isAdmin){
        return next(errorHandler(403,"You are not authorized to edit this comment!"))
    }
    const editedComment=await Comment.findByIdAndUpdate(req.params.commentId,{
        content:req.body.content,
    },{new:true})
    res.status(200).json(editedComment)
  } catch (error) {
    next(error);
  }
};
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment not found!"));
    }
    if(comment.userId !== req.user.id && !req.user.isAdmin){
        return next(errorHandler(403,"You are not authorized to edit this comment!"))
    }
    await Comment.findByIdAndDelete(req.params.commentId)
    res.status(200).json("Comment has been deleted successfully")
  } catch (error) {
    next(error);
  }
};