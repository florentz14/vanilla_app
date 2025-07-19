class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'system';
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.init();
  }

  init() {
    // Apply saved theme or system preference
    this.applyTheme();
    
    // Listen for system theme changes
    this.mediaQuery.addEventListener('change', () => {
      if (this.theme === 'system') {
        this.applyTheme();
      }
    });
    
    // Add theme toggle handler
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-theme-toggle]')) {
        this.toggleTheme();
      }
    });
  }

  get systemTheme() {
    return this.mediaQuery.matches ? 'dark' : 'light';
  }

  get currentTheme() {
    return this.theme === 'system' ? this.systemTheme : this.theme;
  }

  applyTheme() {
    const root = document.documentElement;
    const theme = this.currentTheme;
    
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
    
    // Update theme toggle button icon if it exists
    const toggleBtn = document.querySelector('[data-theme-toggle]');
    if (toggleBtn) {
      toggleBtn.textContent = theme === 'dark' ? '🌙' : '🌞';
    }
  }

  setTheme(theme) {
    if (['light', 'dark', 'system'].includes(theme)) {
      this.theme = theme;
      localStorage.setItem('theme', theme);
      this.applyTheme();
      // Dispatch event when theme changes
      document.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme } }));
    }
  }

  toggleTheme() {
    if (this.theme === 'dark') {
      this.setTheme('light');
    } else if (this.theme === 'light') {
      this.setTheme('system');
    } else {
      this.setTheme('dark');
    }
  }
}

// Create and export a singleton instance
export const themeManager = new ThemeManager();

// Initialize theme on load
document.addEventListener('DOMContentLoaded', () => {
  themeManager.applyTheme();
});
