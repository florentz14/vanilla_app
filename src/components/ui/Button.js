import { html, css } from 'lit';
import { BaseElement } from '../base/BaseElement';

export class Button extends BaseElement {
  static get properties() {
    return {
      ...super.properties,
      variant: {
        type: String,
        reflect: true,
      }, // 'primary', 'secondary', 'outline', 'text'
      size: {
        type: String,
        reflect: true,
      }, // 'sm', 'md', 'lg'
      fullWidth: {
        type: Boolean,
        attribute: 'full-width',
        reflect: true,
      },
      type: {
        type: String,
        reflect: true,
      },
      href: {
        type: String,
        reflect: true,
      },
      target: {
        type: String,
        reflect: true,
      },
      rel: {
        type: String,
        reflect: true,
      },
      icon: {
        type: String,
        reflect: true,
      },
      disabled: {
        type: Boolean,
        reflect: true,
      },
    };
  }

  constructor() {
    super();
    // Inicializar propiedades con valores por defecto
    this.variant = 'primary';
    this.size = 'md';
    this.fullWidth = false;
    this.disabled = false;
    this.type = 'button';
    this.href = '';
    this.target = '_self';
    this.rel = 'noopener noreferrer';
    this.icon = '';
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          /* Usar variables CSS globales con valores por defecto */
          --button-bg: var(--primary, #4f46e5);
          --button-text: var(--text-on-primary, white);
          --button-hover: var(--primary-hover, #4338ca);
          --button-active: var(--primary-active, #3730a3);
          --button-border: transparent;
          --button-shadow: var(--shadow-sm, 0 1px 2px 0 rgb(0 0 0 / 0.05));
          --button-padding: 0.5rem 1rem;
          --button-radius: var(--radius, 0.375rem);
          --button-font: 500;
          --button-font-size: 0.875rem;
          --button-line-height: 1.25rem;
          --button-transition: var(--transition, all 0.2s ease-in-out);

          display: inline-block;
        }

        :host([full-width]) {
          display: block;
          width: 100%;
        }

        .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: var(--button-padding, 0.5rem 1rem);
          font-weight: var(--button-font, 500);
          font-size: var(--button-font-size, 0.875rem);
          line-height: var(--button-line-height, 1.25rem);
          color: var(--button-text, #ffffff);
          background-color: var(--button-bg, #4f46e5);
          border: 1px solid var(--button-border, transparent);
          border-radius: var(--button-radius, 0.375rem);
          box-shadow: var(--button-shadow, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
          cursor: pointer;
          user-select: none;
          transition: var(--button-transition, all 0.2s);
          text-decoration: none;
          text-align: center;
          white-space: nowrap;
        }

        .button:hover:not(:disabled) {
          background-color: var(--button-hover, #4338ca);
        }

        .button:active:not(:disabled) {
          background-color: var(--button-active, #3730a3);
        }

        .button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Variants */
        :host([variant='primary']) .button {
          --button-bg: var(--color-indigo-600, #4f46e5);
          --button-text: white;
          --button-hover: var(--color-indigo-700, #4338ca);
          --button-active: var(--color-indigo-800, #3730a3);
        }

        :host([variant='secondary']) .button {
          --button-bg: var(--color-gray-100, #f3f4f6);
          --button-text: var(--color-gray-900, #111827);
          --button-hover: var(--color-gray-200, #e5e7eb);
          --button-active: var(--color-gray-300, #d1d5db);
        }

        :host([variant='outline']) .button {
          --button-bg: transparent;
          --button-text: var(--color-indigo-600, #4f46e5);
          --button-hover: var(--color-indigo-50, #eef2ff);
          --button-active: var(--color-indigo-100, #e0e7ff);
          --button-border: var(--color-indigo-600, #4f46e5);
        }

        :host([variant='text']) .button {
          --button-bg: transparent;
          --button-text: var(--color-indigo-600, #4f46e5);
          --button-hover: var(--color-indigo-50, #eef2ff);
          --button-active: var(--color-indigo-100, #e0e7ff);
          --button-shadow: none;
          padding: 0.25rem 0.5rem;
        }

        /* Sizes */
        :host([size='sm']) .button {
          --button-padding: 0.25rem 0.5rem;
          --button-font-size: 0.75rem;
        }

        :host([size='lg']) .button {
          --button-padding: 0.75rem 1.5rem;
          --button-font-size: 1rem;
        }

        /* Icon */
        .icon {
          display: inline-flex;
          margin-right: 0.375rem;
          width: 1rem;
          height: 1rem;
        }
      `,
    ];
  }

  render() {
    const tag = this.href ? 'a' : 'button';
    const icon = this.icon
      ? html`<span class="button-icon">${this._renderIcon(this.icon)}</span>`
      : '';

    // Clases dinámicas basadas en propiedades
    const classes = {
      btn: true,
      'btn-primary': this.variant === 'primary',
      'btn-secondary': this.variant === 'secondary',
      'btn-outline': this.variant === 'outline',
      'btn-text': this.variant === 'text',
      'btn-sm': this.size === 'sm',
      'btn-lg': this.size === 'lg',
      'w-full': this.fullWidth,
      'opacity-50 cursor-not-allowed': this.disabled,
    };

    // Contenido del botón
    const buttonContent = html`
      ${icon}
      <span class="button-label"><slot></slot></span>
    `;

    // Renderizar como <a> o <button> según corresponda
    if (this.href) {
      return html`
        <a
          href="${this.href}"
          target="${this.target}"
          rel="${this.rel}"
          class="button ${Object.entries(classes)
            .filter(([_, v]) => v)
            .map(([k]) => k)
            .join(' ')}"
          ?disabled="${this.disabled}"
          @click="${this._handleClick}"
        >
          ${buttonContent}
        </a>
      `;
    }

    return html`
      <button
        class="button ${Object.entries(classes)
          .filter(([_, v]) => v)
          .map(([k]) => k)
          .join(' ')}"
        type="${this.type}"
        ?disabled="${this.disabled}"
        @click="${this._handleClick}"
      >
        ${buttonContent}
      </button>
    `;
  }

  _renderIcon(iconName) {
    // Aquí podrías implementar la lógica para renderizar diferentes iconos
    // Por ahora, usaremos un span simple como marcador de posición
    return html`<span>${iconName}</span>`;
  }

  _handleClick(e) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // Emitir evento personalizado
    this.emit('click', { originalEvent: e });
  }
}

// Registrar el componente
customElements.define('ui-button', Button);

export default Button;
