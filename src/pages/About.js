import { html } from 'lit-html';

export default function About() {
  return html`
    <div class="max-w-4xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">About Us</h1>
      <div class="prose dark:prose-invert max-w-none">
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          Welcome to our modern web application built with vanilla JavaScript and Tailwind CSS. This
          project showcases how to build a single-page application with client-side routing, dark
          mode, and responsive design using modern web standards.
        </p>
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
          Our Mission
        </h2>
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          To demonstrate that you can build powerful, maintainable web applications using vanilla
          JavaScript without the need for large frameworks, while still enjoying modern development
          practices like component-based architecture and build tooling.
        </p>
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">Features</h2>
        <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
          <li>Client-side routing with the History API</li>
          <li>Dark mode support with system preference detection</li>
          <li>Responsive design that works on all devices</li>
          <li>Component-based architecture</li>
          <li>Modern build setup with Vite</li>
          <li>Tailwind CSS for styling</li>
        </ul>
      </div>
    </div>
  `;
}
