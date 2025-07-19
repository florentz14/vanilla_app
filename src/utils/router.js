class Router {
  constructor(routes = []) {
    this.routes = routes;
    this.currentRoute = null;
    this.init();
  }

  init() {
    // Handle initial route
    window.addEventListener('popstate', () => this.handleRouteChange());
    
    // Handle link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-router]');
      if (link) {
        e.preventDefault();
        this.navigate(link.getAttribute('href'));
      }
    });
    
    // Handle initial route
    this.handleRouteChange();
  }

  navigate(path) {
    window.history.pushState({}, '', path);
    this.handleRouteChange();
  }

  handleRouteChange() {
    const path = window.location.pathname;
    const route = this.routes.find(r => r.path === path) || 
                 this.routes.find(r => r.path === '*');
    
    if (route) {
      if (this.currentRoute && this.currentRoute.onLeave) {
        this.currentRoute.onLeave();
      }
      
      this.currentRoute = route;
      
      if (typeof route.onEnter === 'function') {
        route.onEnter();
      }
      
      // Notify the Navbar that the route has changed
      document.dispatchEvent(new CustomEvent('route-changed', { detail: { path } }));
      
      if (route.component) {
        const app = document.querySelector('#app');
        if (app) {
          // Pass the current path to the Layout component
          const layoutContent = route.component;
          app.innerHTML = layoutContent;
          this.updateActiveLinks(path);
        }
      }
    }
  }
  
  updateActiveLinks(currentPath = window.location.pathname) {
    document.querySelectorAll('a[data-router]').forEach(link => {
      const linkPath = link.getAttribute('href');
      const isActive = linkPath === currentPath;
      
      // Get base classes that should always be present
      const baseClasses = link.className
        .split(' ')
        .filter(c => !c.startsWith('border-') && 
                    !c.startsWith('text-') && 
                    !c.startsWith('hover:') &&
                    !['font-medium', 'active'].includes(c))
        .join(' ');
      
      // Set the new classes using our cn utility
      link.className = cn(
        baseClasses,
        {
          'border-indigo-500 text-gray-900 dark:text-white font-medium': isActive,
          'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white': !isActive
        }
      );
    });
  }
}

export default Router;
