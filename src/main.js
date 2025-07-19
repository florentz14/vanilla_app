import './style.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Router from './utils/router';
import { themeManager } from './utils/theme';
import NotFound from './components/NotFound';

// Initialize theme manager
themeManager.init();

// Define routes
const routes = [
  {
    path: '/',
    component: Layout(Home(), 'Home'),
  },
  {
    path: '/about',
    component: Layout(About(), 'About'),
  },
  {
    path: '*',
    component: Layout(NotFound(), '404')
  }
];

// Initialize router
const router = new Router(routes);

// Export router for programmatic navigation
export { router };
