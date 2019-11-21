const { postService } = require("../services");

const asyncWrapper = require("../utils/asyncWrapper");
const sendSuccess = require("../utils/sendSuccess");

const getPost = asyncWrapper(async (req, res, next) => {
  const { post } = await postService.showPost(req.params.id);

  sendSuccess(res, { post });
});
const getAllPosts = asyncWrapper(async (req, res, next) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 15;

  const { posts } = await postService.listPosts(page, limit);

  sendSuccess(res, { posts });
});
const createPost = asyncWrapper(async (req, res, next) => {
  const postDTO = { ...req.body, authorId: req.user.id };

  const { post } = await postService.createPost(postDTO);
  sendSuccess(res, { post });
});

const likePost = asyncWrapper(async (req, res, next) => {
  const { post } = await postService.likePost(req.user.id, req.params.id);

  sendSuccess(res, { post });
});
const editPost = asyncWrapper(async (req, res, next) => {
  const postDTO = req.body;

  const { post } = await postService.editPost(
    req.user.id,
    req.params.id,
    postDTO
  );
  sendSuccess(res, { post });
});
const deletePost = asyncWrapper(async (req, res, next) => {
  const { post } = await postService.deletePost(req.user.id, req.params.id);
  sendSuccess(res, { post });
});

module.exports = {
  getPost,
  getAllPosts,
  createPost,
  editPost,
  deletePost,
  likePost
};
