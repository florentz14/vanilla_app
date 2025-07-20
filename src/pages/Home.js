import { html } from 'lit';
import '../components/Counter';
import features from '../data/features.json';

// Import our UI components
import '../components/ui/Button';
import '../components/ui/Card';

const featureCard = (feature) => html`
  <div class="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow">
    <div class="text-4xl mb-4">${feature.icon}</div>
    <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">${feature.title}</h3>
    <p class="text-gray-600 dark:text-gray-300">${feature.description}</p>
  </div>
`;

// Export the template directly
export default function Home() {
  return html`
    <div class="space-y-16">
      <!-- Button Examples -->
      <section class="py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
            Componentes de UI
          </h2>
          <div class="space-y-6">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200">Botones</h3>
            <div class="flex flex-wrap gap-4">
              <ui-button @click="${() => alert('¡Botón primario clickeado!')}">Primario</ui-button>
              <ui-button variant="secondary">Secundario</ui-button>
              <ui-button variant="outline">Outline</ui-button>
              <ui-button variant="text">Texto</ui-button>
              <ui-button size="sm">Pequeño</ui-button>
              <ui-button size="lg">Grande</ui-button>
              <ui-button disabled>Deshabilitado</ui-button>
              <ui-button full-width>Ancho completo</ui-button>
              <ui-button href="#" target="_blank">Enlace</ui-button>
            </div>
          </div>
        </div>
      </section>

      <!-- Card Examples -->
      <section class="py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
            Componentes de Tarjeta
          </h2>
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <!-- Basic Card -->
            <ui-card title="Tarjeta Básica" variant="info" rounded="lg">
              <p class="text-gray-600 dark:text-gray-300">
                Esta es una tarjeta simple con un título y contenido básico.
              </p>
            </ui-card>

            <!-- Card with Image -->
            <ui-card
              title="Con Imagen"
              image="https://via.placeholder.com/400x200"
              image-alt="Imagen de ejemplo"
              shadow
              hoverable
              rounded="lg"
            >
              <p class="text-gray-600 dark:text-gray-300">
                Tarjeta con imagen en la parte superior y efecto hover.
              </p>
              <div slot="footer" class="flex justify-end gap-2 mt-4">
                <ui-button variant="text" size="sm">Cancelar</ui-button>
                <ui-button variant="primary" size="sm">Aceptar</ui-button>
              </div>
            </ui-card>

            <!-- Feature Cards -->
            ${features.slice(0, 1).map(
              (feature) => html`
                <ui-card title=${feature.title} variant="primary" rounded="lg">
                  <div class="text-4xl mb-3">${feature.icon}</div>
                  <p class="text-gray-600 dark:text-gray-300">${feature.description}</p>
                </ui-card>
              `
            )}
          </div>
        </div>
      </section>

      <!-- State Management Example -->
      <section class="py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
            State Management with Zustand
          </h2>
          <div class="grid gap-8 md:grid-cols-2">
            <counter-component></counter-component>
            <div class="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-md">
              <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Global State</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                This counter is using Zustand for state management. The count is stored in a global
                store.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-12 text-center">
            Features
          </h2>
          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            ${features.map((feature) => featureCard(feature))}
          </div>
        </div>
      </section>
    </div>
  `;
}
