const router = require("express").Router();
const passport = require("passport");
const {
  getLoggedUser,
  editUser,
  editUserPassword,
  deleteUser
} = require("../controllers").ProfileController;

const { profileEditSchema, passwordEditSchema } = require("../utils/schemas");
const validateMiddleware = require("../middleware/validation");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getLoggedUser
);

router.patch(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  validateMiddleware(profileEditSchema),
  editUser
);
router.patch(
  "/password",
  passport.authenticate("jwt", {
    session: false
  }),
  validateMiddleware(passwordEditSchema),
  editUserPassword
);
router.delete(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  deleteUser
);
module.exports = router;
