import { html } from 'lit-html';
import '../components/Counter';
import features from '../data/features.json';

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
