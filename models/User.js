const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const randtoken = require("rand-token");

const { signWithJwt } = require("../utils/signJwt");
const Post = require("./Post");
const UserSchema = new Schema({
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
    imageUrl: {
      type: String
    },
    imageId: {
      type: String
    }
  },
  role: {
    type: String,
    enum: ["Admin", "Member"],
    default: "Member"
  },
  about: {
    type: String,
    trim: true
  },
  followers: [{ type: Schema.Types.ObjectId, ref: "users" }],
  followerCount: {
    type: Number,
    default: 0
  },
  refreshToken: { type: String },
  following: [{ type: Schema.Types.ObjectId, ref: "users" }],
  followeeCount: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now()
  }
});
UserSchema.set("toObject", { virtuals: true });
UserSchema.set("toJSON", { virtuals: true });

UserSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.__v;

  return userObject;
};

UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.generateRefreshToken = async function(userData) {
  return randtoken.uid(256);
};

UserSchema.methods.signJwt = async function(userData) {
  return await signWithJwt(userData, process.env.JWTSECRET);
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
