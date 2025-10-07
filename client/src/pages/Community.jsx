import { motion } from 'framer-motion';

const Community = () => {
  // Mock community posts
  const communityPosts = [
    {
      id: 1,
      title: 'Getting Started with MeTTa',
      author: 'johndoe',
      date: '2023-05-15',
      excerpt: 'A beginner\'s guide to writing your first MeTTa program...',
      replies: 12,
      views: 145
    },
    {
      id: 2,
      title: 'Advanced Pattern Matching',
      author: 'mettaexpert',
      date: '2023-05-10',
      excerpt: 'Exploring the powerful pattern matching capabilities in MeTTa...',
      replies: 8,
      views: 98
    },
    {
      id: 3,
      title: 'MeTTa in Production',
      author: 'devops_sam',
      date: '2023-05-05',
      excerpt: 'How we scaled MeTTa for our knowledge graph at scale...',
      replies: 15,
      views: 210
    },
  ];

  return (
    <motion.div 
      className="max-w-4xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Community</h1>
        <button className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
          New Post
        </button>
      </div>

      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {communityPosts.map((post, index) => (
          <motion.div 
            key={post.id}
            className="bg-black bg-opacity-50 backdrop-blur-sm rounded-xl p-6 hover:bg-opacity-70 transition-all cursor-pointer"
            whileHover={{ scale: 1.01, x: 5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-400 mb-3">{post.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <span>By {post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="text-center">
                  <div className="font-medium">{post.replies}</div>
                  <div className="text-gray-500 text-xs">Replies</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">{post.views}</div>
                  <div className="text-gray-500 text-xs">Views</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <button className="px-6 py-2 border border-white rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors">
          Load More
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Community;
