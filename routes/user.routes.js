const express = require("express");
const Post = require("../models/Post.model");
const User = require("../models/User.model");
const router = express.Router();
//profile of logged in user
router.get("/profile/:userId", (req, res) => {
    const userId = req.params.userId
    
    Post.find({user: userId})
    .populate("user")
    .then((user) => {
        console.log(user)
        res.json(user)})
    .catch(err => console.log(err))
    
});

//profile of other users

router.get("/user/:userId", (req, res) => {
    const userId = req.params.userId
    
    User.find({_id: userId})
    .then((user) => {
        console.log(user)
        res.json(user)})
    .catch(err => console.log(err))
    
});
module.exports = router;
