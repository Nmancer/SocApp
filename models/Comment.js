const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema({
  text: { type: String, trim: true, required: true },
  belongsTo: { type: Schema.Types.ObjectId, ref: "posts" },
  author: { type: Schema.Types.ObjectId, ref: "users" },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Comment = mongoose.model("comments", CommentSchema);
