// NavLink component as a string template
const NavLink = (props, children) => {
  const { href, exact = false, className = '', ...rest } = props;
  const currentPath = window.location.pathname;
  
  // Determine if the link is active based on exact prop
  let isActive = false;
  if (exact === true || exact === 'true') {
    // For exact matches (like Home)
    isActive = currentPath === href;
  } else if (href === '/') {
    // Special case for home to prevent partial matches
    isActive = currentPath === '/';
  } else {
    // For other links, check if current path starts with the href
    isActive = currentPath.startsWith(href);
  }

  // Base classes for all nav links with animations
  const baseClasses = 'transition-all duration-300 ease-in-out cursor-pointer hover:scale-105';
  
  // Default variant (for regular navigation)
  const defaultVariantClasses = `inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
    isActive 
      ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-200 border-b-2 border-indigo-500 dark:border-indigo-400 shadow-sm' 
      : 'text-gray-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50 hover:text-gray-700 dark:hover:text-white border-b-2 border-transparent hover:border-gray-300 dark:hover:border-gray-500'
  } hover:shadow-md hover:-translate-y-0.5`;
  
  // Mobile variant with animations
  const mobileVariantClasses = `block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-300 ${
    isActive 
      ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 dark:border-indigo-400 text-indigo-700 dark:text-indigo-100 transform translate-x-1' 
      : 'border-transparent text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50 hover:translate-x-1 hover:text-gray-800 dark:hover:text-white'
  }`;
  
  // Determine which variant to use
  const isMobile = className.includes('mobile-variant');
  const linkClasses = [
    baseClasses,
    isMobile ? mobileVariantClasses : defaultVariantClasses,
    className.replace('mobile-variant', '')
  ].filter(Boolean).join(' ');
  
  // Build attributes string
  const attributes = Object.entries(rest)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');
  
  // Return the HTML string
  return `
    <a 
      href="${href}" 
      class="${linkClasses}"
      data-router
      aria-current="${isActive ? 'page' : 'false'}"
      ${attributes}
    >
      ${children || ''}
    </a>
  `;
};

// Helper function to close mobile menu
const closeMobileMenu = () => {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden');
  }
};

// Helper function to toggle mobile menu
const toggleMobileMenu = () => {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.toggle('hidden');
  }
};

// Function to handle route changes
const handleRouteChange = () => {
  // This will force a re-render when the route changes
  const event = new CustomEvent('render-navbar');
  document.dispatchEvent(event);
};

// Listen for route changes from the router
document.addEventListener('route-changed', handleRouteChange);

// Function to update the theme icon based on current theme
const updateThemeIcon = () => {
  const theme = localStorage.getItem('theme') || 'system';
  const iconMap = {
    'light': '☀️',
    'dark': '🌙',
    'system': '🖥️'
  };
  const themeToggle = document.querySelector('[data-theme-toggle]');
  if (themeToggle) {
    themeToggle.textContent = iconMap[theme] || '🌙';
  }
};

// Initialize theme icon on load
document.addEventListener('DOMContentLoaded', updateThemeIcon);

// Listen for theme changes
document.addEventListener('theme-changed', updateThemeIcon);

export default function Navbar() {
  const links = [
    { path: '/', label: 'Home', exact: true },
    { path: '/about', label: 'About' },
  ];

  // Add click handlers after render and set up route change listener
  setTimeout(() => {
    // Mobile menu links
    document.querySelectorAll('#mobile-menu a[data-router]').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
    
    // Mobile menu toggle button
    const menuButton = document.querySelector('[data-mobile-menu-button]');
    if (menuButton) {
      menuButton.addEventListener('click', toggleMobileMenu);
    }

    // Listen for route changes from the router
    window.addEventListener('popstate', handleRouteChange);
    document.addEventListener('render-navbar', handleRouteChange);
    
    // Clean up event listeners when component is unmounted
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      document.removeEventListener('render-navbar', handleRouteChange);
    };
  }, 0);

  // Render navigation links
  const renderLinks = (isMobile = false) => {
    return links.map(link => 
      NavLink(
        {
          href: link.path,
          exact: link.exact,
          class: isMobile ? 'mobile-variant' : 'flex items-center'
        },
        link.label
      )
    ).join('');
  };

  // Render brand link with NavLink and animations
  const brandLink = NavLink(
    {
      href: '/',
      exact: true,
      class: 'text-xl font-bold flex items-center group transition-all duration-300 hover:scale-105',
      'aria-label': 'Home'
    },
    `
      <span class="mr-2 inline-block group-hover:animate-bounce">✨</span>
      <span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
        My App
      </span>
    `
  );

  return `
    <header class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm sticky top-0 z-50 animate-fade-in">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <div class="flex-shrink-0">
            ${brandLink}
          </div>
          
          <nav class="hidden md:flex space-x-8">
            ${renderLinks(false)}
          </nav>
          
          <div class="flex items-center space-x-4">
            <button 
              type="button" 
              class="p-2 rounded-md text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-300 focus:outline-none text-2xl transition-all focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 cursor-pointer"
              data-theme-toggle
              aria-label="Toggle theme"
              title="Toggle theme (Current: System)"
            >
              <span class="theme-icon">🖥️</span>
            </button>
            
            <!-- Mobile menu button -->
            <button 
              type="button" 
              class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
              data-mobile-menu-button
              aria-controls="mobile-menu" 
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="sr-only">Open main menu</span>
              <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Mobile menu with smooth animations -->
      <div class="md:hidden hidden transition-all duration-300 ease-in-out transform" id="mobile-menu">
        <div class="pt-2 pb-3 space-y-1 animate-slide-in">
          ${renderLinks(true)}
        </div>
      </div>
    </header>
  `;
}