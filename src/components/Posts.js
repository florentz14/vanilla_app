import { html } from 'lit';
import { navigate } from '../router';
import postsData from '../data/post.json';

// Format the post body to handle newlines in the JSON
const formatPostBody = (body) => {
  return body.replace(/\n/g, '<br>');
};

const Posts = () => {
  // Use local JSON data directly
  const posts = postsData;

  // If there are no posts, show a message
  if (!posts || posts.length === 0) {
    return html`
      <div class="p-6 max-w-4xl mx-auto">
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg
                class="h-5 w-5 text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-yellow-700">
                No posts available at the moment. Please check back later.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Success state with posts
  return html`
    <div class="p-6 max-w-4xl mx-auto">
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Our Blog</h1>
        <p class="mt-3 text-xl text-gray-500 dark:text-gray-300">Latest news and updates</p>
      </div>

      <div class="space-y-8">
        ${posts.map(
          (post) => html`
            <article
              class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg hover:-translate-y-1"
            >
              <div class="p-6">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    Post #${post.id}
                  </span>
                  <span class="text-sm text-gray-500 dark:text-gray-400">
                    User ID: ${post.userId}
                  </span>
                </div>

                <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">${post.title}</h2>

                <div class="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                  <p class="whitespace-pre-line">${formatPostBody(post.body)}</p>
                </div>

                <div class="mt-4 flex justify-end">
                  <button
                    class="inline-flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium focus:outline-none"
                    @click=${() => navigate(`/blog/${post.id}`)}
                  >
                    Read more
                    <svg
                      class="ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          `
        )}
      </div>
    </div>
  `;
};

export default Posts;
