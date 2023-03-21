const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    post:[{type: Schema.Types.ObjectId, ref: "Post" }]
  },
  {   
    timestamps: true
  }
 
);

const User = model("User", userSchema);

module.exports = User;