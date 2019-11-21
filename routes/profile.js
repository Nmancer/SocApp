const router = require("express").Router();
const passport = require("passport");
const parser = require("../config/cloudinary");

const {
  getLoggedUser,
  editUser,
  editUserPassword,
  deleteUser,
  uploadAvatar
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
router.post(
  "/avatar",
  passport.authenticate("jwt", { session: false }),
  parser.single("image"),
  uploadAvatar
);

router.delete(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  deleteUser
);
module.exports = router;
