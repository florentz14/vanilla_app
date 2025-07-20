import { html, css } from 'lit';
import { BaseElement } from '../base/BaseElement';

export class Card extends BaseElement {
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      subtitle: { type: String },
      image: { type: String },
      imageAlt: { type: String, attribute: 'image-alt' },
      shadow: { type: Boolean, reflect: true },
      hoverable: { type: Boolean, reflect: true },
      bordered: { type: Boolean, reflect: true },
      rounded: {
        type: String,
        reflect: true,
        converter: (value) => value || 'md', // sm, md, lg, xl, 2xl, full
      },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          --card-bg: var(--color-white, #ffffff);
          --card-text: var(--color-gray-800, #1f2937);
          --card-subtext: var(--color-gray-600, #4b5563);
          --card-border: var(--color-gray-200, #e5e7eb);
          --card-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
          --card-hover-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
          --card-padding: 1.25rem;

          /* Dark mode variables - will be overridden by media query if needed */
          --dark-card-bg: var(--color-gray-800, #1f2937);
          --dark-card-text: var(--color-gray-100, #f3f4f6);
          --dark-card-subtext: var(--color-gray-300, #d1d5db);
          --dark-card-border: var(--color-gray-700, #374151);
          --dark-card-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
          --dark-card-hover-shadow:
            0 20px 25px -5px rgb(0 0 0 / 0.25), 0 8px 10px -6px rgb(0 0 0 / 0.1);
        }

        .card {
          background-color: var(--card-bg);
          color: var(--card-text);
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
          /* Smooth transition for theme changes */
          transition:
            background-color 0.3s ease,
            color 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease;
        }

        :host([bordered]) .card {
          border: 1px solid var(--card-border);
          transition: border-color 0.3s ease;
        }

        :host([shadow]) .card {
          box-shadow: var(--card-shadow);
          transition: box-shadow 0.3s ease;
        }

        :host([hoverable]) .card {
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            background-color 0.3s ease,
            color 0.3s ease,
            border-color 0.3s ease;
        }

        :host([hoverable]:hover) .card {
          transform: translateY(-2px);
          box-shadow: var(--card-hover-shadow);
        }

        .card-image {
          width: 100%;
          height: auto;
          display: block;
        }

        .card-body {
          padding: var(--card-padding);
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
          color: var(--card-text);
          transition: color 0.3s ease;
        }

        .card-subtitle {
          color: var(--card-subtext);
          font-size: 0.875rem;
          margin: 0 0 1rem 0;
          transition: color 0.3s ease;
        }

        .card-content {
          margin-bottom: 1rem;
          flex: 1;
        }

        .card-footer {
          padding: 0.75rem var(--card-padding) var(--card-padding);
          margin-top: auto;
          border-top: 1px solid var(--card-border);
        }

        /* Rounded variants */
        :host([rounded='sm']) .card {
          border-radius: 0.25rem;
        }
        :host([rounded='md']) .card {
          border-radius: 0.375rem;
        }
        :host([rounded='lg']) .card {
          border-radius: 0.5rem;
        }
        :host([rounded='xl']) .card {
          border-radius: 0.75rem;
        }
        :host([rounded='2xl']) .card {
          border-radius: 1rem;
        }
        :host([rounded='full']) .card {
          border-radius: 9999px;
        }

        /* Dark mode styles */
        @media (prefers-color-scheme: dark) {
          :host {
            --card-bg: var(--dark-card-bg);
            --card-text: var(--dark-card-text);
            --card-subtext: var(--dark-card-subtext);
            --card-border: var(--dark-card-border);
            --card-shadow: var(--dark-card-shadow);
            --card-hover-shadow: var(--dark-card-hover-shadow);
          }

          /* Ensure text colors adapt to dark mode */
          .card :slotted(*) {
            color: var(--dark-card-text);
          }

          .card :slotted(p) {
            color: var(--dark-card-subtext);
          }

          /* Style links in dark mode */
          .card :slotted(a) {
            color: var(--color-blue-400, #60a5fa);
            text-decoration: none;
          }

          .card :slotted(a:hover) {
            text-decoration: underline;
          }
        }
      `,
    ];
  }

  constructor() {
    super();
    this.title = '';
    this.subtitle = '';
    this.image = '';
    this.imageAlt = '';
    this.shadow = false;
    this.hoverable = false;
    this.bordered = true;
    this.rounded = 'md';
  }

  render() {
    return html`
      <div class="card">
        ${this.image
          ? html`
              <img
                src="${this.image}"
                alt="${this.imageAlt || this.title}"
                class="card-image ${this.rounded ? 'rounded-t-' + this.rounded : ''}"
                loading="lazy"
              />
            `
          : ''}

        <div class="card-body">
          ${this.title ? html`<h3 class="card-title">${this.title}</h3>` : ''}
          ${this.subtitle ? html`<div class="card-subtitle">${this.subtitle}</div>` : ''}

          <div class="card-content">
            <slot></slot>
          </div>

          <div class="card-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

// Register the component
customElements.define('ui-card', Card);

export default Card;
