module.exports = {
  extends: [
    'airbnb',
    'plugin:eslint-comments/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  plugins: ['react', 'jsx-a11y', 'import', 'prettier', 'eslint-comments'],
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  rules: {
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'react/prop-types': 'off',
    'react/button-has-type': 'off',
    'react/static-property-placement': 'off',
    'react/destructuring-assignment': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '.storybook/**/*.js',
          'config-overrides.js',
          'src/setupTests.ts',
          'src/components/**/*.stories.tsx',
          'src/**/*.test.{ts,tsx}',
        ],
      },
    ],
    'no-undef': 0,
    camelcase: 0,
    'react/require-default-props': 'off',
    'react/no-unused-prop-types': 0,
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/jsx-props-no-spreading': 'off',
    'class-methods-use-this': 'off',
  },
};
