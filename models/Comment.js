const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema({
  text: { type: String, trim: true, required: true },
  postId: { type: Schema.Types.ObjectId, ref: "posts" },
  authorId: { type: Schema.Types.ObjectId, ref: "users" },
  date: {
    type: Date,
    default: Date.now()
  }
});
CommentSchema.set("toObject", { virtuals: true });
CommentSchema.set("toJSON", { virtuals: true });
CommentSchema.methods.toJSON = function() {
  const userObject = this.toObject();

  delete userObject.__v;
  return userObject;
};
CommentSchema.virtual("author", {
  ref: "users",
  localField: "authorId",
  foreignField: "_id",
  justOne: true
});
module.exports = Comment = mongoose.model("comments", CommentSchema);
