class PostService {
  constructor(Post, ErrorHandler) {
    this.Post = Post;
    this.ErrorHandler = ErrorHandler;
  }

  async listPosts(page, limit) {
    const posts = await this.Post.find({})
      .limit(limit)
      .skip(page * limit)
      .populate("author", ["username"]);
    return { posts };
  }

  async createPost(postDTO) {
    const constructedPost = new Post(postDTO);

    const savedPost = await constructedPost.save();

    return { post: savedPost };
  }
  async showPost(id) {
    const post = await this.Post.findById(id).populate("author");
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
