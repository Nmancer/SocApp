const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const Post = require("./Post");
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },

    username: {
      type: String,
      required: true,
      trim: true
    },
    avatar: {
      type: String,
      trim: true,
      lowercase: true
    },
    about: {
      type: String,
      trim: true
    },
    followers: {
      usersFollowing: [{ type: Schema.Types.ObjectId, ref: "users" }],
      count: {
        type: Number,
        default: 0
      }
    },
    following: {
      usersFollowed: [{ type: Schema.Types.ObjectId, ref: "users" }],
      count: {
        type: Number,
        default: 0
      }
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);
UserSchema.set("toObject", { virtuals: true });
UserSchema.set("toJSON", { virtuals: true });
// UserSchema.virtual("posts", {
//   ref: "posts",
//   localField: "_id",
//   foreignField: "author"
// });

UserSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

UserSchema.methods.comparePassword = async function(candidatePassword, cb) {
  const isMatch = await bcrypt.compare(candidatePassword, hash);
  next(isMatch);
};

UserSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});
UserSchema.pre("remove", async function(next) {
  await Post.deleteMany({ author: this._id });

  next();
});

module.exports = User = mongoose.model("users", UserSchema);
