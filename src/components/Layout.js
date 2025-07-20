import { html } from 'lit-html';
import Navbar from './Navbar';
import Footer from './Footer';

// Helper function to get the title case from path
const getTitle = (path) => {
  if (path === '/') return 'Home';
  if (path === '/about') return 'About';
  if (path === '/posts') return 'Blog';
  if (path.startsWith('/posts/')) return 'Post Details';
  if (path === '(.*)') return 'Not Found';
  return path.charAt(1).toUpperCase() + path.slice(2).replace(/-/g, ' ');
};

/**
 * Layout component that wraps page content with consistent structure
 * @param {Function|string} content - The main content to render
 * @param {string} currentPath - Current route path
 * @returns {import('lit-html').TemplateResult}
 */
export default function Layout(content = '', currentPath = '/') {
  const title = getTitle(currentPath);

  // If content is a function, call it with the current path
  const contentTemplate = typeof content === 'function' ? content(currentPath) : content;

  return html`
    <div
      class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200"
    >
      ${Navbar(title, currentPath)}
      <main class="flex-grow container mx-auto px-4 py-8">${contentTemplate}</main>
      ${Footer(currentPath)}
    </div>
  `;
}

// Export as default and named export for better tree-shaking
export { Layout };
