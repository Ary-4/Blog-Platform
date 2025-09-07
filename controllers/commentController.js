const Comment = require('../models/Comment');


const createComment = async (req, res) => {                                  // comment
  try {
    const { content } = req.body;
    const { postId } = req.params;

    const comment = new Comment({ 
      content, 
      post: postId, 
      user: req.user.id   
    });

    const savedComment = await comment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getCommentsByPost = async (req, res) => {                                //comments for post
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate('user', 'name email');   

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const deleteComment = async (req, res) => {                                     // delete
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    
    if (comment.user.toString() !== req.user.id) 
      return res.status(401).json({ message: 'Not authorized' });

    await comment.remove();
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createComment, getCommentsByPost, deleteComment };
