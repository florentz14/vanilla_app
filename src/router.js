import { Router } from '@vaadin/router';
import { render } from 'lit';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './components/NotFound';
import Layout from './components/Layout';

let router = null;
let currentOutlet = null;

// Create a wrapper for lit-html components
function createView(component, title = 'Vanilla App') {
  return (context) => {
    // Update document title
    document.title = `${title} | Vanilla App`;

    // Get the app container
    const app = document.getElementById('app');
    if (!app) return null;

    // Create or get the outlet container
    let outlet = document.getElementById('router-outlet');
    if (!outlet) {
      outlet = document.createElement('div');
      outlet.id = 'router-outlet';
      app.appendChild(outlet);
    }

    // Create the layout with the component
    const layout = Layout(component, context.pathname);

    // Render the layout to the outlet container
    render(layout, outlet);

    return outlet;
  };
}

// Define routes
export const routes = [
  {
    path: '/',
    action: createView(Home, 'Home'),
  },
  {
    path: '/about',
    action: createView(About, 'About'),
  },
  {
    path: '/blog',
    action: createView(Blog, 'Blog'),
  },
  {
    path: '/blog/:id',
    action: (context) => {
      const postId = context.params.id;
      return createView(() => PostDetail(postId), 'Post Detail')(context);
    },
  },
  {
    path: '/login',
    action: createView(Login, 'Sign In'),
  },
  {
    path: '/register',
    action: createView(Register, 'Create Account'),
  },
  {
    path: '/dashboard',
    action: createView(Dashboard, 'Dashboard'),
  },
  {
    path: '(.*)',
    action: createView(NotFound, 'Not Found'),
  },
];

// Initialize the router
export function initRouter(outlet) {
  // Create router instance
  router = new Router(outlet);

  // Set up routes
  router.setRoutes(routes);

  // Return the router instance
  return router;
}

// Navigation helper
export const navigate = (path) => {
  if (router) {
    router.render(path);
  } else {
    window.location.href = path;
  }
};

// Redirect helper
export const redirect = (from, to) => ({
  path: from,
  redirect: to,
});
