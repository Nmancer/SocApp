const router = require("express").Router();
const passport = require("passport");
const {
  getPost,
  getAllPosts,
  editPost,
  deletePost,
  createPost
} = require("../controllers").PostController;
router.get("/", getAllPosts);
router.get("/:id", getPost);

router.post("/", passport.authenticate("jwt", { session: false }), createPost);

router.put("/:id", passport.authenticate("jwt", { session: false }), editPost);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deletePost
);

module.exports = router;
