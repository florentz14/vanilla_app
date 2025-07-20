class Router {
  constructor(routes = []) {
    this.routes = routes;
    this.currentRoute = null;
    this.rootElement = document.getElementById('app');
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
        const path = link.getAttribute('href');
        this.navigate(path);
      }
    });

    // Handle initial route
    this.handleRouteChange();
  }

  navigate(path) {
    window.history.pushState({}, '', path);
    this.handleRouteChange();
  }

  async handleRouteChange() {
    const path = window.location.pathname;
    let route = this.findMatchingRoute(path);

    if (!route) {
      route = this.routes.find((r) => r.path === '*');
      if (!route) return;
    }

    // If we have a previous route with a leave handler, call it
    if (this.currentRoute && this.currentRoute.onLeave) {
      await this.currentRoute.onLeave();
    }

    // Update current route
    this.currentRoute = route;

    // If the route has an enter handler, call it
    if (route.onEnter) {
      await route.onEnter();
    }

    // Render the route component
    if (route.component) {
      const content = typeof route.component === 'function' ? route.component() : route.component;

      // Update the app content
      this.rootElement.innerHTML = '';

      if (typeof content === 'string') {
        this.rootElement.innerHTML = content;
      } else if (content instanceof HTMLElement) {
        this.rootElement.appendChild(content);
      } else if (content && content.nodeType === Node.ELEMENT_NODE) {
        this.rootElement.appendChild(content);
      } else if (content && content.template) {
        // Handle lit-html templates
        content.template.then((template) => {
          this.rootElement.innerHTML = '';
          template();
        });
      } else if (content instanceof Promise) {
        // Handle async components
        content.then((component) => {
          this.rootElement.innerHTML = '';
          if (typeof component === 'string') {
            this.rootElement.innerHTML = component;
          } else if (component instanceof HTMLElement) {
            this.rootElement.appendChild(component);
          } else if (component && component.template) {
            component.template.then((template) => template());
          }
        });
      }
    }

    // Update active link in navigation
    this.updateActiveLinks(path);
  }

  updateActiveLinks(currentPath = window.location.pathname) {
    document.querySelectorAll('a[data-router]').forEach((link) => {
      const linkPath = link.getAttribute('href');
      const isActive = linkPath === currentPath;

      // Get base classes that should always be present
      const baseClasses = link.className
        .split(' ')
        .filter(
          (c) =>
            !c.startsWith('border-') &&
            !c.startsWith('text-') &&
            !c.startsWith('hover:') &&
            !['font-medium', 'active'].includes(c)
        )
        .join(' ');

      // Set the new classes using our cn utility
      link.className = cn(baseClasses, {
        'border-indigo-500 text-gray-900 dark:text-white font-medium': isActive,
        'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white':
          !isActive,
      });
    });
  }
}

export default Router;
