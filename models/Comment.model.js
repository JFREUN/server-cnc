const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    message: {
        type: String, 
        required: true
    }, 
    author:{ type: Schema.Types.ObjectId, ref: "User" },
})


module.exports = model("Comment", commentSchema);