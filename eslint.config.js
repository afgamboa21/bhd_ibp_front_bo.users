// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettier = require('eslint-config-prettier');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      prettier,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/component-class-suffix': [
        'error',
        {
          suffixes: ['Component', 'Page'],
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  },
  {
    files: ['*.html'],
    ignores: ['*inline-template-*.component.html'],
    extends: [eslintPluginPrettierRecommended],
    rules: {
      'prettier/prettier': ['error', { parser: 'angular' }],
    },
  },
  {
    files: ['**/*.routes.ts'],
    plugins: {
      'local-rules': require('./eslint-local-rules.js'),
    },
    rules: {
      'local-rules/only-page-components-in-routes': 'error',
    },
  },
  {
    files: ['**/*.ts'],
    plugins: {
      'local-rules': require('./eslint-local-rules.js'),
    },
    rules: {
      'local-rules/clean-infrastructure-imports-in-application': 'error',
      'local-rules/clean-infrastructure-imports-in-domain': 'error',
      'local-rules/clean-application-imports-in-domain': 'error',
      'local-rules/only-page-components-in-routes': 'error',
    },
  },
);
