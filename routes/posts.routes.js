const express = require("express");
const Post = require("../models/Post.model");
const mongoose = require("mongoose");
const router = express.Router();
const fileUploader = require("../config/cloudinary.config");
const Comment = require("../models/Comment.model");



router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  // console.log("file is: ", req.file)

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ fileUrl: req.file.path });
});

router.post("/posts", (req, res, next) => {
  const { title, artist, artistLink, imageUrl, user } = req.body;

  Post.create({ title, artist, artistLink, imageUrl, user })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/posts/:postId", (req, res, next) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Post.findById(postId)
    .populate("user")
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
        select: 'name'
      }
    })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.json(error));
});

router.put("/posts/:postId", (req, res, next) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Post.findByIdAndUpdate(postId, req.body, { new: true })
    .then((updatedPost) => res.status(200).json(updatedPost))
    .catch((error) => res.json(error));
});

router.delete("/posts/:postId", (req, res, next) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Post.findByIdAndRemove(postId)
    .then(() =>
      res.json({
        message: `Recipe with ${postId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});



module.exports = router;
