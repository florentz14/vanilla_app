import api from '../api';
import { postsService } from '../services/posts.service';

/**
 * Factory function to create a posts manager
 * @returns {Object} Posts manager with state and methods
 */
const createPostsManager = () => {
  // State
  let posts = [];
  let isLoading = false;
  let error = null;
  let subscribers = [];

  // Notify all subscribers of state changes
  const notifySubscribers = () => {
    subscribers.forEach((callback) =>
      callback({
        posts: [...posts],
        isLoading,
        error,
      })
    );
  };

  // Update state and notify subscribers
  const setState = (updates) => {
    if (updates.posts !== undefined) posts = updates.posts;
    if (updates.isLoading !== undefined) isLoading = updates.isLoading;
    if (updates.error !== undefined) error = updates.error;
    notifySubscribers();
  };

  // Fetch posts from the API
  const fetchPosts = async () => {
    setState({ isLoading: true, error: null });

    try {
      const response = await api.get('/posts');
      setState({
        posts: response.data,
        isLoading: false,
      });
    } catch (err) {
      console.error('Error fetching posts:', err);
      setState({
        error: err.message || 'Failed to fetch posts',
        isLoading: false,
      });
    }
  };

  // Subscribe to state changes
  const subscribe = (callback) => {
    subscribers.push(callback);
    // Send current state to new subscriber
    callback({
      posts: [...posts],
      isLoading,
      error,
    });

    // Return unsubscribe function
    return () => {
      subscribers = subscribers.filter((sub) => sub !== callback);
    };
  };

  // Initial fetch
  fetchPosts();

  return {
    getState: () => ({
      posts: [...posts],
      isLoading,
      error,
    }),
    subscribe,
    fetchPosts,
  };
};

// Create a singleton instance
export const postsManager = createPostsManager();

/**
 * Hook to access posts manager
 * @param {Function} onUpdate - Callback called when state changes
 * @returns {Object} Posts manager methods
 */
export const usePosts = (onUpdate) => {
  // Subscribe to updates if callback provided
  if (onUpdate && typeof onUpdate === 'function') {
    const unsubscribe = postsManager.subscribe(onUpdate);
    // Return cleanup function
    return () => {
      unsubscribe();
    };
  }

  // Just return the manager methods if no callback provided
  return {
    getState: postsManager.getState,
    fetchPosts: postsManager.fetchPosts,
  };
};
