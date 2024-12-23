// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import globals from 'globals';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import storybook from 'eslint-plugin-storybook';

export default tseslint.config(
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    extends: [eslint.configs.recommended, eslintPluginPrettierRecommended],
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
        },
      ],

      // ESLint - Possible Problems
      'array-callback-return': 'error',
      'no-await-in-loop': 'error',
      'no-constructor-return': 'error',
      // 'no-duplicate-imports': 'error',
      'no-inner-declarations': 'error',
      'no-promise-executor-return': 'error',
      'no-self-compare': 'error',
      'no-template-curly-in-string': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unreachable-loop': 'error',
      'no-use-before-define': 'error',
      'no-useless-assignment': 'error',
      'require-atomic-updates': 'error',

      // ESLint - Suggestions
      'accessor-pairs': 'error',
      'arrow-body-style': 'error',
      'block-scoped-var': 'error',
      camelcase: 'error',
      'class-methods-use-this': 'error',
      'consistent-return': 'error',
      curly: 'error',
      'default-case': 'error',
      'default-case-last': 'error',
      'default-param-last': 'error',
      'dot-notation': 'error',
      eqeqeq: 'error',
      'func-name-matching': 'error',
      'func-names': 'error',
      'func-style': 'error',
      'grouped-accessor-pairs': 'error',
      'guard-for-in': 'error',
      'init-declarations': 'error',
      'logical-assignment-operators': 'error',
      'max-classes-per-file': 'error',
      'no-alert': 'error',
      'no-array-constructor': 'error',
      'no-bitwise': 'error',
      'no-caller': 'error',
      'no-console': 'error',
      'no-continue': 'error',
      'no-div-regex': 'error',
      'no-else-return': 'error',
      'no-empty-function': 'error',
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-implicit-coercion': 'error',
      'no-implicit-globals': 'error',
      // 'no-inline-comments': 'error',
      'no-invalid-this': 'error',
      'no-iterator': 'error',
      'no-labels': 'error',
      'no-lone-blocks': 'error',
      'no-lonely-if': 'error',
      'no-loop-func': 'error',
      // 'no-magic-numbers': 'error',
      'no-multi-assign': 'error',
      'no-multi-str': 'error',
      'no-negated-condition': 'error', // keep
      'no-nested-ternary': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-object-constructor': 'error',
      'no-param-reassign': 'error',
      'no-plusplus': 'error',
      'no-return-assign': 'error',
      'no-script-url': 'error',
      'no-sequences': 'error',
      'no-shadow': 'error',
      'no-throw-literal': 'error',
      'no-undef-init': 'error',
      //' no-undefined': 'error',
      'no-underscore-dangle': 'error',
      'no-unneeded-ternary': 'error',
      'no-unused-expressions': 'error',
      'no-useless-call': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-concat': 'error',
      'no-useless-constructor': 'error',
      'no-useless-rename': 'error',
      'no-useless-return': 'error',
      'no-var': 'error',
      'no-void': 'error',
      'no-warning-comments': 'error',
      'object-shorthand': 'error',
      'operator-assignment': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'prefer-destructuring': 'error',
      'prefer-exponentiation-operator': 'error',
      'prefer-named-capture-group': 'error',
      'prefer-numeric-literals': 'error',
      'prefer-object-has-own': 'error',
      'prefer-object-spread': 'error',
      'prefer-promise-reject-errors': 'error',
      'prefer-regex-literals': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      radix: 'error',
      'require-await': 'error',
      'require-unicode-regexp': 'error',
      'symbol-description': 'error',
      'vars-on-top': 'error',
      yoda: 'error',
    },
  },
  {
    files: ['**/eslint.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.ts'],
    extends: [...tseslint.configs.strict, ...tseslint.configs.stylistic],
    plugins: { perfectionist },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // TypeScript
      'class-methods-use-this': 'off',
      '@typescript-eslint/class-methods-use-this': 'error',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      'consistent-return': 'off',
      'default-param-last': 'off',
      '@typescript-eslint/default-param-last': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-member-accessibility': 'error', // keep
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      'init-declarations': 'off',
      '@typescript-eslint/init-declarations': 'error',
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/method-signature-style': 'error',
      camelcase: 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: ['default'],
          format: ['camelCase'],
        },
        {
          selector: ['typeLike', 'enumMember'],
          format: ['PascalCase'],
        },
      ],
      'no-dupe-class-members': 'off',
      '@typescript-eslint/no-dupe-class-members': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      'no-invalid-this': 'off',
      '@typescript-eslint/no-invalid-this': 'error',
      'no-loop-func': 'off',
      '@typescript-eslint/no-loop-func': 'error',
      'no-loss-of-precision': 'off',
      '@typescript-eslint/no-loss-of-precision': 'error',
      //'no-magic-numbers': 'off',
      //'@typescript-eslint/no-magic-numbers': 'error',
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'error',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unnecessary-parameter-property-assignment':
        'error',
      '@typescript-eslint/no-unnecessary-qualifier': 'error',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/no-useless-empty-export': 'error',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/parameter-properties': 'error',
      'prefer-destructuring': 'off',
      '@typescript-eslint/prefer-destructuring': 'error',
      '@typescript-eslint/prefer-enum-initializers': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/prefer-readonly-parameter-types': [
        'error',
        { ignoreInferredTypes: true },
      ],
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',

      // Perfectionist
      'perfectionist/sort-array-includes': 'error',
      'perfectionist/sort-exports': 'error',
      'perfectionist/sort-imports': 'error',
      'perfectionist/sort-intersection-types': 'error',
      'perfectionist/sort-named-exports': 'error',
      'perfectionist/sort-named-imports': 'error',
      'perfectionist/sort-sets': 'error',
      'perfectionist/sort-union-types': 'error',
    },
  },
  {
    files: [
      '**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)',
      '**/*.story.@(ts|tsx|js|jsx|mjs|cjs)',
    ],
    plugins: { storybook },
    rules: {
      '@typescript-eslint/naming-convention': 'off',
      'react-hooks/rules-of-hooks': 'off',
      'import/no-anonymous-default-export': 'off',
      'storybook/await-interactions': 'error',
      'storybook/context-in-play-function': 'error',
      'storybook/default-exports': 'error',
      'storybook/hierarchy-separator': 'warn',
      'storybook/no-redundant-story-name': 'warn',
      'storybook/prefer-pascal-case': 'warn',
      'storybook/story-exports': 'error',
      'storybook/use-storybook-expect': 'error',
      'storybook/use-storybook-testing-library': 'error',
      'storybook/no-uninstalled-addons': 'error',
      'storybook/no-stories-of': 'error',
      'storybook/no-title-property-in-meta': 'error',
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      //...angular.configs.templateAccessibility,
      eslintPluginPrettierRecommended,
    ],
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleAttributePerLine: true,
        },
      ],
    },
  },
);
