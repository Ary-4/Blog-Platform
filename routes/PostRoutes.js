const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const { createPost, getPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');

const router = express.Router();

// Public
router.get('/', getPosts);
router.get('/:id', getPostById);

// Protected
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;
