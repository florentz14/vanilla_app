import { html } from 'lit';
import postsData from '../data/post.json';
import { navigate } from '../router';

/**
 * Formats the post body to handle newlines and create paragraphs
 * @param {string} text - The post body text
 * @returns {import('lit-html').TemplateResult}
 */
const formatPostContent = (text) => {
  // Split by double newlines to create paragraphs
  const paragraphs = text.split('\n\n');

  return html`
    ${paragraphs.map((paragraph) =>
      paragraph.trim()
        ? html`<p class="mb-4">${paragraph.replace(/\n/g, '<br>')}</p>`
        : html`<br />`
    )}
  `;
};

/**
 * PostDetail component that displays a single blog post
 * @param {Object} params - Route parameters
 * @param {string} params.id - The ID of the post to display
 * @returns {import('lit-html').TemplateResult}
 */
const PostDetail = (params) => {
  const postId = parseInt(params.id, 10);
  const post = postsData.find((p) => p.id === postId);

  // If post not found, show error message
  if (!post) {
    return html`
      <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 py-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Post Not Found
              </h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                The requested post could not be found.
              </p>
            </div>
            <div class="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
              <button
                @click=${() => navigate('/blog')}
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back to Blog
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  return html`
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <!-- Back button -->
      <div class="bg-white dark:bg-gray-800 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="py-4">
            <button
              @click=${() => navigate('/blog')}
              class="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <svg
                class="h-5 w-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              Back to Blog
            </button>
          </div>
        </div>
      </div>

      <!-- Post Header -->
      <div class="bg-white dark:bg-gray-800 shadow-sm">
        <div class="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
          <span
            class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
          >
            Post #${post.id}
          </span>
          <h1
            class="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl sm:tracking-tight lg:text-5xl"
          >
            ${post.title}
          </h1>
          <div
            class="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400"
          >
            <span>By User #${post.userId}</span>
            <span class="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
            <time datetime="2023-07-20">July 20, 2023</time>
          </div>
        </div>
      </div>

      <!-- Post Content -->
      <div class="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div class="prose dark:prose-invert max-w-none">${formatPostContent(post.body)}</div>

        <!-- Comments Section -->
        <div class="mt-16">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">Comments</h2>
            <button
              @click=${() => {
                // This would open a comment form in a real app
                console.log('Add comment clicked');
              }}
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Comment
            </button>
          </div>

          <div class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <p class="text-center text-gray-500 dark:text-gray-400">
                Comments functionality coming soon!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

export default PostDetail;
