import { html, render } from 'lit-html';
//import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { counterStore } from '../store/store';

class Counter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.unsubscribe = null;
    this.count = 0;
  }

  connectedCallback() {
    // Initial state
    this.count = counterStore.getState().count;

    // Initial render
    this.updateCounter();

    // Subscribe to store changes
    this.unsubscribe = counterStore.subscribe((state) => {
      if (this.count !== state.count) {
        this.count = state.count;
        this.updateCounter();
      }
    });
  }

  disconnectedCallback() {
    // Clean up subscription
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  handleIncrement = (e) => {
    e.preventDefault();
    counterStore.getState().increment();
  };

  handleDecrement = (e) => {
    e.preventDefault();
    counterStore.getState().decrement();
  };

  handleReset = (e) => {
    e.preventDefault();
    counterStore.getState().reset();
  };

  updateCounter() {
    const template = html`
      <style>
        .counter {
          padding: 1.5rem;
          max-width: 24rem;
          margin-left: auto;
          margin-right: auto;
          background-color: white;
          border-radius: 0.75rem;
          box-shadow:
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .dark .counter {
          background-color: #374151;
        }

        .counter__content {
          flex: 1 1 0%;
          width: 100%;
        }

        .counter__title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .dark .counter__title {
          color: white;
        }

        .counter__value {
          color: #4b5563;
          margin-bottom: 1rem;
        }

        .dark .counter__value {
          color: #d1d5db;
        }

        .counter__buttons {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .btn {
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-weight: 500;
          cursor: pointer;
          border: none;
          transition: background-color 0.2s;
        }

        .btn--decrement {
          background-color: #ef4444;
          color: white;
        }

        .btn--decrement:hover {
          background-color: #dc2626;
        }

        .btn--increment {
          background-color: #3b82f6;
          color: white;
        }

        .btn--increment:hover {
          background-color: #2563eb;
        }
      </style>
      <div class="counter">
        <div class="counter__content">
          <h2 class="counter__title">Counter</h2>
          <p class="counter__value">Current count: <strong>${this.count}</strong></p>
          <div class="counter__buttons">
            <button @click=${this.handleDecrement} class="btn btn--decrement">Decrement</button>
            <button @click=${this.handleIncrement} class="btn btn--increment">Increment</button>
          </div>
        </div>
      </div>
    `;

    render(template, this.shadowRoot);
  }
}

// Define the custom element
customElements.define('counter-component', Counter);

export default Counter;
