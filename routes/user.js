const router = require("express").Router();
const passport = require("passport");
const {
  loginUser,
  registerUser,
  getAllUsers,
  getSingleUser,
  getLoggedUser,
  editUser,
  editUserPassword,
  deleteUser,
  followUser
} = require("../controllers").UserController;

const {
  loginSchema,
  registrationSchema,
  profileEditSchema,
  passwordEditSchema
} = require("../utils/schemas");
const validateMiddleware = require("../middleware/validation");

router.get("/all", getAllUsers);
router.get("/profile/:id", getSingleUser);
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  getLoggedUser
);
router.post("/login", validateMiddleware(loginSchema), loginUser);
router.post("/register", validateMiddleware(registrationSchema), registerUser);
router.post(
  "/follow/:id",
  passport.authenticate("jwt", { session: false }),
  followUser
);

router.patch(
  "/me",
  passport.authenticate("jwt", {
    session: false
  }),
  validateMiddleware(profileEditSchema),
  editUser
);
router.patch(
  "/me/password",
  passport.authenticate("jwt", {
    session: false
  }),
  validateMiddleware(passwordEditSchema),
  editUserPassword
);
router.delete(
  "/me",
  passport.authenticate("jwt", {
    session: false
  }),
  deleteUser
);
module.exports = router;
