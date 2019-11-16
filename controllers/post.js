const { postService } = require("../services");
const { ErrorHandler } = require("../utils/error");

const asyncWrapper = require("../utils/asyncWrapper");

const getPost = asyncWrapper(async (req, res, next) => {});
const getAllPosts = asyncWrapper(async (req, res, next) => {});
const createPost = asyncWrapper(async (req, res, next) => {});
const editPost = asyncWrapper(async (req, res, next) => {});
const deletePost = asyncWrapper(async (req, res, next) => {});

module.exports = { getPost, getAllPosts, createPost, editPost, deletePost };
