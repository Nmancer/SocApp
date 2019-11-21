const router = require("express").Router();
const passport = require("passport");
const {
  getPost,
  getAllPosts,
  editPost,
  deletePost,
  createPost,
  likePost
} = require("../controllers").PostController;

const { postSchema } = require("../utils/schemas");
const validateMiddleware = require("../middleware/validation");

router.get("/", getAllPosts);

router.get("/:id", getPost);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateMiddleware(postSchema),
  createPost
);

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),

  likePost
);
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validateMiddleware(postSchema),
  editPost
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deletePost
);

module.exports = router;
