const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Comment = require("../models/Comment.model");
const Post = require("../models/Post.model");

router.post('/posts/:postId/comment', (req, res, next) => {
    const { postId } = req.params;
    const { message, author} = req.body;
  
    Post.findById(postId)
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'name'
        }
      })
      .then((post) => {
        if (!post) {
          return res.status(404).send('Post not found');
        }
  
        if (!message) {
          return res.status(400).send('Comment message cannot be empty');
        }

        Comment
        .create({author, message})
        .then((response) => {
            res.json(response)
            post.comments.push(response);
            post.save();
        })
  
        // const newComment = new Comment({ author, message });
        // newComment.save().then((comment) => {
        //   post.comments.push(comment);
        //   post.save().then(() => {
        //     res.redirect(`/post/${postId}`);
        //   });
        // });
      })
      .catch((err) => {
        next(err);
      });
  });
  
  router.delete("/comments/:commentId", (req, res, next) => {
    const { commentId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Comment.findByIdAndRemove(commentId)
      .then(() =>
        res.json({
          message: `Comment with ${commentId} is removed successfully.`,
        })
      )
      .catch((error) => res.json(error));
  });
  module.exports = router;
