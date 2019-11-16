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

    author: { type: Schema.Types.ObjectId, ref: "users" },

    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

PostSchema.set("toObject", { virtuals: true });
PostSchema.set("toJSON", { virtuals: true });

// PostSchema.virtual("comments", {
//   ref: "comments",
//   localField: "_id",
//   foreignField: "post"
// });

module.exports = Post = mongoose.model("posts", PostSchema);
