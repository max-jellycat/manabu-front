module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ['airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'no-confusing-arrow': 0,
    'no-console': 0,
    'import/no-unresolved': 0,
    'no-unused-expressions': 0,
    'no-unused-vars': 1,
    'no-shadow': 0,
    'no-use-before-define': 0,
    'consistent-return': 0,
    'max-len': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'react/jsx-props-no-spreading': 0,
    'react/button-has-type': 0
  },
};
