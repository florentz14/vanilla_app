// Simple event-based store for counter state
const createCounterStore = () => {
  let state = {
    count: 0,
    listeners: new Set(),
  };

  return {
    getState: () => ({ count: state.count }),

    setState: (updater) => {
      const newState = typeof updater === 'function' ? updater(state) : updater;

      state = { ...state, ...newState };
      state.listeners.forEach((listener) => listener(state));
    },

    subscribe: (listener) => {
      state.listeners.add(listener);
      return () => state.listeners.delete(listener);
    },
  };
};

// Simple event-based store for theme management
const createThemeStore = () => {
  let state = {
    theme: localStorage.getItem('theme') || 'light',
    listeners: new Set(),
  };

  // Initialize from localStorage or system preference
  if (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    state.theme = 'dark';
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
  }

  return {
    getState: () => state.theme,

    setTheme: (theme) => {
      if (theme !== 'light' && theme !== 'dark') return;
      state.theme = theme;
      localStorage.setItem('theme', theme);
      document.documentElement.classList.toggle('dark', theme === 'dark');
      state.listeners.forEach((listener) => listener(theme));
    },

    toggleTheme: () => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      state.theme = newTheme;
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      state.listeners.forEach((listener) => listener(newTheme));
    },

    subscribe: (listener) => {
      state.listeners.add(listener);
      return () => state.listeners.delete(listener);
    },
  };
};

export const themeStore = createThemeStore();
export const counterStore = createCounterStore();

// For backward compatibility
export default {
  getState: () => ({
    theme: themeStore.getState(),
    count: counterStore.getState().count,
  }),
  toggleTheme: () => themeStore.toggleTheme(),
  setState: (stateOrUpdater) => counterStore.setState(stateOrUpdater),
  subscribe: (listener) => counterStore.subscribe(listener),
};
