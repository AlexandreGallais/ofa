// @ts-check
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';

export default tseslint.config({
  files: ['**/*.ts'],
  extends: [...angular.configs.tsRecommended],
  processor: angular.processInlineTemplates,
  rules: {
    // Angular - Possible problems
    '@angular-eslint/no-async-lifecycle-method': 'error',
    '@angular-eslint/no-attribute-decorator': 'error',
    '@angular-eslint/sort-lifecycle-methods': 'error',

    // Angular - Suggestions
    '@angular-eslint/consistent-component-styles': 'error',
    '@angular-eslint/contextual-decorator': 'error',
    '@angular-eslint/directive-selector': 'error',
    '@angular-eslint/no-conflicting-lifecycle': 'error',
    '@angular-eslint/no-duplicates-in-metadata-arrays': 'error',
    '@angular-eslint/no-forward-ref': 'error',
    '@angular-eslint/no-input-prefix': 'error',
    '@angular-eslint/no-lifecycle-call': 'error',
    '@angular-eslint/no-pipe-impure': 'error',
    '@angular-eslint/no-queries-metadata-property': 'error',
    '@angular-eslint/prefer-on-push-component-change-detection': 'error',
    '@angular-eslint/prefer-output-readonly': 'error',
    '@angular-eslint/prefer-standalone': 'error',
    '@angular-eslint/relative-url-prefix': 'error',
    '@angular-eslint/require-localize-metadata': 'error',
    '@angular-eslint/runtime-localize': 'error',
    '@angular-eslint/use-component-selector': 'error',
    '@angular-eslint/use-component-view-encapsulation': 'error',
    '@angular-eslint/use-injectable-provided-in': 'error',
    '@angular-eslint/use-lifecycle-interface': 'error',
  },
});
