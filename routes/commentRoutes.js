const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createComment, getCommentsByPost, deleteComment } = require('../controllers/commentController');

const router = express.Router({ mergeParams: true });

router.get('/', getCommentsByPost);          
router.post('/', protect, createComment);    
router.delete('/:id', protect, deleteComment); 

module.exports = router;
