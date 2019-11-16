const { commentService } = require("../services");
const { ErrorHandler } = require("../utils/error");

const asyncWrapper = require("../utils/asyncWrapper");

const getComment = asyncWrapper(async (req, res, next) => {});
const getAllCommentsByPost = asyncWrapper(async (req, res, next) => {});
const createComment = asyncWrapper(async (req, res, next) => {});
const editComment = asyncWrapper(async (req, res, next) => {});
const deleteComment = asyncWrapper(async (req, res, next) => {});

module.exports = {
  getComment,
  getAllCommentsByPost,
  createComment,
  editComment,
  deleteComment
};
