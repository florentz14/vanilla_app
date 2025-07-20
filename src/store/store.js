import { createStore } from 'zustand/vanilla';

// Theme store
export const themeStore = createStore((set) => ({
  theme:
    localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),

  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      return { theme: newTheme };
    }),

  setTheme: (theme) => {
    if (theme !== 'light' && theme !== 'dark') return;
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    set({ theme });
  },
}));

// Initialize theme
const initialTheme = themeStore.getState().theme;
document.documentElement.classList.toggle('dark', initialTheme === 'dark');

// Auth store
export const authStore = createStore((set) => ({
  user: null,
  isAuthenticated: false,

  login: (userData) => {
    // In a real app, you would validate credentials with your backend
    localStorage.setItem('user', JSON.stringify(userData));
    set({
      user: userData,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem('user');
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  checkAuth: () => {
    const user = localStorage.getItem('user');
    if (user) {
      set({
        user: JSON.parse(user),
        isAuthenticated: true,
      });
      return true;
    }
    return false;
  },
}));

// Counter store (example)
export const counterStore = createStore((set) => ({
  count: 0,

  increment: () => set((state) => ({ count: state.count + 1 })),

  decrement: () => set((state) => ({ count: state.count - 1 })),

  reset: () => set({ count: 0 }),
}));

// Subscribe to store changes for debugging
if (import.meta.env.DEV) {
  themeStore.subscribe((state) => console.log('Theme changed:', state));
  authStore.subscribe((state) => console.log('Auth changed:', state));
  counterStore.subscribe((state) => console.log('Counter changed:', state));
}
