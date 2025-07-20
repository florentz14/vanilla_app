import { html, render } from 'lit-html';
import { navigate } from '../router';
import debounce from 'lodash/debounce';
import * as yup from 'yup';

// Heroicons
const UserIcon = html`
  <svg
    class="h-5 w-5 text-gray-400"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fill-rule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clip-rule="evenodd"
    />
  </svg>
`;

const MailIcon = html`
  <svg
    class="h-5 w-5 text-gray-400"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
`;

const LockClosedIcon = html`
  <svg
    class="h-5 w-5 text-gray-400"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fill-rule="evenodd"
      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
      clip-rule="evenodd"
    />
  </svg>
`;

const CheckIcon = (classes = 'h-5 w-5 text-indigo-600') => html`
  <svg
    class="${classes}"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fill-rule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clip-rule="evenodd"
    />
  </svg>
`;

// Validation schema with Yup
const registerSchema = yup.object({
  name: yup
    .string()
    .required('El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres'),

  email: yup
    .string()
    .required('El correo electrónico es requerido')
    .email('Ingresa un email válido'),

  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
    .matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
    .matches(/[0-9]/, 'Debe contener al menos un número'),

  terms: yup.boolean().oneOf([true], 'Debes aceptar los términos y condiciones'),
});

// Module-scoped state
const state = {
  data: { name: '', email: '', password: '', terms: false },
  errors: { name: '', email: '', password: '', terms: '' },
  touched: { name: false, email: false, password: false, terms: false },
  _updateCallbacks: [],
};

// State management utilities
function updateState(updates) {
  Object.assign(state, updates);
  state._updateCallbacks.forEach((cb) => cb());
}

function subscribe(callback) {
  state._updateCallbacks.push(callback);
  return () => {
    state._updateCallbacks = state._updateCallbacks.filter((cb) => cb !== callback);
  };
}

// Re-render utility
function reRender() {
  const outlet = document.getElementById('router-outlet') || document.getElementById('app');
  if (outlet) {
    render(Register(), outlet);
  }
}

// Validate a single field
async function validateField(field, value) {
  try {
    await yup.reach(registerSchema, field).validate(value);
    return '';
  } catch (error) {
    return error.message;
  }
}

// Validate entire form
async function validateForm() {
  try {
    await registerSchema.validate(state.data, { abortEarly: false });
    return {};
  } catch (errors) {
    const validationErrors = {};
    errors.inner.forEach((error) => {
      if (error.path) {
        validationErrors[error.path] = error.message;
      }
    });
    return validationErrors;
  }
}

// Debounced field validation
const debouncedValidation = debounce(async (field, value) => {
  if (state.touched[field]) {
    const error = await validateField(field, value);
    if (state.errors[field] !== error) {
      updateState({
        ...state,
        errors: { ...state.errors, [field]: error },
      });
      reRender();
    }
  }
}, 300);

// Handlers
function onInput(field) {
  return (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    updateState({
      ...state,
      data: { ...state.data, [field]: value },
    });
    debouncedValidation(field, value);
  };
}

function onBlur(field) {
  return async (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const error = await validateField(field, value);
    updateState({
      ...state,
      touched: { ...state.touched, [field]: true },
      data: { ...state.data, [field]: value },
      errors: { ...state.errors, [field]: error },
    });
    reRender();
  };
}

async function onSubmit(e) {
  e.preventDefault();
  // Mark all fields as touched
  const touched = Object.keys(state.touched).reduce((acc, key) => {
    acc[key] = true;
    return acc;
  }, {});

  // Update state with touched fields
  updateState({
    ...state,
    touched: { ...state.touched, ...touched },
  });

  // Validate all fields
  const errors = await validateForm();

  if (Object.keys(errors).length === 0) {
    console.log('Datos válidos:', state.data);
    // Reset form
    updateState({
      data: { name: '', email: '', password: '', terms: false },
      errors: { name: '', email: '', password: '', terms: '' },
      touched: { name: false, email: false, password: false, terms: false },
    });
    navigate('/login');
  } else {
    // Update errors and re-render
    updateState({
      ...state,
      errors: { ...state.errors, ...errors },
    });
    reRender();
  }
}

// Register component
function Register() {
  // Subscribe to state changes on component mount
  if (typeof window !== 'undefined' && !window._registerInitialized) {
    window._registerInitialized = true;
    const unsubscribe = subscribe(reRender);

    // Cleanup on unload
    window.addEventListener('beforeunload', () => {
      unsubscribe();
      window._registerInitialized = false;
    });
  }

  const { data, errors, touched } = state;

  return html`
    <div
      class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
    >
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Crear nueva cuenta
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          ¿Ya tienes cuenta?
          <a
            href="/login"
            @click=${(e) => {
              e.preventDefault();
              navigate('/login');
            }}
            class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Inicia sesión
          </a>
        </p>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form class="space-y-6" @submit=${onSubmit} novalidate>
            <!-- Name -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Nombre completo</label
              >
              <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  ${UserIcon}
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autocomplete="name"
                  .value=${data.name}
                  @input=${onInput('name')}
                  @blur=${onBlur('name')}
                  class="appearance-none block w-full pl-10 px-3 py-2 border ${touched.name &&
                  errors.name
                    ? 'border-red-300'
                    : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Ingresa tu nombre completo"
                />
              </div>
              ${touched.name && errors.name
                ? html`<p class="mt-1 text-sm text-red-600">${errors.name}</p>`
                : ''}
            </div>
            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Correo electrónico</label
              >
              <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  ${MailIcon}
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  .value=${data.email}
                  @input=${onInput('email')}
                  @blur=${onBlur('email')}
                  class="appearance-none block w-full pl-10 px-3 py-2 border ${touched.email &&
                  errors.email
                    ? 'border-red-300'
                    : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="correo@ejemplo.com"
                />
              </div>
              ${touched.email && errors.email
                ? html`<p class="mt-1 text-sm text-red-600">${errors.email}</p>`
                : ''}
            </div>
            <!-- Password -->
            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Contraseña</label
              >
              <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  ${LockClosedIcon}
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="new-password"
                  .value=${data.password}
                  @input=${onInput('password')}
                  @blur=${onBlur('password')}
                  class="appearance-none block w-full pl-10 px-3 py-2 border ${touched.password &&
                  errors.password
                    ? 'border-red-300'
                    : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Mínimo 8 caracteres"
                />
              </div>
              ${touched.password && errors.password
                ? html`<p class="mt-1 text-sm text-red-600">${errors.password}</p>`
                : ''}
              <p class="mt-2 text-sm text-gray-500">
                Usa al menos 8 caracteres, una mayúscula, una minúscula y un número.
              </p>
            </div>
            <!-- Terms -->
            <div>
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    @change=${onInput('terms')}
                    @blur=${onBlur('terms')}
                    .checked=${data.terms}
                  />
                </div>
                <div class="ml-3">
                  <label for="terms" class="font-medium text-gray-700 text-sm flex items-center">
                    <span class="inline-block w-5 h-5 mr-1">
                      ${data.terms ? CheckIcon('h-5 w-5 text-indigo-600') : ''}
                    </span>
                    Acepto los
                    <a href="#" class="text-indigo-600 hover:text-indigo-500">Términos</a> y
                    <a href="#" class="text-indigo-600 hover:text-indigo-500"
                      >Política de Privacidad</a
                    >
                  </label>
                </div>
              </div>
              ${touched.terms && errors.terms
                ? html`<p class="mt-1 text-sm text-red-600">${errors.terms}</p>`
                : ''}
            </div>
            <div>
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              >
                Crear cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}

export default Register;
