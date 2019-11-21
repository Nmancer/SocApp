const UserService = require("./UserService");
const PostService = require("./PostService");
const CommentService = require("./CommentService");
const { User, Post, Comment } = require("../models");
const { ErrorHandler } = require("../utils/error");
const userService = new UserService(User, ErrorHandler);
const postService = new PostService(Post, ErrorHandler);
const commentService = new CommentService(Comment, Post, ErrorHandler);

module.exports = {
  userService,
  postService,
  commentService
};
