const mongoose = require("mongoose");
const { Schema } = mongoose;
const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    body: {
      type: String,
      required: true,
      trim: true
    },

    authorId: { type: Schema.Types.ObjectId, ref: "users" },
    likes: [{ type: Schema.Types.ObjectId, ref: "users" }],
    likeCount: { type: Number, default: 0 }
  },
  { timestamps: true, id: false }
);

PostSchema.set("toObject", { virtuals: true });
PostSchema.set("toJSON", { virtuals: true });
PostSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.__v;
  return userObject;
};
PostSchema.virtual("author", {
  ref: "users",
  localField: "authorId",
  foreignField: "_id",
  justOne: true
});
PostSchema.virtual("commentsOwned", {
  ref: "comments",
  localField: "_id",
  foreignField: "postId"
});

module.exports = Post = mongoose.model("posts", PostSchema);
