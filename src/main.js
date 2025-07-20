import './style.css';
import { initRouter } from './router';
import { themeManager } from './utils/theme';

// Import Web Components
import './components'; // This will register all components

// Initialize theme manager
themeManager.init();

// Initialize the app
function initApp() {
  // Get the app container
  const app = document.getElementById('app');
  if (!app) {
    console.error('Could not find app element');
    return;
  }

  // Clear any existing content
  app.innerHTML = '';

  // Create a root element for our app
  const root = document.createElement('div');
  root.id = 'app-content';
  app.appendChild(root);

  try {
    // Initialize the router
    const router = initRouter(root);

    // Make router available globally for debugging
    window.router = router;

    console.log('App initialized successfully');
  } catch (error) {
    console.error('Failed to initialize router:', error);
    root.innerHTML = `
      <div class="p-4 bg-red-100 text-red-800 rounded">
        <h2 class="text-xl font-bold mb-2">Application Error</h2>
        <p>Failed to initialize the application. Please try refreshing the page.</p>
        <p class="text-sm mt-2">${error.message}</p>
      </div>
    `;
  }
}

// Start the app when the DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  // DOM is already ready, initialize immediately
  initApp();
}

// Handle theme changes
document.addEventListener('theme-changed', () => {
  // Re-render the current route when theme changes
  if (window.router) {
    window.router.render(window.location.pathname);
  }
});
