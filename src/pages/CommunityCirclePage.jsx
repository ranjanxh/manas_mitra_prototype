// src/pages/CommunityCirclePage.jsx
import React, { useState, useMemo } from 'react';
import { Heart, MessageSquare, MoreVertical, Send, TrendingUp, Clock, Users, Shield, Flag, ThumbsUp, Filter, X } from 'lucide-react';

// --- Mock Data ---
const mockPosts = [
  { id: 1, author: "Anonymous Butterfly", avatar: "bg-purple-100 text-purple-600", timestamp: "2 hours ago", content: "I've been struggling with exam anxiety lately. The pressure feels overwhelming. Has anyone found techniques that actually work?", supportCount: 12, commentCount: 8, tags: ["#Exams", "#Anxiety"], isSupported: false },
  { id: 2, author: "Anonymous Phoenix", avatar: "bg-orange-100 text-orange-600", timestamp: "4 hours ago", content: "Just wanted to share something positive - I finally reached out to a counselor this week. It was scary but relieving. To anyone hesitating, you're not alone. 💙", supportCount: 28, commentCount: 15, tags: ["#MentalHealth", "#Support"], isSupported: true },
  { id: 3, author: "Anonymous Owl", avatar: "bg-blue-100 text-blue-600", timestamp: "6 hours ago", content: "Living in the hostel can be tough when you need quiet time to recharge. Any tips for creating a peaceful space?", supportCount: 7, commentCount: 12, tags: ["#HostelLife", "#SelfCare"], isSupported: false }
];

// --- Sub-Components ---

const CreatePost = ({ onPost }) => {
  const [postContent, setPostContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (postContent.trim()) {
      onPost(postContent);
      setPostContent('');
      setIsExpanded(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium">A</div>
        <div className="flex-1">
          <textarea value={postContent} onChange={(e) => setPostContent(e.target.value)} onFocus={() => setIsExpanded(true)} className={`w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${isExpanded ? 'h-32' : 'h-12'}`} placeholder="Share what's on your mind... (Your post will be anonymous)" />
          {isExpanded && (
            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-gray-500"><Shield className="w-3 h-3 inline mr-1" />Your identity is protected.</div>
              <div className="flex space-x-2">
                <button onClick={() => { setIsExpanded(false); setPostContent(''); }} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                <button onClick={handleSubmit} disabled={!postContent.trim()} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 transition-colors flex items-center"><Send className="w-4 h-4 mr-1" />Post</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FilterButton = ({ children, active, onClick, icon: Icon }) => (
  <button onClick={onClick} className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
    {Icon && <Icon className="w-3 h-3 mr-1" />}
    {children}
  </button>
);

const PostCard = ({ post, onSupport, onComment }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4 hover:shadow-sm transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${post.avatar}`}>{post.author.split(' ')[1]?.[0] || 'A'}</div>
        <div>
          <div className="font-medium text-gray-900">{post.author}</div>
          <div className="text-sm text-gray-500 flex items-center"><Clock className="w-3 h-3 mr-1" />{post.timestamp}</div>
        </div>
      </div>
      <button className="p-1 text-gray-400 hover:text-gray-600"><MoreVertical className="w-4 h-4" /></button>
    </div>
    <p className="text-gray-800 leading-relaxed mb-4">{post.content}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {post.tags.map(tag => <span key={tag} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">{tag}</span>)}
    </div>
    <div className="flex items-center space-x-6 pt-4 border-t border-gray-100">
      <button onClick={() => onSupport(post.id)} className={`flex items-center space-x-2 text-sm transition-colors ${post.isSupported ? 'text-red-600' : 'text-gray-500 hover:text-red-600'}`}>
        <Heart className={`w-4 h-4 ${post.isSupported ? 'fill-current' : ''}`} />
        <span>{post.supportCount}</span>
      </button>
      <button onClick={() => onComment(post.id)} className="flex items-center space-x-2 text-sm text-gray-500 hover:text-blue-600">
        <MessageSquare className="w-4 h-4" />
        <span>{post.commentCount}</span>
      </button>
    </div>
  </div>
);

// --- Main Community Circle Page Component ---

const CommunityCirclePage = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [sortBy, setSortBy] = useState('Latest');
  const sortOptions = ['Latest', 'Trending', 'Most Supported'];

  const handleCreatePost = (content) => {
    const newPost = { id: Date.now(), author: "Anonymous Lion", avatar: "bg-yellow-100 text-yellow-600", timestamp: "Just now", content, supportCount: 0, commentCount: 0, tags: [], isSupported: false };
    setPosts([newPost, ...posts]);
  };

  const handleSupport = (postId) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, isSupported: !post.isSupported, supportCount: post.isSupported ? post.supportCount - 1 : post.supportCount + 1 } : post));
  };

  const handleComment = (postId) => {
    alert(`Opening comments for post ${postId}`);
  };

  const sortedPosts = useMemo(() => {
    const sorted = [...posts];
    if (sortBy === 'Trending') return sorted.sort((a, b) => (b.supportCount + b.commentCount) - (a.supportCount + a.commentCount));
    if (sortBy === 'Most Supported') return sorted.sort((a, b) => b.supportCount - a.supportCount);
    return sorted; // Default is Latest (already sorted by prepending new posts)
  }, [posts, sortBy]);

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Circle</h1>
        <p className="text-gray-600">A safe, anonymous space to share experiences and support each other.</p>
      </div>

      <CreatePost onPost={handleCreatePost} />

      <div className="flex items-center space-x-4 mb-6">
        <span className="text-sm font-medium text-gray-700">Sort by:</span>
        <div className="flex space-x-2">
          {sortOptions.map(option => <FilterButton key={option} active={sortBy === option} onClick={() => setSortBy(option)} icon={option === 'Latest' ? Clock : option === 'Trending' ? TrendingUp : ThumbsUp}>{option}</FilterButton>)}
        </div>
      </div>

      <div className="space-y-4">
        {sortedPosts.map(post => <PostCard key={post.id} post={post} onSupport={handleSupport} onComment={handleComment} />)}
      </div>
    </div>
  );
};

export default CommunityCirclePage;