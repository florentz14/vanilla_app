import { html, render } from 'lit-html';
import { navigate } from '../router';
import { z } from 'zod';

// Define the validation schema
const registerSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name cannot exceed 50 characters'),
  email: z.string().email('Invalid email address').min(5, 'Email is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
  }),
});

// Error state
let formErrors = {
  name: '',
  email: '',
  password: '',
  terms: '',
};

/**
 * Register page component
 * @returns {import('lit-html').TemplateResult}
 */
const Register = () => {
  // Store form data for re-rendering
  let formData = {};

  // Function to update the form with validation errors
  const updateFormErrors = (errors, data = {}) => {
    formErrors = { ...formErrors, ...errors };
    formData = { ...formData, ...data };
    // Re-render the component to show errors and preserve input
    render(Register(), document.getElementById('app'));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      terms: e.target.terms.checked,
    };

    // Validate the form data
    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      // Clear previous errors
      const newErrors = { name: '', email: '', password: '', terms: '' };

      // Map validation errors to form fields
      result.error.errors.forEach((error) => {
        const field = error.path[0];
        if (field in newErrors) {
          newErrors[field] = error.message;
        }
      });

      updateFormErrors(newErrors);
      return;
    }

    // If validation passes, proceed with registration
    console.log('Registration attempt with:', formData);

    // In a real app, you would make an API call here
    // For now, just navigate to login
    navigate('/login');
  };

  return html`
    <div
      class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
    >
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Create a new account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Or
          <a
            href="/login"
            class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            @click=${(e) => {
              e.preventDefault();
              navigate('/login');
            }}
          >
            sign in to your account
          </a>
        </p>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form class="space-y-6" @submit=${handleSubmit}>
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full name
              </label>
              <div class="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autocomplete="name"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <div class="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <div class="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="new-password"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                />
              </div>
              <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Use at least 8 characters, one uppercase, one lowercase and one number.
              </p>
            </div>

            <div class="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                class="h-4 w-4 ${formErrors.terms
                  ? 'text-red-600 border-red-500'
                  : 'text-indigo-600 border-gray-300 dark:border-gray-600'} focus:ring-indigo-500 rounded dark:bg-gray-700"
              />
              ${formErrors.terms
                ? html`<p class="mt-1 text-sm text-red-600 dark:text-red-400">
                    ${formErrors.terms}
                  </p>`
                : ''}
              <label for="terms" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                I agree to the
                <a
                  href="#"
                  class="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >Terms</a
                >
                and
                <a
                  href="#"
                  class="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >Privacy Policy</a
                >
              </label>
            </div>

            <div>
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
};

export default Register;
