module.exports = {
  extends: ['anvilabs', 'anvilabs/flowtype', 'anvilabs/lodash'],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  rules: {
    'no-use-before-define': [
      2, // eslint-disable-line no-magic-numbers
      {functions: true, classes: true, variables: true},
    ],
    // https://github.com/benmosher/eslint-plugin-import
    'import/no-internal-modules': [
      2, // eslint-disable-line no-magic-numbers
      {
        allow: ['app/*'],
      },
    ],
  },
};
