module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      tsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'import'
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.json']
    },
    'import/extensions': [
      '.js',
      '.jsx',
      '.ts',
      '.tsx'
    ],
    'import/resolver': {
      typescript: {
        project: './tsconfig.json'
      }
    }
  },
  rules: {
    semi: ['error', 'never'],
    'no-shadow': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'tools/**',
          'site/**',
          'tests/**',
          'scripts/**',
          '**/*.test.js',
          '**/__tests__/*',
          '*.config.js',
          '**/*.md',
        ],
      },
    ],
    'import/no-unresolved': [
      2, 
      { 'caseSensitive': false }
    ],
    'no-console': ['error', { allow: ['warn', 'info', 'error'] }],
    'max-len': ['error', { code: 150}],
    'react/jsx-filename-extension': [2, { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
    'jsx-quotes': ['error', 'prefer-single'],
    'import/prefer-default-export': 'off',
    'object-curly-newline': ['error', { 'multiline': true }],
    //FIXME: https://github.com/typescript-eslint/typescript-eslint/issues/2540
    'no-use-before-define': 'off',
    'linebreak-style': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
    '@typescript-eslint/no-shadow': [2, { ignoreTypeValueShadow: true }],
  },
};
