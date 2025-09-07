const Comment = require('../models/Comment');

// CREATE comment
const createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;

    const comment = new Comment({ 
      content, 
      post: postId, 
      user: req.user.id   // use "user" here
    });

    const savedComment = await comment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET comments for a post
const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate('user', 'name email');   // populate "user" field

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE comment
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    // check "user" instead of "author"
    if (comment.user.toString() !== req.user.id) 
      return res.status(401).json({ message: 'Not authorized' });

    await comment.remove();
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createComment, getCommentsByPost, deleteComment };
