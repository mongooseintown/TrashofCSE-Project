const express = require('express');
const router = express.Router();
const {
  createPost,
  getPosts,
  upvotePost,
  commentPost,
  deletePost
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

// All post routes are protected
router.route('/')
  .post(protect, createPost)
  .get(protect, getPosts);

router.route('/:id')
  .delete(protect, deletePost);

router.put('/:id/upvote', protect, upvotePost);
router.post('/:id/comment', protect, commentPost);

module.exports = router;
