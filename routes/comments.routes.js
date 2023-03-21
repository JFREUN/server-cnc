const express = require("express");
const Post = require("../models/Post.model");
const router = express.Router();
const User = require("../models/User.model");
const mongoose = require('mongoose');
// const fileUploader = require('../config/cloudinary.config');
const Comment = require("../models/Comment.model");

router.post('/comments', (req, res, next) => {
    const { message, author, postId} = req.body;

    Comment.create({ message, author, post:postId})
      .then(newComment => {
        return Post.findByIdAndUpdate(postId, { $push: { comments: newComment._id } } );
      })
      .then(response => res.json(response))
      .catch(err => res.json(err));
  });

module.exports = router;