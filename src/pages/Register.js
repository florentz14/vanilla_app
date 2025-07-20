import { html, render } from 'lit-html';
import { navigate } from '../router';
import debounce from 'lodash/debounce';
import * as yup from 'yup';

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
};

// Re-render utility
function reRender() {
  const app = document.getElementById('app');
  if (app) render(Register(), app);
}

// Validate a single field
async function validateField(field, value) {
  try {
    await registerSchema.validateAt(field, { [field]: value });
    return '';
  } catch (err) {
    return err.message;
  }
}

// Validate entire form
async function validateForm() {
  try {
    await registerSchema.validate(state.data, { abortEarly: false });
    return {};
  } catch (err) {
    const result = {};
    err.inner.forEach((e) => {
      result[e.path] = e.message;
    });
    return result;
  }
}

// Debounced field validation
const debouncedValidation = debounce(async (field, value) => {
  if (state.touched[field]) {
    state.errors[field] = await validateField(field, value);
    reRender();
  }
}, 300);

// Handlers
function onInput(field) {
  return (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    state.data[field] = value;
    debouncedValidation(field, value);
  };
}

function onBlur(field) {
  return async (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    state.touched[field] = true;
    state.data[field] = value;
    state.errors[field] = await validateField(field, value);
    reRender();
  };
}

async function onSubmit(e) {
  e.preventDefault();
  // Mark all touched
  Object.keys(state.touched).forEach((k) => (state.touched[k] = true));

  const errors = await validateForm();
  if (Object.keys(errors).length === 0) {
    console.log('Datos válidos:', state.data);
    // reset
    state.data = { name: '', email: '', password: '', terms: false };
    state.errors = { name: '', email: '', password: '', terms: '' };
    state.touched = { name: false, email: false, password: false, terms: false };
    navigate('/login');
  } else {
    state.errors = { ...state.errors, ...errors };
    reRender();
  }
}

// Register component
function Register() {
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
              <div class="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autocomplete="name"
                  .value=${data.name}
                  @input=${onInput('name')}
                  @blur=${onBlur('name')}
                  class="appearance-none block w-full px-3 py-2 border ${touched.name && errors.name
                    ? 'border-red-500'
                    : 'border-gray-300'} rounded-md shadow-sm focus:outline-none sm:text-sm"
                  placeholder="Ingresa tu nombre completo"
                />
                ${touched.name && errors.name
                  ? html`<p class="mt-1 text-sm text-red-600">${errors.name}</p>`
                  : ''}
              </div>
            </div>
            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Correo electrónico</label
              >
              <div class="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  .value=${data.email}
                  @input=${onInput('email')}
                  @blur=${onBlur('email')}
                  class="appearance-none block w-full px-3 py-2 border ${touched.email &&
                  errors.email
                    ? 'border-red-500'
                    : 'border-gray-300'} rounded-md shadow-sm focus:outline-none sm:text-sm"
                  placeholder="correo@ejemplo.com"
                />
                ${touched.email && errors.email
                  ? html`<p class="mt-1 text-sm text-red-600">${errors.email}</p>`
                  : ''}
              </div>
            </div>
            <!-- Password -->
            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Contraseña</label
              >
              <div class="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="new-password"
                  .value=${data.password}
                  @input=${onInput('password')}
                  @blur=${onBlur('password')}
                  class="appearance-none block w-full px-3 py-2 border ${touched.password &&
                  errors.password
                    ? 'border-red-500'
                    : 'border-gray-300'} rounded-md shadow-sm focus:outline-none sm:text-sm"
                  placeholder="Mínimo 8 caracteres"
                />
                ${touched.password && errors.password
                  ? html`<p class="mt-1 text-sm text-red-600">${errors.password}</p>`
                  : ''}
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Usa al menos 8 caracteres, una mayúscula, una minúscula y un número.
              </p>
            </div>
            <!-- Terms -->
            <div>
              <label class="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  .checked=${data.terms}
                  @change=${onInput('terms')}
                  @blur=${onBlur('terms')}
                  class="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Acepto los
                  <a href="#" class="text-indigo-600 hover:text-indigo-500">Términos</a> y
                  <a href="#" class="text-indigo-600 hover:text-indigo-500"
                    >Política de Privacidad</a
                  >
                </span>
              </label>
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

// Initial render
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', reRender);
}

export default Register;
