class ProfileService {
  constructor(User, ErrorHandler) {
    this.User = User;
    this.ErrorHandler = ErrorHandler;
  }

  async deleteUser(loggedUser) {
    await loggedUser.remove();
    return { loggedUser };
  }
  async editUser(id, userDTO) {
    const user = await this.User.findByIdAndUpdate(id, userDTO, { new: true });
    return { user };
  }
  async editUserPassword(id, passwordDTO) {
    const user = await User.findById(id);
    if (!(await user.comparePassword(passwordDTO.oldPassword))) {
      throw new this.ErrorHandler(401, "Incorrect credentials");
    }
    user.password = passwordDTO.newPassword;
    await user.save();
    return { user };
  }
  async uploadAvatar(loggedUser, image) {
    loggedUser.avatar.imageUrl = image.url;
    loggedUser.avatar.imageId = image.id;

    await loggedUser.save();
    return { uploadedImage: image };
  }
}

module.exports = ProfileService;
