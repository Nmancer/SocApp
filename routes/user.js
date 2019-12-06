const router = require("express").Router();
const passport = require("passport");
const {
  loginUser,
  registerUser,
  getAllUsers,
  getSingleUser,
  followUser,
  issueToken,
  rejectToken
} = require("../controllers").UserController;

const { loginSchema, registrationSchema } = require("../utils/schemas");
const validateMiddleware = require("../middleware/validation");

router.get("/all", getAllUsers);
router.get("/profile/:id", getSingleUser);
router.post("/login", validateMiddleware(loginSchema), loginUser);
router.post("/token", issueToken);
router.post("/token/reject", rejectToken);

router.post("/register", validateMiddleware(registrationSchema), registerUser);
router.post(
  "/follow/:id",
  passport.authenticate("jwt", { session: false }),
  followUser
);

module.exports = router;
