const router = require("express").Router();
const passport = require("passport");
const {
  getAllCommentsByPost,
  editComment,
  deleteComment,
  createComment
} = require("../controllers").CommentController;

const { commentSchema } = require("../utils/schemas");
const validateMiddleware = require("../middleware/validation");

router.get("/:postId", getAllCommentsByPost);

router.post(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  validateMiddleware(commentSchema),
  createComment
);

router.patch(
  "/:commentId",
  passport.authenticate("jwt", { session: false }),
  validateMiddleware(commentSchema),
  editComment
);
router.delete(
  "/:commentId",
  passport.authenticate("jwt", { session: false }),

  deleteComment
);

module.exports = router;
