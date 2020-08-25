module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb-typescript-prettier'],
  plugins: ['prettier'],
  globals: {
    $: true,
    document: true,
    window: true,
    fetch: true,
  },
  ignorePatterns: ['/dist/js/**.js', 'webpack.config.js'],
  rules: {
    'prettier/prettier': ['error'],
    'linebreak-style': [
      'error',
      process.platform === 'win32' ? 'windows' : 'unix',
    ],
    "no-param-reassign": 0,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    "@typescript-eslint/no-unused-vars": "warn",
  },
};
