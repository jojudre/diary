module.exports = {
    env: {
        node: true,
        browser: true,
        es2021: true,
    },
    plugins: ['@typescript-eslint', 'react', 'import'],
    extends: ['airbnb', 'plugin:react/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    settings: {
        react: {
            pragma: 'React',
            version: 'detect',
        },
        'import/resolver': {
            node: {
                paths: ['.'],
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            },
        },
    },
    rules: {
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
        'import/extensions': 'off',
        radix: ['error', 'as-needed'],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'react/function-component-definition': [
            'error',
            { namedComponents: 'arrow-function' },
        ],
        'react/jsx-filename-extension': [
            'warn',
            { extensions: ['.tsx', '.ts'] },
        ],
        'arrow-body-style': 'warn',
        'react/no-array-index-key': 'warn',
        'no-restricted-exports': 'off',
        'import/prefer-default-export': 'off',
        'react/jsx-props-no-spreading': 'off',
        'default-param-last': 'off',
        'import/no-unresolved': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        'comma-dangle': 0,
        'no-underscore-dangle': 'off',
        'linebreak-style': 'off',
        'max-len': 'off',
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                'no-undef': 'off',
            },
        },
    ],
};
