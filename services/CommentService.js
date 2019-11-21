class CommentService {
  constructor(Comment, Post, ErrorHandler) {
    this.Comment = Comment;
    this.Post = Post;
    this.ErrorHandler = ErrorHandler;
  }

  async listComments(postId, page, limit) {
    const comments = await this.Comment.find({ postId })
      .limit(limit)
      .skip(page * limit)
      .populate("author", ["username,name,avatar"]);
    return { comments };
  }

  async createComment(commentDTO) {
    if (!(await Post.findById(commentDTO.postId))) {
      throw new this.ErrorHandler(404, "Post with that id does not exist ");
    }
    const constructedComment = new this.Comment(commentDTO);
    const savedComment = await constructedComment.save();
    return { comment: savedComment };
  }

  async editComment(userId, commentId, commentDTO) {
    const comment = await this.Comment.findOneAndUpdate(
      { authorId: userId, _id: commentId },
      commentDTO,
      { new: true }
    );
    if (!comment) {
      throw new this.ErrorHandler(404, "Comment with that id does not exist ");
    }
    return { comment };
  }
  async deleteComment(userId, commentId) {
    const comment = await this.Comment.findOneAndDelete({
      authorId: userId,
      _id: commentId
    });

    if (!comment) {
      throw new this.ErrorHandler(404, "Comment with that id does not exist ");
    }
    return { comment };
  }
}

module.exports = CommentService;
