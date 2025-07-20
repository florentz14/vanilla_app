import { html } from 'lit';
import { navigate } from '../router';

// Mock data - in a real app, this would come from an API
const stats = [
  { name: 'Total Posts', value: '24', change: '+4.75%', changeType: 'positive' },
  { name: 'Comments', value: '1,234', change: '+12.2%', changeType: 'positive' },
  { name: 'Page Views', value: '8,546', change: '-2.91%', changeType: 'negative' },
  { name: 'Avg. Engagement', value: '24.57%', change: '+0.1%', changeType: 'positive' },
];

const recentActivity = [
  { id: 1, user: 'John Doe', action: 'created a new post', time: '2h ago', href: '#' },
  { id: 2, user: 'Jane Smith', action: 'commented on your post', time: '3h ago', href: '#' },
  { id: 3, user: 'Alex Johnson', action: 'liked your post', time: '5h ago', href: '#' },
  { id: 4, user: 'You', action: 'updated your profile', time: '1d ago', href: '#' },
];

/**
 * Dashboard page component
 * @returns {import('lit-html').TemplateResult}
 */
const Dashboard = () => {
  const handleLogout = (e) => {
    e.preventDefault();
    // Handle logout logic here
    console.log('User logged out');
    navigate('/login');
  };

  return html`
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
      <!-- Header -->
      <header class="bg-white dark:bg-gray-800 shadow">
        <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <button
            @click=${handleLogout}
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign out
          </button>
        </div>
      </header>

      <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Welcome Banner -->
        <div class="bg-indigo-700 dark:bg-indigo-800 rounded-lg shadow px-5 py-6 sm:px-6 mb-8">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between">
            <div class="flex-1 min-w-0">
              <h2 class="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
                Welcome back, User!
              </h2>
              <div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                <div class="mt-2 flex items-center text-sm text-indigo-200">
                  <svg
                    class="flex-shrink-0 mr-1.5 h-5 w-5 text-indigo-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Last login: ${new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
            <div
              class="mt-4 flex md:mt-0 md:ml-4
            "
            >
              <button
                type="button"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                View profile
              </button>
              <button
                type="button"
                class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Settings
              </button>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          ${stats.map(
            (stat) => html`
              <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                  <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    ${stat.name}
                  </dt>
                  <dd class="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                    ${stat.value}
                  </dd>
                  <dd
                    class="mt-1 flex items-baseline text-sm font-semibold ${stat.changeType ===
                    'positive'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'}"
                  >
                    ${stat.change}
                    <span class="ml-2 text-gray-500 dark:text-gray-400 text-sm font-normal">
                      from last month
                    </span>
                  </dd>
                </div>
              </div>
            `
          )}
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Recent Activity -->
          <div class="lg:col-span-2">
            <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <div class="p-6">
                <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-6">
                  Recent Activity
                </h2>
                <div class="flow-root">
                  <ul class="-mb-8">
                    ${recentActivity.map(
                      (activity, index) => html`
                        <li>
                          <div class="relative pb-8">
                            ${index !== recentActivity.length - 1
                              ? html`
                                  <span
                                    class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                                    aria-hidden="true"
                                  ></span>
                                `
                              : ''}
                            <div class="relative flex space-x-3">
                              <div>
                                <span
                                  class="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white dark:ring-gray-800"
                                >
                                  <span class="text-white font-medium text-sm">
                                    ${activity.user
                                      .split(' ')
                                      .map((n) => n[0])
                                      .join('')}
                                  </span>
                                </span>
                              </div>
                              <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                <div>
                                  <p class="text-sm text-gray-500 dark:text-gray-400">
                                    <a href="#" class="font-medium text-gray-900 dark:text-white"
                                      >${activity.user}</a
                                    >
                                    ${activity.action}
                                  </p>
                                </div>
                                <div
                                  class="text-right text-sm whitespace-nowrap text-gray-500 dark:text-gray-400"
                                >
                                  <time datetime="2020-09-20">${activity.time}</time>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      `
                    )}
                  </ul>
                </div>
                <div
                  class="mt-6
                "
                >
                  <a
                    href="#"
                    class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    View all
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div>
            <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <div class="p-6">
                <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-6">
                  Quick Actions
                </h2>
                <div class="space-y-4">
                  <button
                    type="button"
                    class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg
                      class="-ml-1 mr-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    New Post
                  </button>
                  <button
                    type="button"
                    class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg
                      class="-ml-1 mr-2 h-5 w-5 text-gray-500 dark:text-gray-300"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                    </svg>
                    View Profile
                  </button>
                  <button
                    type="button"
                    class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg
                      class="-ml-1 mr-2 h-5 w-5 text-gray-500 dark:text-gray-300"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Settings
                  </button>
                </div>
              </div>
            </div>

            <!-- Recent Comments -->
            <div class="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <div class="p-6">
                <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-6">
                  Recent Comments
                </h2>
                <div class="space-y-4">
                  <div class="flex items-start">
                    <div class="flex-shrink-0">
                      <span
                        class="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center"
                      >
                        <span class="text-indigo-600 dark:text-indigo-300 font-medium">JD</span>
                      </span>
                    </div>
                    <div class="ml-4">
                      <p class="text-sm text-gray-800 dark:text-gray-200">
                        Great post! Thanks for sharing.
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">John Doe • 2h ago</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="flex-shrink-0">
                      <span
                        class="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center"
                      >
                        <span class="text-indigo-600 dark:text-indigo-300 font-medium">AS</span>
                      </span>
                    </div>
                    <div class="ml-4">
                      <p class="text-sm text-gray-800 dark:text-gray-200">
                        Looking forward to more content like this!
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Alex Smith • 5h ago
                      </p>
                    </div>
                  </div>
                </div>
                <div class="mt-6">
                  <a
                    href="#"
                    class="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    View all comments
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;
};

export default Dashboard;
