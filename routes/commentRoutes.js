const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createComment, getCommentsByPost, deleteComment } = require('../controllers/commentController');

const router = express.Router({ mergeParams: true });

router.get('/', getCommentsByPost);          // GET all comments for a post
router.post('/', protect, createComment);    // CREATE a comment for a post
router.delete('/:id', protect, deleteComment); // DELETE a comment by its _id

module.exports = router;
