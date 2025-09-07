const Post = require('../models/Post');


const createPost = async (req, res) => {                                   // create post
  try {
    const { title, content } = req.body;
    const post = new Post({ title, content, author: req.user.id });
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getPosts = async (req, res) => {                                        // get post
  try {
    const posts = await Post.find().populate('author', 'name email');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getPostById = async (req, res) => {                                       //getbyid
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const updatePost = async (req, res) => {                                          //update
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.author.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });
    
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const deletePost = async (req, res) => {                                         // delete
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.author.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });
    
    await post.remove();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createPost, getPosts, getPostById, updatePost, deletePost };
