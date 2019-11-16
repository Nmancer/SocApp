const router = require("express").Router();
const passport = require("passport");
const {
  loginUser,
  registerUser,
  getAllUsers,
  getSingleUser,
  editUser,
  followUser
} = require("../controllers").UserController;

const { loginSchema } = require("../utils/schemas");
const validateMiddleware = require("../middleware/validation");
// const { celebrate } = require("celebrate");

router.get("/allUsers", getAllUsers);
router.get(
  "/profile/:id",
  passport.authenticate("jwt", { session: false }),
  getSingleUser
);
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  getSingleUser
);
router.post("/login", validateMiddleware(loginSchema), loginUser);
router.post("/register", registerUser);
router.post(
  "/profile/:id/follow",
  passport.authenticate("jwt", { session: false }),
  followUser
);

router.put("/me", passport.authenticate("jwt", { session: false }), editUser);

module.exports = router;
