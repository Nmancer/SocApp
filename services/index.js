const UserService = require("./UserService");
const ProfileService = require("./ProfileService");
const PostService = require("./PostService");
const CommentService = require("./CommentService");
const { User, Post, Comment } = require("../models");
const { ErrorHandler } = require("../utils/error");
const userService = new UserService(User, ErrorHandler);
const profileService = new ProfileService(User, ErrorHandler);
const postService = new PostService(Post, ErrorHandler);
const commentService = new CommentService(Comment, Post, ErrorHandler);

module.exports = {
  userService,
  profileService,
  postService,
  commentService
};
