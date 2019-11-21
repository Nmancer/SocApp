const { profileService } = require("../services");
const cloudinary = require("cloudinary");
const asyncWrapper = require("../utils/asyncWrapper");
const sendSuccess = require("../utils/sendSuccess");

const editUser = asyncWrapper(async (req, res, next) => {
  const userDTO = req.body;
  const { user } = await profileService.editUser(req.user.id, userDTO);
  sendSuccess(res, { user });
});

const editUserPassword = asyncWrapper(async (req, res, next) => {
  const userDTO = req.body;
  await profileService.editUserPassword(req.user.id, userDTO);
  sendSuccess(res, { message: "Successfully changed password", success: true });
});

const deleteUser = asyncWrapper(async (req, res, next) => {
  const { user } = await profileService.deleteUser(req.user);
  sendSuccess(res, { user });
});

const getLoggedUser = asyncWrapper(async (req, res, next) => {
  sendSuccess(res, { user: req.user });
});

const uploadAvatar = asyncWrapper(async (req, res, next) => {
  const image = {};
  image.url = req.file.url;
  image.id = req.file.public_id;
  if (req.user.avatar.imageId) {
    await cloudinary.v2.uploader.destroy(req.user.avatar.imageId);
  }
  const { uploadedImage } = await profileService.uploadAvatar(req.user, image);

  sendSuccess(res, { image: uploadedImage });
});

// app.post("/api/images", parser.single("image"), (req, res) => {
//   console.log(req.file); // to see what is returned to you
//   const image = {};
//   image.url = req.file.url;
//   image.id = req.file.public_id;
//   Image.create(image) // save image information in database
//     .then(newImage => res.json(newImage))
//     .catch(err => console.log(err));
// });
module.exports = {
  getLoggedUser,
  editUser,
  editUserPassword,
  deleteUser,
  uploadAvatar
};
