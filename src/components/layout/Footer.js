import { html, css } from 'lit';
import { BaseElement } from '../base/BaseElement';
//import { classMap } from 'lit/directives/class-map.js';

export class Footer extends BaseElement {
  static get properties() {
    return {
      ...super.properties,
      currentYear: { type: Number, state: true },
      socialLinks: { type: Array, state: true },
      quickLinks: { type: Array, state: true },
      contactInfo: { type: Object, state: true },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          --footer-bg: theme('colors.gray.800');
          --footer-text: theme('colors.white');
          --footer-link-hover: theme('colors.gray.300');
          --footer-divider: theme('colors.gray.700');
        }

        .footer-container {
          background-color: var(--footer-bg);
          color: var(--footer-text);
          padding: 3rem 1rem;
        }

        .footer-content {
          max-width: 80rem;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .footer-content {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .footer-section h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .footer-section p {
          color: theme('colors.gray.300');
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .social-link {
          color: theme('colors.gray.400');
          transition: color 0.2s ease-in-out;
        }

        .social-link:hover {
          color: var(--footer-link-hover);
        }

        .social-link svg {
          width: 1.5rem;
          height: 1.5rem;
        }

        .quick-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .quick-link a {
          color: theme('colors.gray.300');
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s ease-in-out;
        }

        .quick-link a:hover {
          color: var(--footer-link-hover);
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          color: theme('colors.gray.300');
          font-size: 0.875rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .contact-item svg {
          width: 1.25rem;
          height: 1.25rem;
          flex-shrink: 0;
        }

        .footer-bottom {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--footer-divider);
          text-align: center;
          font-size: 0.875rem;
          color: theme('colors.gray.400');
        }

        /* Dark mode adjustments */
        @media (prefers-color-scheme: dark) {
          :host {
            --footer-bg: theme('colors.gray.900');
            --footer-text: theme('colors.gray.100');
            --footer-link-hover: theme('colors.gray.200');
            --footer-divider: theme('colors.gray.700');
          }
        }
      `,
    ];
  }

  constructor() {
    super();
    this.currentYear = new Date().getFullYear();
    this.socialLinks = [
      {
        name: 'GitHub',
        href: 'https://github.com/yourusername',
        icon: html`
          <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
          <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
          <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
            />
          </svg>
        `,
      },
    ];

    this.quickLinks = [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
    ];

    this.contactInfo = {
      email: 'contact@example.com',
      phone: '+1 (555) 123-4567',
      address: '1234 Main St, City, Country',
    };
  }

  _handleExternalLink(e, url) {
    e.preventDefault();
    console.log(`Navigating to ${url}`);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  render() {
    return html`
      <footer class="footer-container">
        <div class="footer-content">
          <!-- App Info -->
          <div class="footer-section">
            <h3>Vanilla App</h3>
            <p>
              A modern, lightweight single-page application built with vanilla JavaScript and Web
              Components.
            </p>
            <div class="social-links">
              ${this.socialLinks.map(
                (link) => html`
                  <a
                    href="${link.href}"
                    class="social-link"
                    @click=${(e) => this._handleExternalLink(e, link.href)}
                    aria-label="${link.name}"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ${link.icon}
                  </a>
                `
              )}
            </div>
          </div>

          <!-- Quick Links -->
          <div class="footer-section">
            <h3>Quick Links</h3>
            <ul class="quick-links">
              ${this.quickLinks.map(
                (link) => html`
                  <li class="quick-link">
                    <a href="${link.href}" data-router>${link.name}</a>
                  </li>
                `
              )}
            </ul>
          </div>

          <!-- Contact Info -->
          <div class="footer-section">
            <h3>Contact Us</h3>
            <div class="contact-info">
              <div class="contact-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>${this.contactInfo.email}</span>
              </div>
              <div class="contact-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>${this.contactInfo.phone}</span>
              </div>
              <div class="contact-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>${this.contactInfo.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; ${this.currentYear} Vanilla App. All rights reserved.</p>
        </div>
      </footer>
    `;
  }
}

// Register the component
customElements.define('app-footer', Footer);

export default Footer;
