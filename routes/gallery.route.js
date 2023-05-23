const express = require("express");
const Post = require("../models/Post.model");
const mongoose = require("mongoose");
const router = express.Router();


router.get("/posts", (req, res, next) => {
    Post.find()
      .populate("user comments")
      .then((allPosts) => res.json(allPosts))
      .catch((err) => res.json(err));
  });

module.exports = router;