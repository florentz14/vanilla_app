import { html, css } from 'lit';
import { BaseElement } from '../base/BaseElement';

export class Alert extends BaseElement {
  static get properties() {
    return {
      ...super.properties,
      variant: {
        type: String,
        reflect: true,
      }, // 'info', 'success', 'warning', 'error'
      title: {
        type: String,
      },
      closable: {
        type: Boolean,
        reflect: true,
      },
      show: {
        type: Boolean,
        reflect: true,
      },
      rounded: {
        type: String,
        reflect: true,
      },
      icon: {
        type: String,
      },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          --alert-bg: var(--color-blue-50, #eff6ff);
          --alert-text: var(--color-blue-800, #1e40af);
          --alert-border: var(--color-blue-200, #bfdbfe);
          --alert-icon: var(--color-blue-500, #3b82f6);
          --alert-close: var(--color-blue-400, #60a5fa);
          --alert-close-hover: var(--color-blue-600, #2563eb);
          --alert-padding: 1rem;
          --alert-margin: 0 0 1rem 0;
          --alert-border-radius: 0.375rem;
          --alert-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

          display: block;
          margin: var(--alert-margin);
          font-size: 0.9375rem;
          line-height: 1.5;
        }

        .alert {
          position: relative;
          padding: var(--alert-padding);
          background-color: var(--alert-bg);
          color: var(--alert-text);
          border: 1px solid var(--alert-border);
          border-radius: var(--alert-border-radius);
          box-shadow: var(--alert-box-shadow);
          display: flex;
          align-items: flex-start;
        }

        .alert-icon {
          margin-right: 0.75rem;
          flex-shrink: 0;
          color: var(--alert-icon);
          display: flex;
          align-items: center;
        }

        .alert-content {
          flex: 1;
          min-width: 0;
        }

        .alert-title {
          font-weight: 600;
          margin: 0 0 0.25rem 0;
          color: var(--alert-text);
        }

        .alert-message {
          margin: 0;
          color: var(--alert-text);
          opacity: 0.9;
        }

        .alert-close {
          margin-left: 0.75rem;
          color: var(--alert-close);
          background: none;
          border: none;
          padding: 0.25rem;
          cursor: pointer;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          width: 1.5rem;
          height: 1.5rem;
          flex-shrink: 0;
        }

        .alert-close:hover {
          background-color: rgba(0, 0, 0, 0.05);
          color: var(--alert-close-hover);
        }

        :host([variant='success']) {
          --alert-bg: var(--color-green-50, #f0fdf4);
          --alert-text: var(--color-green-800, #166534);
          --alert-border: var(--color-green-200, #bbf7d0);
          --alert-icon: var(--color-green-500, #22c55e);
          --alert-close: var(--color-green-400, #4ade80);
          --alert-close-hover: var(--color-green-600, #16a34a);
        }

        :host([variant='warning']) {
          --alert-bg: var(--color-yellow-50, #fffbeb);
          --alert-text: var(--color-yellow-800, #92400e);
          --alert-border: var(--color-yellow-200, #fde68a);
          --alert-icon: var(--color-yellow-500, #eab308);
          --alert-close: var(--color-yellow-400, #facc15);
          --alert-close-hover: var(--color-yellow-600, #ca8a04);
        }

        :host([variant='error']) {
          --alert-bg: var(--color-red-50, #fef2f2);
          --alert-text: var(--color-red-800, #991b1b);
          --alert-border: var(--color-red-200, #fecaca);
          --alert-icon: var(--color-red-500, #ef4444);
          --alert-close: var(--color-red-400, #f87171);
          --alert-close-hover: var(--color-red-600, #dc2626);
        }

        :host([rounded='sm']) .alert {
          border-radius: 0.25rem;
        }
        :host([rounded='md']) .alert {
          border-radius: 0.375rem;
        }
        :host([rounded='lg']) .alert {
          border-radius: 0.5rem;
        }
        :host([rounded='full']) .alert {
          border-radius: 9999px;
        }

        /* Dark mode styles */
        @media (prefers-color-scheme: dark) {
          :host([variant='info']) {
            --alert-bg: rgba(59, 130, 246, 0.1);
            --alert-text: var(--color-blue-100, #dbeafe);
            --alert-border: rgba(59, 130, 246, 0.2);
          }

          :host([variant='success']) {
            --alert-bg: rgba(34, 197, 94, 0.1);
            --alert-text: var(--color-green-100, #dcfce7);
            --alert-border: rgba(34, 197, 94, 0.2);
          }

          :host([variant='warning']) {
            --alert-bg: rgba(234, 179, 8, 0.1);
            --alert-text: var(--color-yellow-100, #fef9c3);
            --alert-border: rgba(234, 179, 8, 0.2);
          }

          :host([variant='error']) {
            --alert-bg: rgba(239, 68, 68, 0.1);
            --alert-text: var(--color-red-100, #fee2e2);
            --alert-border: rgba(239, 68, 68, 0.2);
          }
        }
      `,
    ];
  }

  constructor() {
    super();
    this.variant = 'info';
    this.title = '';
    this.closable = false;
    this.show = true;
    this.rounded = 'md';
    this.icon = '';
  }

  render() {
    if (!this.show) return null;

    // Default icons based on variant
    const defaultIcons = {
      info: 'ℹ️',
      success: '✓',
      warning: '⚠️',
      error: '✕',
    };

    const iconToShow = this.icon || defaultIcons[this.variant] || defaultIcons.info;

    return html`
      <div class="alert" role="alert">
        <div class="alert-icon" aria-hidden="true">${iconToShow}</div>
        <div class="alert-content">
          ${this.title ? html`<div class="alert-title">${this.title}</div>` : ''}
          <div class="alert-message">
            <slot></slot>
          </div>
        </div>
        ${this.closable
          ? html`
              <button class="alert-close" @click="${this._handleClose}" aria-label="Close alert">
                &times;
              </button>
            `
          : ''}
      </div>
    `;
  }

  _handleClose() {
    this.show = false;
    this.dispatchEvent(
      new CustomEvent('close', {
        bubbles: true,
        composed: true,
      })
    );
  }
}

// Register the component
customElements.define('ui-alert', Alert);

export default Alert;
