const UserService = require("./User");
const PostService = require("./Post");
const CommentService = require("./Comment");
const { User, Post, Comment } = require("../models");

const userService = new UserService(User);
const postService = new PostService(Post);
const commentService = new CommentService(Comment);

module.exports = {
  userService,
  postService,
  commentService
};
