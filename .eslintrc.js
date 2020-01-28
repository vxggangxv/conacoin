module.exports = {
    parser: 'babel-eslint',
    extends: [
        // 'prettier',
    ],
    rules: {
        'no-var': 2,
        semi: [2, 'never'],
        'no-console': 0, // we are enabling this in the scripts
        'no-debugger': 0, // we are enabling this in the scripts
        quotes: [
            'error',
            'single',
            {
                avoidEscape: true,
            },
        ],
        // 'compat/compat': 1,
        // // 'prettier/prettier': [
        // // 	'error',
        // // 	{
        // // 		useTabs: true,
        // // 		printWidth: 80,
        // // 		tabWidth: 4,
        // // 		singleQuote: true,
        // // 		trailingComma: 'es5',
        // // 		jsxBracketSameLine: false,
        // // 		semi: false,
        // // 	},
        // // ],
        // // 'no-const-assign': 'error',
        // // radix: 'error',
        // // 'prefer-template': 'error',
        // // 'prefer-const': 'error',
        // // 'prefer-spread': 'error',
        // // eqeqeq: ['error', 'always'],
        // 'default-case': 2,
        // 'no-use-before-define': [
        // 	'error',
        // 	{ functions: false, classes: false, variables: true },
        // ],
        // 'template-curly-spacing': 0, // Prettier.
        // 'arrow-parens': 0, // Does not work with Flow generic types
        // 'consistent-return': 0, // Flow.
        // // Prefer new line before return
        // // http://eslint.org/docs/rules/newline-before-return
        // // 'newline-before-return': 'error',
        // 'import/no-extraneous-dependencies': 0,
        // 'import/extensions': 0,
        // 'import/no-unresolved': 0,
        // 'no-return-await': 0,
        // 'no-restricted-syntax': 0,
        // 'no-underscore-dangle': 0,
        // 'import/first': 0,
        // 'no-restricted-globals': 1,
        // 'no-useless-escape': 1,
        // //was not working when used with flow prop types
        // 'no-unused-vars': 1,
        // 'react/no-unused-prop-types': 1,
        // // require or disallow Yoda conditions
        // // https://eslint.org/docs/rules/yoda
        // // yoda: ['error', 'never', { exceptRange: true }],
        // // Require modules with a single export to use a default export
        // // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md
        // 'import/prefer-default-export': 0,

        // // no longer defined
        // 'jsx-a11y/href-no-hash': 'off',

        // 'global-require': 0, // Used by webpack isomorphic tools and React Native.
        // // 'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        // quotes: ['error', 'single', { avoidEscape: true }],
    },
}
