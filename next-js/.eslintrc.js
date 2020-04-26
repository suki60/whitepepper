const [OFF, WARNING, ERROR] = [0, 1, 2]

module.exports = {
  env: {
    mocha: true,
    browser: true,
    es6: true,
    commonjs: true,
    jest: true
  },
  extends: ['airbnb', 'airbnb/hooks'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  rules: {
    'semi': OFF,
    'comma-dangle': OFF,
    'arrow-parens': OFF,
    'max-len': [WARNING, 120],
    'no-console': WARNING,
    'no-debugger': ERROR,
    'no-unused-expressions': WARNING,
    'react/jsx-props-no-spreading': OFF,
    'implicit-arrow-linebreak': OFF,
    'react/jsx-filename-extension': [WARNING, { extensions: ['.js', '.jsx'] }],
    'jsx-a11y/click-events-have-key-events': OFF,
    'jsx-a11y/no-static-element-interactions': OFF,
    'react/require-default-props': OFF
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', './']
      }
    }
  }
}
