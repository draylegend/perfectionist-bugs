const eslint = require('@eslint/js');
const nx = require('@nx/eslint-plugin');
const angular = require('angular-eslint');
const perfectionist = require('eslint-plugin-perfectionist');
const unusedImports = require('eslint-plugin-unused-imports');
const { config, configs } = require('typescript-eslint');

module.exports = config(
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  { ignores: ['**/dist'] },
  {
    extends: [
      eslint.configs.recommended,
      ...configs.recommended,
      ...configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    files: ['**/*.ts'],
    plugins: { 'unused-imports': unusedImports },
    processor: angular.processInlineTemplates,
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [{ onlyDependOnLibsWithTags: ['*'], sourceTag: '*' }],
          enforceBuildableLibDependency: true,
        },
      ],
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true },
      ],
      'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  perfectionist.configs['recommended-natural'],
  {
    files: ['**/*.html'],
    rules: {
      '@angular-eslint/template/attributes-order': [
        'error',
        { alphabetical: true },
      ],
    },
  },
);
