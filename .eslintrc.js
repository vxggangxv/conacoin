module.exports = {
    root: true,
    env: {
        node: true,
    },
    plugins: ["prettier"],
    extends: [
        "eslint:recommended",
        "plugin:prettier/recommended"
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                semi: true,
                useTabs: true,
                tabWidth: 2,
                trailingComma: 'all',
                printWidth: 80,
                bracketSpacing: true,
                arrowParens: 'avoid',
            },
        ],
    },
    parserOptions: {
        parser: "babel-eslint"
    },
}