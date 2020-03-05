module.exports = {
    root: true,
    env: {
        node: true,
    },
    parserOptions: {
        parser: "babel-eslint"
    },
    // 추가적인 규칙들을 적용
    extends: [
        'eslint:recommended',
    ],
    // 사용자 편의 규칙 추가
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'semi': [1, 'always'],
        'comma-dangle': [1, 'never'],
        "quotes": [1, "single", "avoid-escape"],
        'no-unused-vars': 1,
        'no-empty': 1,
        'no-empty': 1,
        'no-undef': 1,
    },
    parserOptions: {
        "ecmaVersion": 8,
        // "sourceType": "module",
        // "ecmaFeatures": {
        //     "jsx": false
        // },
    },
    ignorePatterns: ["node_modules/"],
    globals: {
        "jQuery": true,
        "$": true,
        "document": true,
        "window": true
    }
}