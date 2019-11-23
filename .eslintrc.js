module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    es6: true,
    jest: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
    'no-console': [2, { allow: ['info', 'warn', 'error'] }],
    'import/no-extraneous-dependencies': [
      2,
      { devDependencies: ['**/test/**'] },
    ],
    'no-restricted-syntax': 0,
    'no-await-in-loop': 0,
    'class-methods-use-this': 0,
    'no-return-assign': ['error', 'except-parens'],
    'no-param-reassign': ['error', { props: false }],
    'import/no-unresolved': [2, { caseSensitive: false }],
  },
};
