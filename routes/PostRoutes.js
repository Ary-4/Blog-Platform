const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const { createPost, getPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');

const router = express.Router();


router.get('/', getPosts);
router.get('/:id', getPostById);


router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;
