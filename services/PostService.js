class PostService {
  constructor(Post, ErrorHandler) {
    this.Post = Post;
    this.ErrorHandler = ErrorHandler;
  }

  async listPosts(page, limit) {
    const posts = await this.Post.find({})
      .limit(limit)
      .skip(page * limit)
      .sort({ createdAt: -1 })
      .populate("author", ["username", "name", "avatar"]);
    return { posts };
  }
  async searchPosts(titleQuery) {
    const posts = await this.Post.find({
      title: { $regex: titleQuery, $options: "i" }
    })
      .limit(20)
      .sort({ createdAt: -1 })
      .populate("author", ["username", "name", "avatar"]);
    return { posts };
  }

  async listTrendingPosts() {
    let today = new Date();
    const sevenDaysAgo = today.setDate(today.getDate() - 7);
    const posts = await this.Post.find({ createdAt: { $gte: sevenDaysAgo } })
      .limit(20)
      .sort({ likeCount: -1 })
      .populate("author", ["username", "name", "avatar"]);
    return { posts };
  }

  async createPost(postDTO) {
    const constructedPost = new this.Post(postDTO);

    const savedPost = await constructedPost.save();

    return { post: savedPost };
  }
  async showPost(id) {
    const post = await this.Post.findById(id)
      .populate("author")
      .populate({
        path: "commentsOwned",
        select: ["date", "text", "authorId"],
        populate: {
          path: "author",
          select: ["username", "avatar", "name"]
        }
      })
      .exec();

    if (!post) {
      throw new this.ErrorHandler(404, "Post with that id does not exist");
    }
    return { post };
  }

  async editPost(userId, postId, postDTO) {
    const post = await this.Post.findOneAndUpdate(
      { authorId: userId, _id: postId },
      postDTO,
      { new: true }
    );
    if (!post) {
      throw new this.ErrorHandler(404, "Post with that id does not exist ");
    }
    return { post };
  }
  async deletePost(userId, postId) {
    const post = await this.Post.findOneAndDelete({
      authorId: userId,
      _id: postId
    });

    if (!post) {
      throw new this.ErrorHandler(404, "Post with that id does not exist ");
    }
    return { post };
  }
  async likePost(userId, postId) {
    const post = await this.Post.findById(postId);
    if (!post) {
      throw new this.ErrorHandler(404, "Post with that id does not exist ");
    }

    post.likes = post.likes.filter(
      userWhoAlreadyLiked => userWhoAlreadyLiked === userId
    );
    if (post.likeCount === post.likes.length) {
      post.likes.push(userId);
      post.likeCount = post.likeCount + 1;
    } else {
      post.likeCount = post.likeCount - 1;
    }
    await post.save();

    const populatedPost = await post
      .populate("likes", ["username"])
      .populate("author", ["username"])
      .execPopulate();

    return { post: populatedPost };
  }
}

module.exports = PostService;
