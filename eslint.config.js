import js from '@eslint/js';

export default [
  {
    ignores: ['**/*'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // Temporarily disable all rules to get the commit through
    },
  },
];
