import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, ThumbsUp, Trash2, Send, AlertCircle, MessageCircle, Info } from 'lucide-react';
import { getApiUrl } from '../config';
import './CommunityFeed.css';

const CommunityFeed = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('general');
  const [commentTexts, setCommentTexts] = useState({});
  const [expandedComments, setExpandedComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchCurrentUser();
    fetchPosts();
  }, [navigate]);

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(getApiUrl('/api/auth/profile'), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data);
      }
    } catch (err) {
      console.error('Error fetching current user:', err);
    }
  };

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(getApiUrl('/api/posts'), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch posts');
      }
      setPosts(data);
    } catch (err) {
      setError(err.message || 'Error fetching feed');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setPosting(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(getApiUrl('/api/posts'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ content, tag })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to create post');
      }
      setPosts(prev => [data, ...prev]);
      setContent('');
      setTag('general');
    } catch (err) {
      setError(err.message || 'Error publishing post');
    } finally {
      setPosting(false);
    }
  };

  const handleUpvote = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(getApiUrl(`/api/posts/${postId}/upvote`), {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setPosts(prev => prev.map(p => p._id === postId ? data : p));
      }
    } catch (err) {
      console.error('Upvote error:', err);
    }
  };

  const handleAddComment = async (e, postId) => {
    e.preventDefault();
    const commentText = commentTexts[postId] || '';
    if (!commentText.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(getApiUrl(`/api/posts/${postId}/comment`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ content: commentText })
      });
      const data = await res.json();
      if (res.ok) {
        setPosts(prev => prev.map(p => p._id === postId ? data : p));
        setCommentTexts(prev => ({ ...prev, [postId]: '' }));
      }
    } catch (err) {
      console.error('Comment error:', err);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(getApiUrl(`/api/posts/${postId}`), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setPosts(prev => prev.filter(p => p._id !== postId));
      } else {
        alert(data.message || 'Failed to delete post');
      }
    } catch (err) {
      console.error('Delete post error:', err);
    }
  };

  const toggleComments = (postId) => {
    setExpandedComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now - date) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const getTagColor = (postTag) => {
    switch (postTag) {
      case 'bug': return 'tag-bug';
      case 'suggestion': return 'tag-suggestion';
      case 'question': return 'tag-question';
      default: return 'tag-general';
    }
  };

  const getAvatarBgColor = (name) => {
    const colors = [
      '#ef4444', '#f97316', '#f59e0b', '#10b981', 
      '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899'
    ];
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
    return colors[sum % colors.length];
  };

  return (
    <div className="feed-page-container">
      <div className="feed-layout">
        
        {/* Header Title */}
        <div className="feed-header">
          <h1>Community Feed</h1>
          <p>Share suggestions, ask questions, or report bugs to make TrashofCSE better!</p>
        </div>

        {error && (
          <div className="feed-error-banner">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Post Creator Box */}
        <div className="post-creator-card">
          <form onSubmit={handleCreatePost}>
            <textarea
              className="post-textarea"
              placeholder="What's on your mind? Share a suggestion or report a bug..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              maxLength={1000}
              required
            />
            
            <div className="post-creator-actions">
              {/* Tag selector pills */}
              <div className="tag-selector">
                <span className="selector-label">Tag:</span>
                {['general', 'bug', 'suggestion', 'question'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`tag-pill-btn ${tag === t ? 'active' : ''} ${t}`}
                    onClick={() => setTag(t)}
                  >
                    #{t}
                  </button>
                ))}
              </div>

              <button 
                type="submit" 
                className="post-submit-btn" 
                disabled={posting || !content.trim()}
              >
                {posting ? 'Posting...' : 'Publish'}
              </button>
            </div>
          </form>
        </div>

        {/* Posts Feed List */}
        {loading ? (
          <div className="feed-loading-state">
            <div className="loading-spinner"></div>
            <p>Loading discussions...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="feed-empty-state">
            <MessageCircle size={48} />
            <h3>No posts yet</h3>
            <p>Be the first to start a conversation in the community!</p>
          </div>
        ) : (
          <div className="posts-list">
            {posts.map((post) => {
              const isAuthor = currentUser && post.user && post.user.email === currentUser.email;
              const isAdmin = currentUser && currentUser.isAdmin;
              const hasUpvoted = currentUser && post.upvotes && post.upvotes.includes(currentUser._id);
              const authorName = post.user ? post.user.fullName : 'Anonymous';
              const avatarLetter = authorName.charAt(0).toUpperCase();

              return (
                <div key={post._id} className="post-card">
                  {/* Post Header */}
                  <div className="post-card-header">
                    <div 
                      className="author-avatar"
                      style={{ backgroundColor: getAvatarBgColor(authorName) }}
                    >
                      {avatarLetter}
                    </div>

                    <div className="author-details">
                      <div className="author-name-row">
                        <span className="author-name">{authorName}</span>
                        {post.user && post.user.isAdmin && (
                          <span className="admin-badge">Admin</span>
                        )}
                      </div>
                      
                      <div className="post-metadata">
                        {post.user && post.user.semester && (
                          <span className="sem-badge">{post.user.semester} Sem</span>
                        )}
                        {post.user && post.user.department && (
                          <span className="dept-badge">{post.user.department}</span>
                        )}
                        <span className="post-time">{formatTimeAgo(post.createdAt)}</span>
                      </div>
                    </div>

                    <div className="post-header-right">
                      <span className={`post-tag-badge ${getTagColor(post.tag)}`}>
                        #{post.tag}
                      </span>

                      {(isAuthor || isAdmin) && (
                        <button 
                          className="delete-post-btn" 
                          onClick={() => handleDeletePost(post._id)}
                          title="Delete Post"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="post-card-body">
                    <p>{post.content}</p>
                  </div>

                  {/* Post Footer Actions */}
                  <div className="post-card-footer">
                    <button 
                      className={`action-btn upvote-btn ${hasUpvoted ? 'active' : ''}`}
                      onClick={() => handleUpvote(post._id)}
                    >
                      <ThumbsUp size={16} />
                      <span>{post.upvotes ? post.upvotes.length : 0} Upvotes</span>
                    </button>

                    <button 
                      className={`action-btn comment-toggle-btn ${expandedComments[post._id] ? 'active' : ''}`}
                      onClick={() => toggleComments(post._id)}
                    >
                      <MessageSquare size={16} />
                      <span>{post.comments ? post.comments.length : 0} Comments</span>
                    </button>
                  </div>

                  {/* Comments Section (Expandable) */}
                  {expandedComments[post._id] && (
                    <div className="comments-section">
                      
                      {/* Comment Input */}
                      <form 
                        onSubmit={(e) => handleAddComment(e, post._id)} 
                        className="comment-form"
                      >
                        <input
                          type="text"
                          className="comment-input"
                          placeholder="Write a comment..."
                          value={commentTexts[post._id] || ''}
                          onChange={(e) => setCommentTexts(prev => ({ 
                            ...prev, 
                            [post._id]: e.target.value 
                          }))}
                          maxLength={500}
                          required
                        />
                        <button type="submit" className="comment-submit-btn">
                          <Send size={14} />
                        </button>
                      </form>

                      {/* Comments List */}
                      {post.comments && post.comments.length > 0 ? (
                        <div className="comments-list">
                          {post.comments.map((comment) => {
                            const commenterName = comment.user ? comment.user.fullName : 'Anonymous';
                            const commenterLetter = commenterName.charAt(0).toUpperCase();

                            return (
                              <div key={comment._id} className="comment-item">
                                <div 
                                  className="commenter-avatar"
                                  style={{ backgroundColor: getAvatarBgColor(commenterName) }}
                                >
                                  {commenterLetter}
                                </div>
                                <div className="comment-bubble">
                                  <div className="commenter-meta">
                                    <span className="commenter-name">{commenterName}</span>
                                    {comment.user && comment.user.isAdmin && (
                                      <span className="admin-badge gold">Admin</span>
                                    )}
                                    {comment.user && comment.user.semester && (
                                      <span className="comment-sem">{comment.user.semester} Sem</span>
                                    )}
                                    <span className="comment-time">{formatTimeAgo(comment.createdAt)}</span>
                                  </div>
                                  <p className="comment-content">{comment.content}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="no-comments-prompt">
                          <p>No comments yet. Start the discussion!</p>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default CommunityFeed;
