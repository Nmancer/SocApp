const router = require("express").Router();
const passport = require("passport");
const {
  getComment,
  getAllCommentsByPost,
  editComment,
  deleteComment,
  createComment
} = require("../controllers").CommentController;
router.get("/:postId", getAllCommentsByPost);
router.get("/:postId/:commentId", getComment);

router.Comment(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  createComment
);

router.put(
  "/:postId/:commentId",
  passport.authenticate("jwt", { session: false }),
  editComment
);
router.delete(
  "/:postId/:commentId",
  passport.authenticate("jwt", { session: false }),
  deleteComment
);

module.exports = router;
