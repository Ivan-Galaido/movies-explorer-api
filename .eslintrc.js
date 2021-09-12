module.exports = {
  env: {
    browser: true,
    es2021: true,
     commonjs: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['import', 'react'],
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
};
