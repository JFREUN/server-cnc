const { Schema, model } = require("mongoose");

const postSchema = new Schema(
{  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  artistLink: {
    type: String,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  imageUrl: {
    type: String,
    required:true,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }] },

  {
    timestamps: true
  }
  
); // maybe implement animal tags for a search function?


module.exports = model("Post", postSchema);