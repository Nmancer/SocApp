class User {
  constructor(User) {
    this.User = User;
  }

  async getUser(email, password) {
    return await this.User.findOne({ email, password });
  }
  async getUserByEmail(email) {
    return await this.User.findOne({ email });
  }
  async getUserById(id) {
    return await this.User.findById(id);
  }
  async getUsers() {
    return await this.User.find({});
  }

  async saveUser(user) {
    await user.save();
    return user;
  }
  async deleteUser(id) {
    return await this.User.findOneAndDelete(id);
  }
  async editUserById(id, userInfo) {
    return await this.User.findByIdAndUpdate(id, userInfo);
  }
}

module.exports = User;
