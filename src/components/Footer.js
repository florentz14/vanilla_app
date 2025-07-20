import { html } from 'lit-html';
import { navigate } from '../router';

/**
 * Footer component
 * @param {string} [currentPath='/'] - Current route path
 * @returns {import('lit-html').TemplateResult}
 */
export default function Footer(currentPath = '/') {
  const currentYear = new Date().getFullYear();

  // Social media links with their respective icons and URLs
  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/yourusername',
      icon: html`
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill-rule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clip-rule="evenodd"
          />
        </svg>
      `,
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/yourusername',
      icon: html`
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
          />
        </svg>
      `,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/yourusername',
      icon: html`
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
          />
        </svg>
      `,
    },
  ];

  // Handle navigation to external links
  const handleExternalLink = (e, url) => {
    e.preventDefault();
    // You can add analytics or other logic here
    console.log(`Navigating to ${url}`);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Quick links
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/posts' },
    { name: 'Contact', href: '/contact' },
  ];

  return html`
    <footer class="bg-gray-800 text-white">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- App info -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Vanilla App</h3>
            <p class="text-gray-300 text-sm">
              A modern, lightweight single-page application built with vanilla JavaScript and
              lit-html.
            </p>
            <div class="flex space-x-4">
              ${socialLinks.map(
                (link) => html`
                  <a
                    href=${link.href}
                    class="text-gray-400 hover:text-white transition-colors"
                    @click=${(e) => handleExternalLink(e, link.href)}
                    aria-label=${link.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span class="sr-only">${link.name}</span>
                    ${link.icon}
                  </a>
                `
              )}
            </div>
          </div>

          <!-- Quick links -->
          <div>
            <h3 class="text-lg font-semibold">Quick Links</h3>
            <ul class="mt-4 space-y-2">
              ${quickLinks.map(
                (link) => html`
                  <li>
                    <a
                      href=${link.href}
                      class="text-gray-300 hover:text-white transition-colors text-sm"
                      @click=${(e) => {
                        e.preventDefault();
                        if (link.href.startsWith('http')) {
                          window.open(link.href, '_blank', 'noopener,noreferrer');
                        } else {
                          navigate(link.href);
                        }
                      }}
                    >
                      ${link.name}
                    </a>
                  </li>
                `
              )}
            </ul>
          </div>

          <!-- Contact info -->
          <div>
            <h3 class="text-lg font-semibold">Contact</h3>
            <ul class="mt-4 space-y-2 text-sm text-gray-300">
              <li>
                Email:
                <a href="mailto:info@example.com" class="hover:text-white transition-colors"
                  >info@example.com</a
                >
              </li>
              <li>
                Phone:
                <a href="tel:+1234567890" class="hover:text-white transition-colors"
                  >+1 (234) 567-890</a
                >
              </li>
              <li>Address: 123 App Street, Web City</li>
            </ul>
          </div>
        </div>

        <!-- Copyright -->
        <div class="mt-12 pt-8 border-t border-gray-700">
          <p class="text-center text-sm text-gray-400">
            &copy; ${currentYear} Vanilla App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  `;
}

// Export as default and named export for better tree-shaking
export { Footer };
