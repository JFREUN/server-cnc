const express = require("express");
const Post = require("../models/Post.model");
const router = express.Router();
const User = require("../models/User.model");
const mongoose = require('mongoose');
// const fileUploader = require('../config/cloudinary.config');
const Comment = require("../models/Comment.model");

router.post("/posts", (req, res) => {
  const { title, artist, artistLink, imageUrl } = req.body;

  Post.create({ title, artist, artistLink, imageUrl, comments: [] })
    .then((response) => {
      res.json(response);})
    .catch((err) => res.json(err));
});

router.get('/posts', (req, res, next) => {
    Post.find()
    .populate('comments')
      .then(allProjects => {
        res.json(allProjects)})
      .catch(err => res.json(err));
  });

router.get('/posts/:postId', (req, res, next) => {
    const { postId } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Post.findById(postId)
    .populate('comments')
      .then(post => res.status(200).json(post))
      .catch(error => res.json(error));
  });

router.put('/posts/:postId', (req, res, next) => {
    const { postId } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Post.findByIdAndUpdate(postId, req.body, { new: true })
      .then((updatedPost) => res.json(updatedPost))
      .catch(error => res.json(error));
  });

  router.delete('/posts/:postId', (req, res, next) => {
    const { postId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Post.findByIdAndRemove(postId)
      .then(() => res.json({ message: `Project with ${postId} is removed successfully.` }))
      .catch(error => res.json(error));
  });
   
  
   
  
module.exports = router;
