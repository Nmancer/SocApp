const { commentService } = require("../services");

const asyncWrapper = require("../utils/asyncWrapper");
const sendSuccess = require("../utils/sendSuccess");

const getComment = asyncWrapper(async (req, res, next) => {
  const { comment } = await commentService.showComment(req.params.id);

  sendSuccess(res, { comment });
});
const getAllCommentsByPost = asyncWrapper(async (req, res, next) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 15;

  const { comments } = await commentService.listComments(
    req.params.postId,
    page,
    limit
  );

  sendSuccess(res, { comments });
});
const createComment = asyncWrapper(async (req, res, next) => {
  const commentDTO = {
    ...req.body,
    authorId: req.user.id,
    postId: req.params.postId
  };

  const { comment } = await commentService.createComment(commentDTO);
  sendSuccess(res, { comment }, 201);
});
const editComment = asyncWrapper(async (req, res, next) => {
  const commentDTO = req.body;

  const { comment } = await commentService.editComment(
    req.user.id,
    req.params.commentId,
    commentDTO
  );
  sendSuccess(res, { comment });
});
const deleteComment = asyncWrapper(async (req, res, next) => {
  const { comment } = await commentService.deleteComment(
    req.user.id,
    req.params.commentId
  );
  sendSuccess(res, { comment });
});

module.exports = {
  getComment,
  getAllCommentsByPost,
  createComment,
  editComment,
  deleteComment
};
