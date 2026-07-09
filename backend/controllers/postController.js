const Post = require('../models/Post');

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
exports.createPost = async (req, res) => {
  try {
    const { content, tag } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Post content cannot be empty' });
    }

    const post = await Post.create({
      user: req.user._id,
      content,
      tag: tag || 'general'
    });

    // Populate user before returning
    const populatedPost = await Post.findById(post._id)
      .populate('user', 'fullName email semester department isAdmin');

    res.status(201).json(populatedPost);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Server error creating post', error: error.message });
  }
};

// @desc    Get all posts (sorted by newest first)
// @route   GET /api/posts
// @access  Private
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate('user', 'fullName email semester department isAdmin')
      .populate('comments.user', 'fullName email semester department isAdmin');

    res.json(posts);
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Server error retrieving posts', error: error.message });
  }
};

// @desc    Toggle upvote on a post
// @route   PUT /api/posts/:id/upvote
// @access  Private
exports.upvotePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const userId = req.user._id.toString();
    const upvotesStr = post.upvotes.map(id => id.toString());

    if (upvotesStr.includes(userId)) {
      // Remove upvote
      post.upvotes = post.upvotes.filter(id => id.toString() !== userId);
    } else {
      // Add upvote
      post.upvotes.push(req.user._id);
    }

    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate('user', 'fullName email semester department isAdmin')
      .populate('comments.user', 'fullName email semester department isAdmin');

    res.json(updatedPost);
  } catch (error) {
    console.error('Upvote post error:', error);
    res.status(500).json({ message: 'Server error upvoting post', error: error.message });
  }
};

// @desc    Add a comment to a post
// @route   POST /api/posts/:id/comment
// @access  Private
exports.commentPost = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Comment content cannot be empty' });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push({
      user: req.user._id,
      content
    });

    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate('user', 'fullName email semester department isAdmin')
      .populate('comments.user', 'fullName email semester department isAdmin');

    res.status(201).json(updatedPost);
  } catch (error) {
    console.error('Comment post error:', error);
    res.status(500).json({ message: 'Server error adding comment', error: error.message });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Only allow the author or an admin to delete
    if (post.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: 'Post deleted successfully', postId: req.params.id });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Server error deleting post', error: error.message });
  }
};
