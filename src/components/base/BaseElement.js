import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

export class BaseElement extends LitElement {
  // Configuración para habilitar Shadow DOM (puede ser sobrescrito por los componentes hijos)
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    mode: 'open',
    delegatesFocus: true,
  };

  // Sobrescribe este método para definir las propiedades del componente
  static get properties() {
    return {
      // Propiedades comunes pueden ir aquí
      theme: { type: String, reflect: true },
      disabled: { type: Boolean, reflect: true },
      loading: { type: Boolean, state: true },
    };
  }

  // Estilos base que se aplicarán a todos los componentes
  static get styles() {
    return css`
      :host {
        display: block;
        box-sizing: border-box;
      }
      :host([hidden]) {
        display: none;
      }
      :host([disabled]) {
        opacity: 0.5;
        pointer-events: none;
      }
    `;
  }

  constructor() {
    super();
    this.theme = '';
    this.disabled = false;
    this.loading = false;
  }

  // Método helper para obtener clases condicionales
  getClassNames(classes) {
    return classMap(classes);
  }

  // Método helper para obtener estilos condicionales
  getStyles(styles) {
    return styleMap(styles);
  }

  // Método para emitir eventos personalizados
  emit(eventName, detail = {}, options = {}) {
    const event = new CustomEvent(eventName, {
      bubbles: options.bubbles !== false,
      composed: options.composed !== false,
      detail,
    });
    this.dispatchEvent(event);
    return event;
  }

  // Hook del ciclo de vida: se llama cuando el componente se conecta al DOM
  connectedCallback() {
    super.connectedCallback();
    // Agregar clase al host para estilos específicos
    this.classList.add('base-element');
  }

  // Hook del ciclo de vida: se llama cuando el componente se desconecta del DOM
  disconnectedCallback() {
    super.disconnectedCallback();
    // Limpieza si es necesaria
  }

  // Renderizado base (debe ser sobrescrito por los componentes hijos)
  render() {
    return html`<div>Base Component - Override me!</div>`;
  }
}

// Método de ayuda para registrar componentes
export function registerElement(tagName, elementClass) {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, elementClass);
    return true;
  }
  console.warn(`Element ${tagName} is already defined`);
  return false;
}
