import { html } from 'lit-html';
import { navigate } from '../router';

export default function NotFound() {
  const handleClick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return () => html`
    <div class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">Page not found</p>
        <a
          href="/"
          class="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors cursor-pointer"
          @click=${handleClick}
        >
          Go back home
        </a>
      </div>
    </div>
  `;
}
