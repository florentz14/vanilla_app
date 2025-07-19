import { cn } from '../utils/classNames';

/**
 * A navigation link component that handles active states and consistent styling
 * @param {Object} props - Component props
 * @param {string} props.href - The URL to navigate to
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean|string} [props.exact] - If true, only match exact path
 * @param {string} [props.children] - Link content
 * @returns {string} HTML string for the navigation link
 */
const NavLink = ({
  href,
  className = '',
  exact = false,
  children = '',
  ...rest
}) => {
  // Convert exact to boolean if it's a string
  const isExact = exact === true || exact === 'true';
  
  // Get current path without query parameters
  const currentPath = window.location.pathname;
  
  // Determine if the link is active
  const isActive = isExact
    ? currentPath === href
    : href === '/' 
      ? currentPath === '/'
      : currentPath.startsWith(href);
  
  // Base classes for all nav links
  const baseClasses = 'transition-colors cursor-pointer';
  
  // Default variant (for regular navigation)
  const defaultVariantClasses = cn(
    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
    {
      'border-indigo-500 text-indigo-600 dark:text-indigo-300': isActive,
      'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white': !isActive
    }
  );
  
  // Mobile variant
  const mobileVariantClasses = cn(
    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium',
    {
      'bg-indigo-50 border-indigo-500 text-indigo-700 dark:bg-gray-700/50 dark:text-white': isActive,
      'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-700/50 dark:hover:text-white': !isActive
    }
  );
  
  // Determine which variant to use based on className
  const isMobile = className.includes('mobile-variant');
  const linkClasses = cn(
    baseClasses,
    isMobile ? mobileVariantClasses : defaultVariantClasses,
    className.replace('mobile-variant', '') // Remove the variant marker
  );
  
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
      ${children}
    </a>
  `;
};

export default NavLink;