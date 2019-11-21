class ProfileService {
  constructor(User, ErrorHandler) {
    this.User = User;
    this.ErrorHandler = ErrorHandler;
  }

  async deleteUser(id) {
    const user = await User.findById(id);
    await user.remove();
    return { user };
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
}

module.exports = ProfileService;
