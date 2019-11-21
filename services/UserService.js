class UserService {
  constructor(User, ErrorHandler) {
    this.User = User;
    this.ErrorHandler = ErrorHandler;
  }

  async register(userDTO) {
    const user = await this.User.findOne({ email: userDTO.email });
    if (user) {
      throw new this.ErrorHandler(400, "User with that email already exists");
    }
    const constructedUser = new User(userDTO);
    const registeredUser = await constructedUser.save();
    return { registeredUser };
  }

  async login(userDTO) {
    const user = await this.User.findOne({ email: userDTO.email });
    if (!user || !(await user.comparePassword(userDTO.password))) {
      throw new this.ErrorHandler(401, "Incorrect credentials");
    }
    const { name, username, id, email } = user;
    const token = await user.signJwt({ name, username, id, email });
    return { token };
  }

  async findUserById(id) {
    const user = await this.User.findById(id);
    if (!user) {
      throw new this.ErrorHandler(404, "User with that id does not exist");
    }
    return { user };
  }

  async listUsers(page, limit) {
    const users = await this.User.find({})
      .limit(limit)
      .skip(page * limit);
    return { users };
  }

  async followUser(loggedUserId, targetUserId) {
    if (loggedUserId === targetUserId) {
      throw new this.ErrorHandler(
        400,
        "Logged and target user ids are the same"
      );
    }
    const targetUser = await User.findById(targetUserId);
    const loggedUser = await User.findById(loggedUserId);
    if (!targetUser) {
      throw new this.ErrorHandler(404, "User with that id does not exist");
    }
    let isAlreadyFollowerIndex = -1;

    targetUser.followers.forEach((followerId, index) => {
      if (followerId.toString() === loggedUserId) {
        isAlreadyFollowerIndex = index;
      }
    });
    if (isAlreadyFollowerIndex === -1) {
      targetUser.followers.push(loggedUserId);
      targetUser.followerCount = targetUser.followerCount + 1;
      loggedUser.following.push(targetUserId);
      loggedUser.followeeCount = loggedUser.followeeCount + 1;
    } else {
      targetUser.followers.splice(isAlreadyFollowerIndex, 1);
      targetUser.followerCount = targetUser.followerCount - 1;
      loggedUser.following = loggedUser.following.filter(
        followeeId => followeeId.toString() !== targetUserId
      );
      loggedUser.followeeCount = loggedUser.followeeCount - 1;
    }
    await targetUser.save();
    await loggedUser.save();
    return { targetUser, loggedUser };
  }
}

module.exports = UserService;
