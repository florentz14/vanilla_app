import { html, css } from 'lit';
import { BaseElement } from '../base/BaseElement';
import { classMap } from 'lit/directives/class-map.js';
import { Router } from '@vaadin/router';

export class NavLink extends BaseElement {
  static get properties() {
    return {
      ...super.properties,
      href: { type: String },
      exact: { type: Boolean, reflect: true },
      active: { type: Boolean, state: true },
      mobile: { type: Boolean, reflect: true },
      'aria-current': { type: String, attribute: 'aria-current', reflect: true },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: inline-block;
          --nav-link-color: theme('colors.gray.500');
          --nav-link-hover-color: theme('colors.gray.700');
          --nav-link-active-color: theme('colors.indigo.600');
          --nav-link-border-color: transparent;
          --nav-link-hover-border-color: theme('colors.gray.300');
          --nav-link-active-border-color: theme('colors.indigo.500');
          --nav-link-bg: transparent;
          --nav-link-hover-bg: theme('colors.gray.50');
          --nav-link-active-bg: theme('colors.indigo.50');
          --nav-link-padding: 0.5rem 1rem;
          --nav-link-border-width: 2px;
          --nav-link-font-size: theme('fontSize.sm');
          --nav-link-font-weight: theme('fontWeight.medium');
          --nav-link-transition: all 0.2s ease-in-out;
        }

        :host([mobile]) {
          --nav-link-padding: 0.5rem 1rem 0.5rem 0.75rem;
          --nav-link-border-width: 0 0 0 4px;
          --nav-link-font-size: theme('fontSize.base');
          display: block;
          width: 100%;
        }

        .nav-link {
          display: flex;
          align-items: center;
          width: 100%;
          padding: var(--nav-link-padding);
          font-size: var(--nav-link-font-size);
          font-weight: var(--nav-link-font-weight);
          color: var(--nav-link-color);
          background-color: var(--nav-link-bg);
          border: solid transparent;
          border-width: var(--nav-link-border-width);
          border-color: var(--nav-link-border-color);
          text-decoration: none;
          transition: var(--nav-link-transition);
          cursor: pointer;
          user-select: none;
          box-sizing: border-box;
        }

        .nav-link:hover {
          color: var(--nav-link-hover-color);
          border-color: var(--nav-link-hover-border-color);
          background-color: var(--nav-link-hover-bg);
        }

        :host([active]) .nav-link {
          color: var(--nav-link-active-color);
          border-color: var(--nav-link-active-border-color);
          background-color: var(--nav-link-active-bg);
        }

        /* Dark mode styles */
        @media (prefers-color-scheme: dark) {
          :host {
            --nav-link-color: theme('colors.gray.300');
            --nav-link-hover-color: theme('colors.white');
            --nav-link-active-color: theme('colors.indigo.300');
            --nav-link-hover-bg: theme('colors.gray.700/50');
            --nav-link-active-bg: theme('colors.indigo.900/30');
          }

          :host([mobile]) {
            --nav-link-hover-bg: theme('colors.gray.700/50');
          }
        }
      `,
    ];
  }

  constructor() {
    super();
    this.href = '';
    this.exact = false;
    this.active = false;
    this.mobile = false;
    this['aria-current'] = 'false';
    this._onClick = this._onClick.bind(this);
    this._onPopState = this._onPopState.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._updateActiveState();
    window.addEventListener('popstate', this._onPopState);
    this.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('popstate', this._onPopState);
    this.removeEventListener('click', this._onClick);
  }

  updated(changedProperties) {
    if (changedProperties.has('href') || changedProperties.has('exact')) {
      this._updateActiveState();
    }
  }

  _onClick(e) {
    if (this.href && this.href !== '#' && !this.href.startsWith('http')) {
      e.preventDefault();
      // Use Vaadin Router for navigation
      Router.go(this.href);
      this._updateActiveState();
      // Dispatch a custom event in case other components need to know about navigation
      this.dispatchEvent(
        new CustomEvent('navigate', {
          detail: { href: this.href },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  _onPopState() {
    this._updateActiveState();
  }

  _updateActiveState() {
    const currentPath = window.location.pathname;

    if (this.exact) {
      this.active = currentPath === this.href;
    } else {
      this.active = this.href === '/' ? currentPath === '/' : currentPath.startsWith(this.href);
    }

    this.setAttribute('aria-current', this.active ? 'page' : 'false');
  }

  render() {
    const classes = {
      'nav-link': true,
      mobile: this.mobile,
    };

    return html`
      <a
        href="${this.href}"
        class="${classMap(classes)}"
        aria-current="${this.active ? 'page' : 'false'}"
        part="link"
      >
        <slot></slot>
      </a>
    `;
  }
}

// Register the component
customElements.define('ui-nav-link', NavLink);

export default NavLink;
