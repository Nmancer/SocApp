const router = require("express").Router();
const passport = require("passport");
const {
  getAllCommentsByPost,
  editComment,
  deleteComment,
  createComment
} = require("../controllers").CommentController;
router.get("/:postId", getAllCommentsByPost);

router.post(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  createComment
);

router.patch(
  "/:commentId",
  passport.authenticate("jwt", { session: false }),
  editComment
);
router.delete(
  "/:commentId",
  passport.authenticate("jwt", { session: false }),
  deleteComment
);

module.exports = router;
