import { html } from 'lit';
import Posts from '../components/Posts';

/**
 * Blog page component that displays a list of posts
 * @returns {import('lit-html').TemplateResult}
 */
const Blog = () => {
  return html`
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <!-- Hero Section -->
      <div class="bg-indigo-700 dark:bg-indigo-900 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Our Blog
          </h1>
          <p class="mt-6 max-w-3xl mx-auto text-xl text-indigo-100">
            Discover the latest news, updates, and insights from our team.
          </p>
        </div>
      </div>

      <!-- Posts Section -->
      <div class="py-12">${Posts()}</div>
    </div>
  `;
};

export default Blog;
