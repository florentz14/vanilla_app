export default function Home() {
  const features = [
    {
      icon: '🚀',
      title: 'Lightning Fast',
      description: 'Built with Vite for an incredibly fast development experience and optimal production builds.'
    },
    {
      icon: '🌓',
      title: 'Dark Mode',
      description: 'Beautiful dark mode that respects system preferences with automatic switching.'
    },
    {
      icon: '📱',
      title: 'Fully Responsive',
      description: 'Looks great on all devices, from mobile phones to large desktop screens.'
    },
    {
      icon: '⚡',
      title: 'Optimized',
      description: 'Performance-optimized with code splitting and lazy loading for faster page loads.'
    }
  ];

  return `
    <div class="space-y-16">
      <!-- Hero Section -->
      <section class="text-center py-16 md:py-24">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Modern Web Development
          <span class="text-indigo-600 dark:text-indigo-400">Simplified</span>
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          A clean, fast, and modern web application built with vanilla JavaScript and Tailwind CSS.
          No frameworks, just the web platform at its best.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="/about" 
            class="px-8 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-lg font-medium"
            data-router
          >
            Learn More
          </a>
          <a 
            href="#features" 
            class="px-8 py-3 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-lg font-medium dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            View Features
          </a>
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Everything you need
            </h2>
            <p class="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 mx-auto">
              All the modern web development features you expect, without the bloat.
            </p>
          </div>
          
          <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            ${features.map(feature => `
              <div class="card p-6 h-full">
                <div class="text-4xl mb-4">${feature.icon}</div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  ${feature.title}
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  ${feature.description}
                </p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="bg-indigo-700 rounded-xl overflow-hidden">
        <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span class="block">Ready to dive in?</span>
            <span class="block text-indigo-200">Start your project today.</span>
          </h2>
          <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div class="inline-flex rounded-md shadow">
              <a href="#" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
                Get started
              </a>
            </div>
            <div class="ml-3 inline-flex rounded-md shadow">
              <a href="/about" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 bg-opacity-60 hover:bg-opacity-70" data-router>
                Learn more
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}