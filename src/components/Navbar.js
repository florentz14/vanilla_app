import { html } from 'lit-html';
import { navigate } from '../router';
import { themeStore, authStore } from '../store/store';

/**
 * NavLink component for navigation
 * @param {Object} props - Component properties
 * @param {string} props.href - The URL to navigate to
 * @param {boolean} [props.exact] - Whether to match the href exactly
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.currentPath] - Current route path
 * @param {import('lit-html').TemplateResult} [props.children] - Child elements
 * @returns {import('lit-html').TemplateResult}
 */
const NavLink = (props) => {
  const { href, exact = false, className = '', currentPath = '/', children } = props;

  // Determine if the link is active based on exact prop
  const isActive = exact
    ? currentPath === href
    : href === '/'
      ? currentPath === '/'
      : currentPath.startsWith(href);

  // Base classes for all nav links with animations
  const baseClasses = 'transition-colors duration-200 ease-in-out cursor-pointer';

  // Default variant (for regular navigation)
  const defaultVariantClasses = isActive
    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-200 border-b-2 border-indigo-500 dark:border-indigo-400'
    : 'text-gray-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50 hover:text-gray-700 dark:hover:text-white border-b-2 border-transparent hover:border-gray-300 dark:hover:border-gray-500';

  // Mobile variant with animations
  const mobileVariantClasses = isActive
    ? 'bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-500 dark:border-indigo-400 text-indigo-700 dark:text-indigo-100'
    : 'border-transparent text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50 hover:text-gray-800 dark:hover:text-white';

  // Determine which variant to use
  const isMobile = className.includes('mobile-variant');
  const linkClasses = [
    baseClasses,
    isMobile
      ? `block pl-3 pr-4 py-2 text-base font-medium ${mobileVariantClasses}`
      : `inline-flex items-center px-3 py-2 text-sm font-medium ${defaultVariantClasses}`,
    className.replace('mobile-variant', ''),
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (e) => {
    e.preventDefault();
    navigate(href);
  };

  return html`
    <a
      href=${href}
      class=${linkClasses}
      @click=${handleClick}
      aria-current=${isActive ? 'page' : 'false'}
    >
      ${children}
    </a>
  `;
};

/**
 * Navbar component
 * @param {string} [title='Vanilla App'] - The title to display in the navbar
 * @param {string} [currentPath='/'] - Current route path
 * @returns {import('lit-html').TemplateResult}
 */
export default function Navbar(title = 'Vanilla App', currentPath = '/') {
  // Navigation items
  const navItems = [
    { href: '/', text: 'Home', exact: true },
    { href: '/about', text: 'About' },
    { href: '/blog', text: 'Blog' },
  ];

  // Get auth state from store
  const { isAuthenticated, user } = authStore.getState();

  // Get current theme
  const currentTheme = themeStore.getState().theme;

  // Handle logout
  const handleLogout = (e) => {
    e.preventDefault();
    authStore.getState().logout();
    navigate('/login');
  };

  return html`
    <nav class="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <!-- Logo -->
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-gray-900 dark:text-white">${title}</h1>
            </div>

            <!-- Desktop Navigation -->
            <div class="hidden sm:ml-6 sm:flex sm:space-x-2">
              ${navItems.map((item) =>
                NavLink({
                  href: item.href,
                  exact: item.exact,
                  children: item.text,
                  currentPath,
                })
              )}
            </div>
          </div>

          <!-- Right side items -->
          <div class="hidden sm:ml-6 sm:flex sm:items-center space-x-2">
            <!-- Theme Toggle -->
            <button
              @click=${(e) => {
                e.preventDefault();
                themeStore.getState().toggleTheme();
              }}
              type="button"
              class="p-2 rounded-full text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-label="Toggle dark mode"
            >
              ${currentTheme === 'dark'
                ? html`
                    <!-- Sun icon for light mode -->
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  `
                : html`
                    <!-- Moon icon for dark mode -->
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                      ></path>
                    </svg>
                  `}
            </button>

            ${isAuthenticated
              ? html`
                  <!-- Profile dropdown -->
                  <div class="ml-3 relative">
                    <div>
                      <button
                        type="button"
                        class="flex items-center max-w-xs rounded-full bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        id="user-menu"
                        aria-expanded="false"
                        aria-haspopup="true"
                        @click=${(e) => {
                          e.preventDefault();
                          const menu = document.getElementById('user-menu-dropdown');
                          if (menu) menu.classList.toggle('hidden');
                        }}
                      >
                        <span class="sr-only">Open user menu</span>
                        <div
                          class="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center"
                        >
                          <span class="text-indigo-600 dark:text-indigo-300 font-medium">
                            ${user.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </span>
                        </div>
                      </button>
                    </div>
                    <!-- Dropdown menu -->
                    <div
                      id="user-menu-dropdown"
                      class="hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 py-1 z-50"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <div class="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p class="text-sm font-medium text-gray-800 dark:text-white">
                          ${user.name}
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-300 truncate">
                          ${user.email}
                        </p>
                      </div>
                      <a
                        href="/dashboard"
                        class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        @click=${(e) => {
                          e.preventDefault();
                          navigate('/dashboard');
                          const menu = document.getElementById('user-menu-dropdown');
                          if (menu) menu.classList.add('hidden');
                        }}
                      >
                        Dashboard
                      </a>
                      <a
                        href="/profile"
                        class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        @click=${(e) => {
                          e.preventDefault();
                          navigate('/profile');
                          const menu = document.getElementById('user-menu-dropdown');
                          if (menu) menu.classList.add('hidden');
                        }}
                      >
                        Your Profile
                      </a>
                      <a
                        href="/settings"
                        class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        @click=${(e) => {
                          e.preventDefault();
                          navigate('/settings');
                          const menu = document.getElementById('user-menu-dropdown');
                          if (menu) menu.classList.add('hidden');
                        }}
                      >
                        Settings
                      </a>
                      <div class="border-t border-gray-200 dark:border-gray-700"></div>
                      <a
                        href="#"
                        class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        @click=${handleLogout}
                      >
                        Sign out
                      </a>
                    </div>
                  </div>
                `
              : html`
                  <!-- Auth links -->
                  <div class="hidden sm:flex sm:items-center space-x-4">
                    <a
                      href="/login"
                      class="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white px-3 py-2 text-sm font-medium"
                      @click=${(e) => {
                        e.preventDefault();
                        navigate('/login');
                      }}
                    >
                      Sign in
                    </a>
                    <a
                      href="/register"
                      class="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium"
                      @click=${(e) => {
                        e.preventDefault();
                        navigate('/register');
                      }}
                    >
                      Sign up
                    </a>
                  </div>
                `}
          </div>

          <!-- Mobile menu button -->
          <div class="-mr-2 flex items-center sm:hidden">
            <button
              @click=${() => {
                const menu = document.getElementById('mobile-menu');
                if (menu) menu.classList.toggle('hidden');
              }}
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
              aria-label="Toggle menu"
            >
              <span class="sr-only">Open main menu</span>
              <!-- Heroicon name: menu -->
              <svg
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state -->
      <div id="mobile-menu" class="hidden sm:hidden bg-white dark:bg-gray-800">
        <div class="pt-2 pb-3 space-y-1">
          ${navItems.map((item) =>
            NavLink({
              href: item.href,
              exact: item.exact,
              children: item.text,
              className: 'mobile-variant',
              currentPath,
            })
          )}
          ${isAuthenticated
            ? html`
                <div class="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <a
                  href="/dashboard"
                  class="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                  @click=${(e) => {
                    e.preventDefault();
                    navigate('/dashboard');
                    const menu = document.getElementById('mobile-menu');
                    if (menu) menu.classList.add('hidden');
                  }}
                >
                  Dashboard
                </a>
                <a
                  href="/profile"
                  class="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                  @click=${(e) => {
                    e.preventDefault();
                    navigate('/profile');
                    const menu = document.getElementById('mobile-menu');
                    if (menu) menu.classList.add('hidden');
                  }}
                >
                  Your Profile
                </a>
                <a
                  href="/settings"
                  class="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                  @click=${(e) => {
                    e.preventDefault();
                    navigate('/settings');
                    const menu = document.getElementById('mobile-menu');
                    if (menu) menu.classList.add('hidden');
                  }}
                >
                  Settings
                </a>
                <a
                  href="#"
                  class="block pl-3 pr-4 py-2 text-base font-medium text-red-600 hover:bg-red-50 hover:text-red-800 dark:text-red-400 dark:hover:bg-gray-700"
                  @click=${(e) => {
                    e.preventDefault();
                    handleLogout(e);
                    const menu = document.getElementById('mobile-menu');
                    if (menu) menu.classList.add('hidden');
                  }}
                >
                  Sign out
                </a>
              `
            : html`
                <div class="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <a
                  href="/login"
                  class="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                  @click=${(e) => {
                    e.preventDefault();
                    navigate('/login');
                    const menu = document.getElementById('mobile-menu');
                    if (menu) menu.classList.add('hidden');
                  }}
                >
                  Sign in
                </a>
                <a
                  href="/register"
                  class="block pl-3 pr-4 py-2 text-base font-medium text-indigo-600 hover:bg-indigo-50 hover:text-indigo-800 dark:text-indigo-400 dark:hover:bg-gray-700"
                  @click=${(e) => {
                    e.preventDefault();
                    navigate('/register');
                    const menu = document.getElementById('mobile-menu');
                    if (menu) menu.classList.add('hidden');
                  }}
                >
                  Create account
                </a>
              `}
        </div>
      </div>
    </nav>
  `;
}

// Export as default and named export for better tree-shaking
export { Navbar };
