const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    message: {
        type: String, 
        required: true
    }, 
    author:{
        type: String, 
        required: true
    },
    post:{ type: Schema.Types.ObjectId, ref: 'Post' },
    owner: Boolean
})

const Comment = model("Comment", commentSchema);

module.exports = Comment;